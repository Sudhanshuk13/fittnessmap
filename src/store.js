import { useEffect, useState } from "react";
import { PHASES } from "./data";

const KEY = "dailyfitnessmap.v1";

// ---------- dates ----------
const pad = (n) => String(n).padStart(2, "0");
export const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const formatTime = (s) => `${Math.floor(s / 60)}:${pad(s % 60)}`;

export const now = new Date();
export const todayIdx = now.getDay(); // 0 = Sunday
export const todayIso = iso(now);

// Date of a weekday (0=Sun) inside the current Mon–Sun week
export function dateForWeekday(idx) {
  const d = new Date(now);
  d.setDate(d.getDate() - ((todayIdx + 6) % 7) + ((idx + 6) % 7));
  return iso(d);
}

export function programWeek(start) {
  if (!start) return null;
  const days = Math.floor((now - new Date(start + "T00:00")) / 86400000);
  return days < 0 ? null : Math.floor(days / 7) + 1;
}

export function phaseFor(week) {
  if (!week) return null;
  return PHASES.find((p) => week >= p.weeks[0] && week <= p.weeks[1]) || PHASES[PHASES.length - 1];
}

// ---------- persisted state ----------
function load() {
  try {
    return { checks: {}, start: null, log: [], ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { checks: {}, start: null, log: [] };
  }
}

export function useStore() {
  const [state, setState] = useState(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  return {
    start: state.start,
    log: state.log,
    isChecked: (date, id) => !!state.checks[date]?.[id],
    toggle: (date, id) => {
      navigator.vibrate?.(10);
      setState((s) => ({
        ...s,
        checks: { ...s.checks, [date]: { ...s.checks[date], [id]: !s.checks[date]?.[id] } },
      }));
    },
    setStart: (start) => setState((s) => ({ ...s, start: start || null })),
    saveEntry: (entry) =>
      setState((s) => ({
        ...s,
        log: [...s.log.filter((e) => e.date !== entry.date), entry].sort((a, b) => a.date.localeCompare(b.date)),
      })),
    deleteEntry: (date) => setState((s) => ({ ...s, log: s.log.filter((e) => e.date !== date) })),
  };
}
