#!/bin/sh
# Crea il pacchetto per il Chrome Web Store in dist/autocapitalize.zip
set -e
cd "$(dirname "$0")/.."
mkdir -p dist
rm -f dist/autocapitalize.zip
zip -r dist/autocapitalize.zip manifest.json content.js icons/icon*.png
