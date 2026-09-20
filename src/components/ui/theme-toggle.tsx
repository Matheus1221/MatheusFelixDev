"use client";

import { useSyncExternalStore } from "react";
import { getServerTheme, getTheme, setTheme, subscribeToTheme, type Theme } from "@/lib/theme";
import { Button } from "./button";

const options: readonly { value: Theme; label: string }[] = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Escuro" },
  { value: "system", label: "Sistema" },
];

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);

  return (
    <div className="theme-control">
      <span id="theme-label" className="theme-label">Tema</span>
      <div className="theme-options" role="group" aria-labelledby="theme-label">
        {options.map(({ value, label }) => (
          <Button
            key={value}
            variant="quiet"
            className="theme-option"
            data-theme-option={value}
            aria-pressed={theme === value}
            onClick={() => setTheme(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
