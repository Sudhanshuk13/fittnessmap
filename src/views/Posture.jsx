import { POSTURE } from "../data";
import { todayIso } from "../store";
import { Card, Checklist, Bullets } from "../components/ui";
import BreathTimer from "../components/BreathTimer";
import { useHowTo } from "../components/HowTo";

export default function Posture({ store }) {
  const openHowTo = useHowTo();
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
        <button className="link-btn" onClick={() => openHowTo("breathing")}>
          See how, with picture →
        </button>
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
        <button className="link-btn" onClick={() => openHowTo("meditation")}>
          See how, with picture →
        </button>
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
        <button className="link-btn" onClick={() => openHowTo("walk")}>
          See how, with picture →
        </button>
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
