/**
 * 인라인 SVG 아이콘 셋.
 *
 * 외부 아이콘 패키지를 쓰지 않는다 (원칙 1 — 폐쇄망에서 네트워크 없이 렌더돼야 하고,
 * 빌드 산출물에 폰트/스프라이트 요청이 남으면 안 된다). 컴포넌트 스펙의 `icon`
 * 문자열(예: "file-text")을 그대로 키로 쓰고, 모르는 이름은 "box"로 폴백한다.
 */

/** 선이 아니라 면으로 그리는 아이콘 */
const FILLED = new Set(["play"]);

const PATHS: Record<string, string> = {
  // ── 컴포넌트 카테고리 ──────────────────────────────────────────
  box: "M12 3l8 4.5v9L12 21l-8-4.5v-9z M4 7.5l8 4.5 8-4.5 M12 12v9",
  "file-text": "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5 M9 13h6 M9 17h4",
  "align-left": "M4 6h16 M4 12h10 M4 18h13",
  table: "M4 5h16v14H4z M4 10h16 M10 10v9",
  scissors: "M7.5 16.5L19 5 M16.5 16.5L5 5 M6 18.5h.01 M18 18.5h.01",
  pilcrow: "M13 4v16 M17 4v16 M13 4H9.5a4.5 4.5 0 0 0 0 9H13",
  scale: "M12 4v16 M8 20h8 M6 8h12 M6 8l-3 6a3.4 3.4 0 0 0 6 0z M18 8l-3 6a3.4 3.4 0 0 0 6 0z",
  cpu: "M6 6h12v12H6z M9.5 9.5h5v5h-5z M12 2v4 M12 18v4 M2 12h4 M18 12h4",
  database: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  search: "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z M16.2 16.2L21 21",
  type: "M4 7V4h16v3 M9 20h6 M12 4v16",
  layers: "M12 3l9 5-9 5-9-5z M3 13l9 5 9-5",
  "git-merge": "M7 4v5a4 4 0 0 0 4 4h6 M17 4v5a4 4 0 0 1-4 4 M12 13v7",
  sparkles:
    "M11 3l1.7 4.3L17 9l-4.3 1.7L11 15l-1.7-4.3L5 9l4.3-1.7z M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z",
  "layout-template": "M4 4h16v5H4z M4 12h7v8H4z M13 12h7v8h-7z",
  upload: "M12 15V3 M7 8l5-5 5 5 M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4",
  "message-circle": "M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3.5 21l1.9-5.2A8.5 8.5 0 1 1 21 11.5z",
  "message-square": "M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z",
  list: "M8 6h13 M8 12h13 M8 18h13 M3.5 6h.01 M3.5 12h.01 M3.5 18h.01",

  // ── UI ────────────────────────────────────────────────────────
  play: "M7 4l12 8-12 8z",
  check: "M5 12.5l4.5 4.5L20 6.5",
  package: "M12 3l8 4.5v9L12 21l-8-4.5v-9z M4 7.5l8 4.5 8-4.5 M12 12v9",
  plus: "M12 5v14 M5 12h14",
  "chevron-down": "M6 9l6 6 6-6",
  x: "M6 6l12 12 M18 6L6 18",
  save: "M5 4h11l3 3v13H5z M8 4v6h7V4 M8 15h8",
  "folder-open": "M3 7a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v2H3z M3 11h18l-2 8H5z",
  download: "M12 3v12 M7 10l5 5 5-5 M4 20h16",
  "file-plus": "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5 M12 11v6 M9 14h6",
  sun: "M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1.5 1.5 M17.5 17.5L19 19 M19 5l-1.5 1.5 M6.5 17.5L5 19",
  moon: "M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z",
  monitor: "M3 5h18v11H3z M9 20h6 M12 16v4",
};

export interface IconProps {
  /** 컴포넌트 스펙의 icon 값 또는 UI 아이콘 이름 */
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 14, className }: IconProps) {
  const d = PATHS[name] ?? PATHS.box;
  const filled = FILLED.has(name);
  return (
    <svg
      className={className ? `icon ${className}` : "icon"}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
