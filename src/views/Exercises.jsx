import { HOW_TO } from "../data";
import Figure from "../components/Figure";
import { useHowTo } from "../components/HowTo";

const GROUPS = [
  { title: "Upper body & core", keys: ["pushup", "pike", "plank", "sideplank", "deadbug", "brace"] },
  { title: "Legs & glutes", keys: ["squat", "lunge", "bridge", "birddog"] },
  { title: "Posture & mobility", keys: ["wallslide", "chintuck", "squeeze", "hipflexor", "stretch"] },
  { title: "Breathing, mind & walking", keys: ["breathing", "meditation", "walk"] },
];

export default function Exercises() {
  const openHowTo = useHowTo();
  return (
    <>
      <p className="lead">Every move in your plan. Tap one for step-by-step instructions.</p>
      {GROUPS.map((g) => (
        <section key={g.title} className="lib-group">
          <h2 className="section-title">{g.title}</h2>
          <div className="lib-grid">
            {g.keys.map((k) => (
              <button key={k} className="lib-card" onClick={() => openHowTo(k)}>
                <div className="lib-fig">
                  <Figure name={k} animate />
                </div>
                <div className="lib-name">{HOW_TO[k].name}</div>
                <div className="lib-works">{HOW_TO[k].works.slice(0, 3).join(" · ")}</div>
              </button>
            ))}
          </div>
        </section>
      ))}
      <div className="note warn lib-note">
        <b>About your stomach bulge:</b> it flattens when you tighten your abs, so training abdominal control is
        worthwhile — but it doesn’t prove weak abs are the cause. These moves build strength and control; they won’t
        guarantee a flat stomach. A lump or ridge that persists (especially near the belly button) should be assessed.
      </div>
    </>
  );
}
