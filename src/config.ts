import type { ThemeId } from "./themes";

export type FontId = "JetBrains Mono" | "SF Mono" | "IBM Plex Mono";

export interface PopupConfig {
  theme: ThemeId;
  font: FontId;
  fontSize: number;
  width: number;
  blur: boolean;
  alwaysOnTop: boolean;
  hotkey: string;
  launchAtLogin: boolean;
}

export const DEFAULT_CONFIG: PopupConfig = {
  theme: "gruvbox-dark", // Gruvbox Dark default, fixed gruvbox-orange accent
  font: "JetBrains Mono",
  fontSize: 14,
  width: 640,
  blur: true,
  alwaysOnTop: true,
  hotkey: "Alt+Super+Equal",
  launchAtLogin: false,
};

export const HOTKEY_PRESETS = [
  "Alt+Shift+Space",
  "Alt+Shift+N",
];

const KEY = "popup.config.v1";

export function loadConfig(): PopupConfig {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_CONFIG };
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveConfig(cfg: PopupConfig) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cfg));
  } catch {
    /* ignore */
  }
}
