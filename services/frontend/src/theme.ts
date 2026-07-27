import { create } from "zustand";

/** system = OS 설정(prefers-color-scheme)을 따른다. */
export type ThemeMode = "system" | "light" | "dark";

const STORAGE_KEY = "unnest.theme";
const ORDER: ThemeMode[] = ["system", "light", "dark"];

export const THEME_LABEL: Record<ThemeMode, string> = {
  system: "시스템 설정",
  light: "라이트",
  dark: "다크",
};

function readStored(): ThemeMode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" || v === "system" ? v : "system";
  } catch {
    return "system"; // 저장소가 막힌 환경(사설 모드 등)에서도 동작해야 한다
  }
}

/**
 * data-theme 특성으로 styles.css의 토큰 오버라이드를 켠다.
 * system이면 특성을 지워 prefers-color-scheme 미디어쿼리가 다시 적용되게 한다.
 */
function applyMode(mode: ThemeMode): void {
  const root = document.documentElement;
  if (mode === "system") delete root.dataset.theme;
  else root.dataset.theme = mode;
}

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
}

export const useTheme = create<ThemeState>((set, get) => ({
  mode: (() => {
    const stored = readStored();
    applyMode(stored);
    return stored;
  })(),

  setMode: (mode) => {
    applyMode(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* 저장 실패는 무시 — 이번 세션에만 적용된다 */
    }
    set({ mode });
  },

  cycleMode: () => {
    const cur = get().mode;
    get().setMode(ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length]);
  },
}));
