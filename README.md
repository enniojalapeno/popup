<p align="center">
  <img src="logo.png" width="128" alt="popup logo" />
</p>

<h1 align="center">popup</h1>

<p align="center">
  One-hotkey sticky note for macOS.<br/>
  Press <kbd>⌥</kbd><kbd>⌘</kbd><kbd>=</kbd>, jot something down, press again to hide. Gone.
</p>

<p align="center">
  <a href="https://github.com/enniojalapeno/popup/releases/latest"><img src="https://img.shields.io/github/v/release/enniojalapeno/popup?style=flat-square" alt="Latest release" /></a>
  <a href="https://github.com/enniojalapeno/popup/blob/main/LICENSE"><img src="https://img.shields.io/github/license/enniojalapeno/popup?style=flat-square" alt="License" /></a>
  <img src="https://img.shields.io/badge/platform-macOS%2013+-blue?style=flat-square" alt="Platform" />
</p>

---

## Install

### Homebrew

```sh
brew tap enniojalapeno/popup
brew install --cask popup
```

### Manual

Download the latest `.dmg` from [GitHub Releases](https://github.com/enniojalapeno/popup/releases/latest), open it, drag `popup.app` to Applications.

Updates are automatic — popup checks for new versions on launch.

## How it works

- **Toggle**: `⌥⌘=` shows or hides the panel
- **Save**: auto-saves to `~/Documents/Popup.md` as you type
- **Background**: no Dock icon, no `⌘Tab` — lives in the menu bar
- **Tray**: click the icon to show, right-click to quit

## Settings

Gear menu in the panel:

- **Theme**: Gruvbox, Catppuccin, Nord, Rose Pine, Solarized, macOS, Ayu, Atom, Everforest, Flexoki, Sky, Things, E-Ink, System (19 total)
- **Font**: JetBrains Mono, SF Mono, IBM Plex Mono
- **Size**, **width**, **blur**, **always on top**, **hotkey**, **launch at login**

## Dev

```sh
git clone https://github.com/enniojalapeno/popup.git
cd popup
npm install
npm run tauri dev
```

## License

[MIT](LICENSE)
