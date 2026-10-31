import { PHASES } from "../data";
import { programWeek, phaseFor, todayIso } from "../store";
import { Card, Bullets } from "../components/ui";

export default function Track({ store }) {
  const week = programWeek(store.start);
  const phase = phaseFor(week);

  const onSubmit = (e) => {
    e.preventDefault();
    store.saveEntry(Object.fromEntries(new FormData(e.target)));
  };

  return (
    <div className="cols">
      <Card title="12-week program">
        <label className="field">
          <span>Start date</span>
          <input type="date" value={store.start || ""} onChange={(e) => store.setStart(e.target.value)} />
        </label>
        {week ? (
          <p className="big">
            Week <b>{week}</b> of 12
          </p>
        ) : (
          <p className="muted">Set your start date to see your current phase.</p>
        )}
        <ul className="phases">
          {PHASES.map((p) => (
            <li key={p.title} className={`phase ${p === phase ? "cur" : ""}`}>
              <div className="phase-head">
                <span className="phase-wk">
                  Wk {p.weeks[0]}–{p.weeks[1]}
                </span>
                <b>{p.title}</b>
              </div>
              {p === phase && <Bullets items={p.points} />}
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Weekly check-in">
        <p className="muted small">
          Measure waist in the morning, before breakfast, without pulling your stomach in — same spot each time.
        </p>
        <form className="grid" onSubmit={onSubmit}>
          <label className="field">
            <span>Date</span>
            <input type="date" name="date" defaultValue={todayIso} required />
          </label>
          <label className="field">
            <span>Waist (cm)</span>
            <input type="number" step="0.1" inputMode="decimal" name="waist" />
          </label>
          <label className="field">
            <span>Weight (kg)</span>
            <input type="number" step="0.1" inputMode="decimal" name="weight" />
          </label>
          <label className="field">
            <span>Max push-ups</span>
            <input type="number" inputMode="numeric" name="pushups" />
          </label>
          <label className="field">
            <span>Plank (sec)</span>
            <input type="number" inputMode="numeric" name="plank" />
          </label>
          <button className="btn full" type="submit">
            Save check-in
          </button>
        </form>

        {store.log.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Waist</th>
                  <th>Kg</th>
                  <th>Push</th>
                  <th>Plank</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {[...store.log].reverse().map((e) => (
                  <tr key={e.date}>
                    <td>{e.date.slice(5)}</td>
                    <td>{e.waist || "–"}</td>
                    <td>{e.weight || "–"}</td>
                    <td>{e.pushups || "–"}</td>
                    <td>{e.plank || "–"}</td>
                    <td>
                      <button className="del" onClick={() => store.deleteEntry(e.date)} aria-label="Delete">
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Tracking tips">
        <Bullets
          items={[
            "Don't judge progress by how your stomach looks right after eating.",
            "Progress photos every 2–4 weeks max — same light, posture, time of day.",
            "Your abdomen looks different morning vs evening. That isn't fat change.",
            "Also note energy, sleep quality and walking duration.",
          ]}
        />
      </Card>

      <Card title="Daily habits">
        <Bullets
          items={[
            <><b>Sleep</b> 7–9 hours.</>,
            <><b>Don't sit</b> for hours continuously.</>,
            <><b>Hydrate</b> regularly — more when sweating.</>,
            <><b>Consistency:</b> a 15-min workout you do beats a 60-min one you skip.</>,
            <><b>Recovery:</b> don't train every muscle hard every day.</>,
            <><b>No need</b> for fat burners, detox drinks or pricey supplements.</>,
          ]}
        />
      </Card>

      <p className="footer muted small">Data is saved only on this device.</p>
    </div>
  );
}
