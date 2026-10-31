import { useState } from "react";
import { WEEK, DAILY_HABITS } from "../data";
import { dateForWeekday, todayIdx } from "../store";
import { Card, Checklist, Note, Bullets } from "../components/ui";

const ORDER = [1, 2, 3, 4, 5, 6, 0]; // Mon → Sun
const MARK = { strength: "●", recovery: "○", rest: "–" };

export default function Today({ store, goto }) {
  const [selected, setSelected] = useState(todayIdx);
  const day = WEEK[selected];
  const date = dateForWeekday(selected);
  const workoutItems = day.items.map((it) => ({ ...it, meta: it.sets ? `${it.sets} sets × ${it.amount}` : it.amount }));

  return (
    <>
      <div className="chips">
        {ORDER.map((i) => {
          const d = WEEK[i];
          const dDate = dateForWeekday(i);
          const allDone = d.items.every((_, k) => store.isChecked(dDate, `w${k}`));
          return (
            <button
              key={i}
              className={`chip t-${d.type} ${i === selected ? "sel" : ""} ${i === todayIdx ? "is-today" : ""}`}
              onClick={() => setSelected(i)}
            >
              <span>{d.short}</span>
              <small>{allDone ? "✓" : MARK[d.type]}</small>
            </button>
          );
        })}
      </div>

      <Card className={`t-${day.type}`}>
        <p className="eyebrow">
          {selected === todayIdx ? "Today" : day.short} · {day.type}
        </p>
        <h2 className="day-title">{day.title}</h2>
        <p className="muted">{day.focus}</p>
        <Checklist store={store} date={date} items={workoutItems} prefix="w" metaOf={(it) => it.meta} />
        {day.note && <Note>{day.note}</Note>}
        {day.type === "strength" && (
          <button className="link-btn" onClick={() => goto("core")}>
            + Finish with the 15-min core routine →
          </button>
        )}
      </Card>

      <Card title="Daily checklist">
        <Checklist
          store={store}
          date={date}
          items={DAILY_HABITS}
          idOf={(h) => `h:${h.id}`}
          nameOf={(h) => h.label}
          metaOf={(h) => h.target}
        />
        <Note>
          Busy day? Prioritise the workout or walk, normal meals and sleep. You don't need to do every extra perfectly.
        </Note>
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
    </>
  );
}
