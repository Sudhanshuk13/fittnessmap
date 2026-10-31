import { useEffect, useState } from "react";
import { POSTURE } from "../data";
import { todayIso, formatTime } from "../store";
import { Card, Checklist, Bullets } from "../components/ui";

function BreathTimer() {
  const [total, setTotal] = useState(0);
  const [endAt, setEndAt] = useState(null);
  const [left, setLeft] = useState(0);
  const running = endAt !== null;

  useEffect(() => {
    if (!endAt) return;
    const tick = () => {
      const l = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      setLeft(l);
      if (l === 0) {
        navigator.vibrate?.([200, 100, 200]);
        setEndAt(null);
      }
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [endAt]);

  const start = (s) => {
    setTotal(s);
    setEndAt(Date.now() + s * 1000);
  };
  const inhale = Math.floor((total - left) / 4) % 2 === 0;

  return (
    <div className="breath">
      <div className={`orb ${running ? "run" : ""}`}>
        <span>{running ? (inhale ? "Breathe in" : "Breathe out") : "Ready"}</span>
      </div>
      <div className="timer-left">{running ? `${formatTime(left)} left` : "In 4s · Out 4s"}</div>
      <div className="btn-row">
        <button className="btn" onClick={() => start(180)}>
          Morning · 3 min
        </button>
        <button className="btn alt" onClick={() => start(300)}>
          Meditate · 5 min
        </button>
      </div>
      {running && (
        <button className="link-btn" onClick={() => setEndAt(null)}>
          Stop
        </button>
      )}
    </div>
  );
}

export default function Posture({ store }) {
  return (
    <div className="cols">
      <Card title="5-min posture routine">
        <Checklist store={store} date={todayIso} items={POSTURE} prefix="p" />
      </Card>

      <Card title="Breathing timer">
        <BreathTimer />
      </Card>

      <Card title="Morning breathing">
        <Bullets
          numbered
          items={[
            "Sit comfortably.",
            "Relax shoulders and jaw.",
            "Breathe gently through your nose.",
            "Let your abdomen move naturally.",
            "Exhale slowly, without forcing.",
          ]}
        />
        <p className="muted small">Don't hold your breath or force deep breaths. Stop if dizzy.</p>
      </Card>

      <Card title="Evening meditation">
        <Bullets
          numbered
          items={[
            "Sit comfortably.",
            "Notice your normal breathing.",
            "When a thought comes, notice it.",
            "Gently return to your breath.",
            "Continue for 5 minutes.",
          ]}
        />
        <p className="muted small">
          The aim isn't zero thoughts — it's practising coming back. Do daily for 2 weeks before going longer.
        </p>
      </Card>

      <Card title="While walking">
        <Bullets
          items={[
            "Look ahead, not down at your phone.",
            "Shoulders relaxed, arms swing naturally.",
            "Comfortable steps.",
            "Don't force your stomach in all day.",
          ]}
        />
      </Card>

      <Card title="At the computer">
        <p>
          Every <b>30–60 min</b>, stand up or change position.
        </p>
        <p className="muted small">Comfortable movement matters more than holding one perfect position.</p>
      </Card>
    </div>
  );
}
