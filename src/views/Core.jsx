import { CORE_ROUTINE } from "../data";
import { todayIso } from "../store";
import { Card, Checklist, Note } from "../components/ui";

export default function Core({ store }) {
  return (
    <>
      <Card title="15-min core routine">
        <p className="muted">
          Do on workout days, after your main exercises. Skip on recovery days. 3–4 days a week is plenty.
        </p>
        <Checklist store={store} date={todayIso} items={CORE_ROUTINE} prefix="c" />
        <p className="hint">Tap an exercise to see how to do it.</p>
      </Card>

      <Card title="Why this helps">
        <p>
          Your stomach bulges in push-ups and planks but flattens when you tighten it — so abdominal <b>control</b> is
          worth training.
        </p>
        <p className="muted">
          That doesn't prove weak abs are the cause, and doesn't rule out bloating or an abdominal-wall issue.
        </p>
      </Card>

      <Note kind="warn">
        <b>Realistic expectation:</b> these build core strength and control but won't guarantee a flat stomach. If you
        notice a lump or ridge that persists — especially around the belly button or along the midline — get it
        assessed before progressing.
      </Note>
    </>
  );
}
