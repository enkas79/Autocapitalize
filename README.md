# Universal Auto Capitalize

Estensione Chrome (Manifest V3) che mette in maiuscolo la prima lettera dopo `.` `?` `!` + spazio, dopo l'a capo e a inizio testo (campi multilinea), su qualsiasi sito. Nessun permesso, nessun dato raccolto.

- Installazione sviluppo: `chrome://extensions` → Modalità sviluppatore → Carica estensione non pacchettizzata → questa cartella.
- Icone: `python3 tools/make_icons.py`
- Pacchetto per il Web Store: `tools/build.sh` → `dist/autocapitalize.zip`
- Scheda store e permessi: `store/listing.md`
