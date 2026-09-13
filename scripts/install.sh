#!/bin/sh
# Build popup, hide it from Spotlight (Cmd+Space), and install to /Applications.
# The .metadata_never_index flag keeps the Dock icon intact (unlike LSUIElement).
set -eu
cd "$(dirname "$0")/.."

npm run tauri build

APP="src-tauri/target/release/bundle/macos/popup.app"
touch "$APP/.metadata_never_index"

pkill -x popup 2>/dev/null || true
sleep 1
rm -rf /Applications/popup.app
cp -R "$APP" /Applications/popup.app
touch "/Applications/popup.app/.metadata_never_index"

echo "Installed /Applications/popup.app (hidden from Spotlight)"
