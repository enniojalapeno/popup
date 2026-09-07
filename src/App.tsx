import { useEffect, useRef, useState } from "react";
import { applyTheme } from "./themes";
import { DEFAULT_CONFIG, loadConfig, saveConfig, type PopupConfig } from "./config";
import "./App.css";

const NOTE_FILE = "Popup.md";
const LS_NOTE = "popup.note.v1";
const isTauri = "__TAURI__" in window;

const invoke = async (cmd: string) => {
  const { invoke: tauriInvoke } = await import("@tauri-apps/api/core");
  return tauriInvoke(cmd);
};

async function loadNote(): Promise<string> {
  if (!isTauri) return localStorage.getItem(LS_NOTE) ?? "";
  try {
    const { readTextFile, BaseDirectory } = await import("@tauri-apps/plugin-fs");
    return await readTextFile(NOTE_FILE, { baseDir: BaseDirectory.Document });
  } catch {
    return localStorage.getItem(LS_NOTE) ?? "";
  }
}

async function persistNote(text: string) {
  localStorage.setItem(LS_NOTE, text);
  if (!isTauri) return;
  try {
    const { writeTextFile, BaseDirectory } = await import("@tauri-apps/plugin-fs");
    await writeTextFile(NOTE_FILE, text, { baseDir: BaseDirectory.Document });
  } catch {}
}

