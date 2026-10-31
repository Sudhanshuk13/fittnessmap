import { useState } from "react";
import { WEEK, DAILY_HABITS, CORE_ROUTINE } from "../data";
import { dateForWeekday, todayIdx } from "../store";
import { Card, Checklist, Note, Bullets } from "../components/ui";

const ORDER = [1, 2, 3, 4, 5, 6, 0]; // Mon → Sun
const TYPE_LABEL = { strength: "Strength", recovery: "Active recovery", rest: "Rest" };

export default function Today({ store }) {
  const [selected, setSelected] = useState(todayIdx);
  const day = WEEK[selected];
  const date = dateForWeekday(selected);
  const workoutItems = day.items.map((it) => ({ ...it, meta: it.sets ? `${it.sets} sets × ${it.amount}` : it.amount }));

  return (
    <>
      <div className="chips" role="tablist" aria-label="Day of week">
        {ORDER.map((i) => {
          const d = WEEK[i];
          const dDate = dateForWeekday(i);
          const allDone = d.items.every((_, k) => store.isChecked(dDate, `w${k}`));
          return (
            <button
              key={i}
              role="tab"
              aria-selected={i === selected}
              className={`chip t-${d.type} ${i === selected ? "sel" : ""} ${i === todayIdx ? "is-today" : ""}`}
              onClick={() => setSelected(i)}
            >
              <span>{d.short}</span>
              <i className={`dot ${allDone ? "ok" : ""}`} />
            </button>
          );
        })}
      </div>

      <div className="cols">
        <Card className={`hero-card t-${day.type}`}>
          <p className="eyebrow">
            {selected === todayIdx ? "Today" : day.short} · {TYPE_LABEL[day.type]}
          </p>
          <h2 className="day-title">{day.title}</h2>
          <p className="muted">{day.focus}</p>
          <Checklist store={store} date={date} items={workoutItems} prefix="w" metaOf={(it) => it.meta} />
          {day.note && <Note>{day.note}</Note>}
          {day.type === "strength" && <p className="hint">Tap a picture or “How?” to see how to do it.</p>}
        </Card>

        {day.type === "strength" && (
          <Card title="Then: 15-min core routine" subtitle="Right after the workout. Gentle and controlled.">
            <Checklist store={store} date={date} items={CORE_ROUTINE} prefix="c" />
            <Note kind="warn">
              Notice a lump or ridge along your belly’s midline that stays? Get it checked before progressing core
              work.
            </Note>
          </Card>
        )}

        <Card title="Daily checklist">
          <Checklist
            store={store}
            date={date}
            items={DAILY_HABITS}
            idOf={(h) => `h:${h.id}`}
            nameOf={(h) => h.label}
            metaOf={(h) => h.target}
          />
          <Note>Busy day? Prioritise the workout or walk, normal meals and sleep.</Note>
        </Card>

        <Card title="Breathing during exercise">
          <Bullets
            items={[
              <><b>Push-ups:</b> breathe in going down, out pushing up.</>,
              <><b>Squats:</b> breathe in going down, out standing up.</>,
              "Never hold your breath through a whole set.",
            ]}
          />
        </Card>
      </div>
    </>
  );
}
