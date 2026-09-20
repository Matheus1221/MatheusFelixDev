export type Theme = "light" | "dark" | "system";

const storageKey = "portfolio-theme";
const changeEvent = "portfolio-theme-change";

function normalizeTheme(value: string | null | undefined): Theme {
  return value === "light" || value === "dark" ? value : "system";
}

// Runs in <head> before the body is painted. Interpolates static code only.
export const themeInitializationScript = `(()=>{try{const t=localStorage.getItem("${storageKey}");document.documentElement.dataset.theme=t==="light"||t==="dark"?t:"system"}catch{}})()`;

export function getTheme(): Theme {
  return normalizeTheme(document.documentElement.dataset.theme);
}

export function getServerTheme(): Theme {
  return "system";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // The current tab still works when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(changeEvent));
}

export function subscribeToTheme(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== storageKey && event.key !== null) return;
    document.documentElement.dataset.theme = normalizeTheme(event.newValue);
    onChange();
  }

  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
