# Chrome Web Store listing (English)

**Name:** Universal Auto Capitalize
**Category:** Productivity
**Language:** English

## Short description (max 132 characters)
Auto-capitalizes after . ? ! and new lines on any website. No data collected.

## Detailed description
Universal Auto Capitalize capitalizes the first letter of every sentence as you type, on any website: webmail, online editors, chats, social networks, forms.

- Capitalizes after a period, question mark, exclamation mark and a space
- Capitalizes after a new line and at the start of the text (multiline fields)
- Ignores ellipses ("...")
- Works in textareas, text inputs and rich editors (contenteditable)
- Leaves passwords, emails and URLs alone, and never capitalizes the start of single-line fields
- Keeps Undo (Ctrl+Z) working

Privacy: the extension does not collect, store or transmit any data. It requires no permissions and makes no network requests.

## Permission justification (Developer Dashboard)
- Content script on `<all_urls>`: required to work in any text field on any site. No permission APIs requested.
- Remote code: no.

## Privacy policy
No personal data is collected, used or shared. All processing happens locally in the browser, only on the character being typed.

## Assets
- 128x128 icon: `icons/icon128.png`
- Small promo tile 440x280: `store/promo-small-440x280.png`
- Screenshots (1280x800): capture from the extension in use (at least one required)

## Package
`./tools/build.sh` creates `dist/autocapitalize.zip` to upload.
