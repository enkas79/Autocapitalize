let punctuationTrigger = false;

function isEditable(el) {
  if (!el) return false;
  if (el.isContentEditable) return true;
  if (el.tagName === "TEXTAREA") return true;
  if (el.tagName === "INPUT" && /^(text|search)$/i.test(el.type)) return true;
  return false;
}

// 1. Traccia la sequenza: punto/interrogativo/esclamativo/invio seguito da spazio
document.addEventListener("keydown", (e) => {
  const el = e.target;
  if (!isEditable(el)) return;

  if (e.key === "Enter") {
    punctuationTrigger = true;
    return;
  }

  if (e.key === "." || e.key === "?" || e.key === "!") {
    punctuationTrigger = "pending_space";
    return;
  }

  if (e.key === " " && punctuationTrigger === "pending_space") {
    punctuationTrigger = true;
    return;
  }

  if (punctuationTrigger === "pending_space" && e.key !== " ") {
    punctuationTrigger = false;
    return;
  }
}, true);

// 2. Intercetta la scrittura prima che atterri nel documento
document.addEventListener("beforeinput", (e) => {
  const el = e.target;
  if (!isEditable(el)) return;

  // Intercetta solo singoli caratteri inseriti dall'utente
  if (punctuationTrigger === true && e.data && e.data.length === 1) {
    const char = e.data;
    const isLower = (char >= "a" && char <= "z") || "àèéìòù".includes(char);

    if (isLower) {
      e.preventDefault();
      const upperChar = char.toUpperCase();

      if (el.isContentEditable) {
        // Per editor ricchi (Proton Mail, Word Online, ecc.)
        document.execCommand("insertText", false, upperChar);
      } else if (typeof el.selectionStart === "number") {
        // Per campi standard (<textarea>, <input>)
        const start = el.selectionStart;
        const end = el.selectionEnd;
        el.setRangeText(upperChar, start, end, "end");
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
    punctuationTrigger = false;
  }
}, true);