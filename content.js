(() => {
  "use strict";

  // Elemento in cui la prossima lettera minuscola va maiuscolata.
  let armedEl = null;
  // Dopo ".", "?" o "!" si attende lo spazio prima di armare il campo.
  let pendingSpaceEl = null;
  let lastKey = "";

  const RESET_KEYS = new Set([
    "Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
    "Home", "End", "PageUp", "PageDown", "Escape", "Tab"
  ]);

  function isTextarea(el) {
    return el.tagName === "TEXTAREA";
  }

  function isEditable(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.isContentEditable || isTextarea(el)) return !el.readOnly;
    return el.tagName === "INPUT" && /^(text|search)$/i.test(el.type) && !el.readOnly;
  }

  // Invio e inizio campo valgono solo per testo multilinea: in <input>
  // l'Invio invia il modulo e il primo carattere può essere un nome utente/URL.
  function isMultiline(el) {
    return el.isContentEditable || isTextarea(el);
  }

  function targetOf(e) {
    const t = e.composedPath ? e.composedPath()[0] : e.target;
    return isEditable(t) ? t : null;
  }

  function isEmpty(el) {
    return el.isContentEditable ? el.textContent.trim() === "" : el.value === "";
  }

  function reset() {
    armedEl = null;
    pendingSpaceEl = null;
  }

  document.addEventListener("keydown", (e) => {
    const el = targetOf(e);
    if (!el || e.isComposing || e.ctrlKey || e.metaKey || e.altKey) return;

    const key = e.key;
    const prev = lastKey;
    lastKey = key;

    if (key === "Shift" || key === "CapsLock") return;

    if (RESET_KEYS.has(key)) return reset();

    if (key === "Enter") {
      pendingSpaceEl = null;
      armedEl = isMultiline(el) ? el : null;
    } else if (key === "." || key === "?" || key === "!") {
      // "..." (puntini di sospensione) non chiude la frase.
      pendingSpaceEl = key === "." && prev === "." ? null : el;
      armedEl = null;
    } else if (key === " ") {
      if (pendingSpaceEl === el) armedEl = el;
      pendingSpaceEl = null;
    } else if (key.length === 1) {
      pendingSpaceEl = null;
    }
  }, true);

  document.addEventListener("beforeinput", (e) => {
    const el = targetOf(e);
    if (!el || e.inputType !== "insertText" || !e.data || e.data.length !== 1) return;
    // Lo spazio che arma il campo non deve consumare lo stato.
    if (/\s/.test(e.data)) return;

    const startOfField = isMultiline(el) && isEmpty(el);
    if (armedEl !== el && !startOfField) return;
    armedEl = null;

    const upper = e.data.toUpperCase();
    if (upper === e.data || upper.length !== 1) return;

    e.preventDefault();
    // execCommand mantiene lo stack undo e genera gli eventi nativi.
    if (document.execCommand("insertText", false, upper)) return;
    if (typeof el.selectionStart === "number") {
      el.setRangeText(upper, el.selectionStart, el.selectionEnd, "end");
      el.dispatchEvent(new InputEvent("input", { bubbles: true, data: upper, inputType: "insertText" }));
    }
  }, true);

  // Cambiando campo o con un click lo stato non deve "trascinarsi".
  document.addEventListener("focusin", reset, true);
  document.addEventListener("mousedown", reset, true);
})();
