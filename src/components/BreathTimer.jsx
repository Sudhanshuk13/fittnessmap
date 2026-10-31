import { useEffect, useState } from "react";
import { formatTime } from "../store";

const DEFAULT_PRESETS = [
  { label: "Morning breathing · 3 min", seconds: 180, mode: "breathe" },
  { label: "Meditation · 5 min", seconds: 300, mode: "meditate" },
];

// Guided timer. "breathe" paces 4 s in / 4 s out; "meditate" just gently pulses.
export default function BreathTimer({ presets = DEFAULT_PRESETS }) {
  const [run, setRun] = useState(null); // { seconds, mode, endAt }
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!run) return;
    const tick = () => {
      const l = Math.max(0, Math.round((run.endAt - Date.now()) / 1000));
      setLeft(l);
      if (l === 0) {
        navigator.vibrate?.([200, 100, 200]);
        setRun(null);
      }
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [run]);

  const start = (p) => setRun({ ...p, endAt: Date.now() + p.seconds * 1000 });
  const elapsed = run ? run.seconds - left : 0;
  const inhale = Math.floor(elapsed / 4) % 2 === 0;

  let prompt = "Ready";
  if (run?.mode === "breathe") prompt = inhale ? "Breathe in" : "Breathe out";
  if (run?.mode === "meditate") prompt = elapsed % 40 < 30 ? "Notice your breath" : "Drifted? Come back";

  return (
    <div className="breath">
      <div className={`orb ${run ? (run.mode === "breathe" ? "run" : "calm") : ""}`}>
        <span>{prompt}</span>
      </div>
      <div className="timer-left">
        {run ? `${formatTime(left)} left` : presets.some((p) => p.mode === "breathe") ? "In 4 s · Out 4 s · through the nose" : "Sit comfortably, eyes closed or soft"}
      </div>
      {run ? (
        <button className="btn alt full" onClick={() => setRun(null)}>
          Stop
        </button>
      ) : (
        <div className="btn-row" style={{ gridTemplateColumns: `repeat(${presets.length}, 1fr)` }}>
          {presets.map((p, i) => (
            <button key={p.label} className={`btn ${i ? "alt" : ""}`} onClick={() => start(p)}>
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
