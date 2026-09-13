#!/bin/sh
# Build popup and install to /Applications.
set -eu
cd "$(dirname "$0")/.."

npm run tauri build

APP="src-tauri/target/release/bundle/macos/popup.app"

pkill -x popup 2>/dev/null || true
sleep 1
rm -rf /Applications/popup.app
cp -R "$APP" /Applications/popup.app

echo "Installed /Applications/popup.app"