export default function App() {
  const [text, setText] = useState("");
  const [cfg, setCfg] = useState<PopupConfig>({ ...DEFAULT_CONFIG });
  const [showSettings, setShowSettings] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [ready, setReady] = useState(false);
  const saveTimer = useRef<number | null>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const hideApp = () => invoke("hide_app").catch(() => {});
  const quitApp = () => invoke("quit_app").catch(() => {});

  // init
  useEffect(() => {
    const c = loadConfig();
    setCfg(c);
    applyTheme(c.theme);
    loadNote().then((t) => { setText(t); setReady(true); });
  }, []);

  // theme + font
  useEffect(() => {
    applyTheme(cfg.theme);
    const root = document.documentElement;
    root.style.setProperty("--mono", `'${cfg.font}', ui-monospace, SFMono-Regular, Menlo, monospace`);
    root.style.setProperty("--fontsize", `${cfg.fontSize}px`);
    saveConfig(cfg);
  }, [cfg]);

  // autosave
  useEffect(() => {
    if (!ready) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => { persistNote(text); setSavedAt(new Date()); }, 300);
    return () => { if (saveTimer.current) window.clearTimeout(saveTimer.current); };
  }, [text, ready]);

  // keyboard shortcuts only (hotkey is registered in Rust)
  useEffect(() => {
    if (!isTauri) return;

    const onKey = async (e: KeyboardEvent) => {
      // Cmd+Q -> quit
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "q") {
        e.preventDefault();
        await quitApp();
        return;
      }
      // Escape -> hide (always, no guards)
      if (e.key === "Escape") {
        e.preventDefault();
        await hideApp();
        return;
      }
      // Cmd/Ctrl+Enter -> hide
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        await hideApp();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => { window.removeEventListener("keydown", onKey); };
  }, []);

  // window size + always-on-top
  useEffect(() => {
    if (!isTauri) return;
    (async () => {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      const { LogicalSize } = await import("@tauri-apps/api/window");
      const win = getCurrentWindow();
      await win.setSize(new LogicalSize(cfg.width, 420)).catch(() => {});
      await win.setAlwaysOnTop(cfg.alwaysOnTop).catch(() => {});
    })();
  }, [cfg.width, cfg.alwaysOnTop]);

  // launch-at-login
  useEffect(() => {
    if (!isTauri) return;
    (async () => {
      const { enable, disable } = await import("@tauri-apps/plugin-autostart");
      if (cfg.launchAtLogin) await enable().catch(() => {});
      else await disable().catch(() => {});
    })();
  }, [cfg.launchAtLogin]);

  // focus textarea when window regains focus
  useEffect(() => {
    if (!isTauri) return;
    let unlisten: (() => void) | null = null;
    (async () => {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      unlisten = await getCurrentWindow().onFocusChanged((e) => {
        if (e.payload) areaRef.current?.focus();
      });
    })();
    return () => { unlisten?.(); };
  }, []);

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const set = <K extends keyof PopupConfig>(k: K, v: PopupConfig[K]) =>
    setCfg((c) => ({ ...c, [k]: v }));

  return (
    <div className="shell">
      <header className="bar" onMouseDown={async (e) => {
        // only drag from the header bar itself, not buttons
        if ((e.target as HTMLElement).closest('.iconbtn')) return;
        try {
          const { getCurrentWindow } = await import("@tauri-apps/api/window");
          await getCurrentWindow().startDragging();
        } catch {}
      }}>
        <span className="dot" />
        <span className="title">popup</span>
        <span className="meta">{text.length}c · {words}w</span>
        <button className="iconbtn" onClick={() => setShowSettings(s => !s)} title="Settings (Cmd+,)">⚙</button>
        <button className="iconbtn" onClick={hideApp} title="Hide (Esc)">–</button>
        <button className="iconbtn danger" onClick={quitApp} title="Quit (Cmd+Q)">×</button>
      </header>

      {showSettings ? (
        <div className="settings">
          <label>Theme
            <select value={cfg.theme} onChange={e => set("theme", e.target.value as PopupConfig["theme"])}>
              <optgroup label="Editor">
                <option value="atom">Atom One Dark</option>
                <option value="ayu">Ayu</option>
                <option value="catppuccin">Catppuccin</option>
                <option value="everforest">Everforest</option>
                <option value="flexoki">Flexoki</option>
                <option value="nord">Nord</option>
                <option value="rose-pine">Rosé Pine</option>
                <option value="rose-pine-dawn">Rosé Pine Dawn</option>
                <option value="sky">Sky</option>
              </optgroup>
              <optgroup label="Classic">
                <option value="gruvbox-dark">Gruvbox Dark</option>
                <option value="gruvbox-light">Gruvbox Light</option>
                <option value="solarized-dark">Solarized Dark</option>
                <option value="solarized-light">Solarized Light</option>
              </optgroup>
              <optgroup label="App-inspired">
                <option value="macos-dark">macOS Dark</option>
                <option value="macos-light">macOS Light</option>
                <option value="things-dark">Things Dark</option>
                <option value="things-light">Things Light</option>
              </optgroup>
              <optgroup label="Special">
                <option value="eink">E-ink (beta)</option>
                <option value="system">System</option>
              </optgroup>
            </select>
          </label>
          <label>Font
            <select value={cfg.font} onChange={e => set("font", e.target.value as PopupConfig["font"])}>
              <option>JetBrains Mono</option>
              <option>SF Mono</option>
              <option>IBM Plex Mono</option>
            </select>
          </label>
          <label>Size · {cfg.fontSize}px
            <input type="range" min={12} max={18} value={cfg.fontSize} onChange={e => set("fontSize", +e.target.value)} />
          </label>
          <label>Width · {cfg.width}px
            <input type="range" min={440} max={860} step={10} value={cfg.width} onChange={e => set("width", +e.target.value)} />
          </label>
          <label className="row">
            <input type="checkbox" checked={cfg.alwaysOnTop} onChange={e => set("alwaysOnTop", e.target.checked)} />
            Always on top
          </label>
          <label className="row">
            <input type="checkbox" checked={cfg.launchAtLogin} onChange={e => set("launchAtLogin", e.target.checked)} />
            Launch at login
          </label>
          <p className="hint">Hotkey: Option+⌘+=</p>
          <button className="quitbtn" onClick={quitApp}>Quit Popup</button>
        </div>
      ) : (
        <textarea ref={areaRef} className="note"
          placeholder="type, it saves itself…  (esc hides)" value={text} autoFocus
          onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === "Escape") { e.preventDefault(); hideApp(); } }}
          spellCheck={false} />
      )}

      <footer className="foot">
        <span>{savedAt ? `saved ${savedAt.toLocaleTimeString()}` : ready ? "esc hides · ⌘Q quits" : "…"}</span>
        <span className="footbtns">
          <button className="linkbtn" onClick={() => { setText(""); areaRef.current?.focus(); }}>clear</button>
          <button className="linkbtn" onClick={hideApp}>hide</button>
          <button className="linkbtn" onClick={quitApp}>quit</button>
        </span>
      </footer>
    </div>
  );
}
