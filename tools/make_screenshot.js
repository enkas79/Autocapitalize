// Usage: node tools/make_screenshot.js  (needs playwright + Chromium)
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const path = require("path");
(async () => {
  const root = path.join(__dirname, "..");
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH, args: ["--no-sandbox"] });
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await p.goto("file://" + path.join(__dirname, "screenshot.html"));
  await p.addScriptTag({ path: path.join(root, "content.js") });
  await p.click("#t");
  await p.keyboard.type("hi team. the release is ready! can you review the notes? thanks.\nsee you tomorrow at the standup");
  await p.screenshot({ path: path.join(root, "store", "screenshot-1280x800.png") });
  await b.close();
})();
