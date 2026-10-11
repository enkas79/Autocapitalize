# Scheda Chrome Web Store

**Nome:** Universal Auto Capitalize
**Categoria:** Produttività
**Lingua:** Italiano

## Descrizione breve (max 132 caratteri)
Maiuscola automatica dopo . ? ! e a capo, su qualsiasi sito. Nessun dato raccolto.

## Descrizione dettagliata
Universal Auto Capitalize mette in maiuscolo la prima lettera di ogni frase mentre scrivi, in qualsiasi sito: webmail, editor online, chat, social, moduli.

- Maiuscola dopo punto, punto interrogativo, punto esclamativo e spazio
- Maiuscola dopo l'a capo e a inizio testo (campi multilinea)
- Ignora i puntini di sospensione "..."
- Funziona in textarea, caselle di testo ed editor ricchi (contenteditable)
- Non tocca password, e-mail, URL e campi a riga singola per l'inizio testo
- Mantiene Annulla (Ctrl+Z) funzionante

Privacy: l'estensione non raccoglie, memorizza né trasmette alcun dato. Non usa permessi né accesso alla rete.

## Giustificazione permessi (Developer Dashboard)
- Content script su `<all_urls>`: necessario per funzionare in qualsiasi campo di testo su qualsiasi sito. Nessuna permission API richiesta.
- Uso di codice remoto: no.

## Privacy policy
Nessun dato personale viene raccolto, usato o condiviso. Tutta l'elaborazione avviene localmente nel browser, solo sul carattere digitato.

## Asset
- Icona 128x128: `icons/icon128.png`
- Promo tile piccolo 440x280: `store/promo-small-440x280.png`
- Screenshot (1280x800): da acquisire dall'estensione in uso (obbligatorio almeno uno)

## Pacchetto
`./tools/build.sh` crea `dist/autocapitalize.zip` da caricare.
