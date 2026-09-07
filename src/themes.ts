export type ThemeId =
  | "atom"
  | "ayu"
  | "catppuccin"
  | "eink"
  | "everforest"
  | "flexoki"
  | "gruvbox-dark"
  | "gruvbox-light"
  | "macos-dark"
  | "macos-light"
  | "nord"
  | "rose-pine"
  | "rose-pine-dawn"
  | "sky"
  | "solarized-dark"
  | "solarized-light"
  | "things-dark"
  | "things-light"
  | "system";

type ThemeVars = Record<string, string>;

export const THEMES: Record<Exclude<ThemeId, "system">, ThemeVars> = {
  atom: {
    "--bg": "#282c34",
    "--bg2": "#21252b",
    "--fg": "#abb2bf",
    "--muted": "#5c6370",
    "--accent": "#61afef",
    "--accent2": "#c678dd",
    "--border": "#3e4451",
    "--selection": "rgba(97, 175, 239, 0.2)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.5)",
  },
  ayu: {
    "--bg": "#0f1419",
    "--bg2": "#1a1e24",
    "--fg": "#e6e1cf",
    "--muted": "#5c6773",
    "--accent": "#39bae6",
    "--accent2": "#ffb454",
    "--border": "#273747",
    "--selection": "rgba(57, 186, 230, 0.2)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.55)",
  },
  catppuccin: {
    "--bg": "#1e1e2e",
    "--bg2": "#181825",
    "--fg": "#cdd6f4",
    "--muted": "#6c7086",
    "--accent": "#89b4fa",
    "--accent2": "#f5c2e7",
    "--border": "#313244",
    "--selection": "rgba(137, 180, 250, 0.2)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.5)",
  },
  eink: {
    "--bg": "#ffffff",
    "--bg2": "#f0f0f0",
    "--fg": "#000000",
    "--muted": "#555555",
    "--accent": "#000000",
    "--accent2": "#333333",
    "--border": "#cccccc",
    "--selection": "rgba(0,0,0,0.12)",
    "--shadow": "0 2px 8px rgba(0,0,0,0.15)",
  },
  everforest: {
    "--bg": "#2d353b",
    "--bg2": "#343f44",
    "--fg": "#d3c6aa",
    "--muted": "#859289",
    "--accent": "#a7c080",
    "--accent2": "#dbbc7f",
    "--border": "#475258",
    "--selection": "rgba(167, 192, 128, 0.2)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.45)",
  },
  flexoki: {
    "--bg": "#100f0f",
    "--bg2": "#1c1b1b",
    "--fg": "#cecdc3",
    "--muted": "#878580",
    "--accent": "#ef4f4f",
    "--accent2": "#f09050",
    "--border": "#343331",
    "--selection": "rgba(239, 79, 79, 0.18)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.55)",
  },
  "gruvbox-dark": {
    "--bg": "#282828",
    "--bg2": "#3c3836",
    "--fg": "#ebdbb2",
    "--muted": "#a89984",
    "--accent": "#fabd2f",
    "--accent2": "#fe8019",
    "--border": "#504945",
    "--selection": "rgba(250, 189, 47, 0.25)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.5)",
  },
  "gruvbox-light": {
    "--bg": "#fbf1c7",
    "--bg2": "#ebdbb2",
    "--fg": "#3c3836",
    "--muted": "#7c6f64",
    "--accent": "#d65d0e",
    "--accent2": "#b57614",
    "--border": "#d5c4a1",
    "--selection": "rgba(214, 93, 14, 0.18)",
    "--shadow": "0 16px 48px rgba(60, 56, 54, 0.25)",
  },
  "macos-dark": {
    "--bg": "#1c1c1e",
    "--bg2": "#2c2c2e",
    "--fg": "#f5f5f7",
    "--muted": "#8e8e93",
    "--accent": "#0a84ff",
    "--accent2": "#ff9f0a",
    "--border": "#3a3a3c",
    "--selection": "rgba(10, 132, 255, 0.2)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.55)",
  },
  "macos-light": {
    "--bg": "#f5f5f7",
    "--bg2": "#e5e5ea",
    "--fg": "#1d1d1f",
    "--muted": "#86868b",
    "--accent": "#007aff",
    "--accent2": "#ff9500",
    "--border": "#d2d2d7",
    "--selection": "rgba(0, 122, 255, 0.15)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.18)",
  },
  nord: {
    "--bg": "#2e3440",
    "--bg2": "#3b4252",
    "--fg": "#d8dee9",
    "--muted": "#4c566a",
    "--accent": "#88c0d0",
    "--accent2": "#b48ead",
    "--border": "#434c5e",
    "--selection": "rgba(136, 192, 208, 0.2)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.45)",
  },
  "rose-pine": {
    "--bg": "#191724",
    "--bg2": "#1f1d2e",
    "--fg": "#e0def4",
    "--muted": "#6e6a86",
    "--accent": "#9ccfd8",
    "--accent2": "#ebbcba",
    "--border": "#2a283e",
    "--selection": "rgba(156, 207, 216, 0.2)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.5)",
  },
  "rose-pine-dawn": {
    "--bg": "#faf4ed",
    "--bg2": "#fffaf3",
    "--fg": "#575279",
    "--muted": "#9893a5",
    "--accent": "#3178c6",
    "--accent2": "#d7827e",
    "--border": "#e6e1d8",
    "--selection": "rgba(49, 120, 198, 0.12)",
    "--shadow": "0 16px 48px rgba(87, 82, 121, 0.15)",
  },
  sky: {
    "--bg": "#0b1929",
    "--bg2": "#0f2137",
    "--fg": "#c5d4e8",
    "--muted": "#5e7b97",
    "--accent": "#4fc1e9",
    "--accent2": "#faa460",
    "--border": "#1a3350",
    "--selection": "rgba(79, 193, 233, 0.2)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.55)",
  },
  "solarized-dark": {
    "--bg": "#002b36",
    "--bg2": "#073642",
    "--fg": "#839496",
    "--muted": "#586e75",
    "--accent": "#268bd2",
    "--accent2": "#cb4b16",
    "--border": "#094959",
    "--selection": "rgba(38, 139, 210, 0.2)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.5)",
  },
  "solarized-light": {
    "--bg": "#fdf6e3",
    "--bg2": "#eee8d5",
    "--fg": "#657b83",
    "--muted": "#93a1a1",
    "--accent": "#268bd2",
    "--accent2": "#cb4b16",
    "--border": "#d3cbb7",
    "--selection": "rgba(38, 139, 210, 0.12)",
    "--shadow": "0 16px 48px rgba(101, 123, 131, 0.18)",
  },
  "things-dark": {
    "--bg": "#1e1e1e",
    "--bg2": "#2a2a2a",
    "--fg": "#f5f5f5",
    "--muted": "#8e8e8e",
    "--accent": "#ff6363",
    "--accent2": "#ff9463",
    "--border": "#3a3a3a",
    "--selection": "rgba(255, 99, 99, 0.2)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.55)",
  },
  "things-light": {
    "--bg": "#ffffff",
    "--bg2": "#f5f5f5",
    "--fg": "#1e1e1e",
    "--muted": "#6e6e6e",
    "--accent": "#ff6363",
    "--accent2": "#d94f4f",
    "--border": "#e8e8e8",
    "--selection": "rgba(255, 99, 99, 0.12)",
    "--shadow": "0 16px 48px rgba(0,0,0,0.15)",
  },
};

export function resolveTheme(id: ThemeId): ThemeVars {
  if (id !== "system") return THEMES[id];
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return dark ? THEMES["macos-dark"] : THEMES["macos-light"];
}

export function applyTheme(id: ThemeId) {
  const vars = resolveTheme(id);
  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
}
