import { createContext, useContext, useEffect, useState } from "react";
import { HOW_TO } from "../data";
import { FIGURES } from "../figures";
import Figure from "./Figure";
import BreathTimer from "./BreathTimer";

const HowToContext = createContext(() => {});
export const useHowTo = () => useContext(HowToContext);

export function HowToProvider({ children }) {
  const [open, setOpen] = useState(null); // { exercise, meta }
  return (
    <HowToContext.Provider value={(exercise, meta) => setOpen({ exercise, meta })}>
      {children}
      {open && <HowToSheet {...open} onClose={() => setOpen(null)} />}
    </HowToContext.Provider>
  );
}

function HowToSheet({ exercise, meta, onClose }) {
  const info = HOW_TO[exercise];
  const fig = FIGURES[exercise];
  const hasGlow = fig.poses.some((p) => p.glow > 0.3);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={info.name} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grab" />
        <header className="sheet-head">
          <div>
            <h2>{info.name}</h2>
            {meta && <p className="sheet-meta">{meta}</p>}
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="sheet-grid">
          <div className="sheet-visual">
            <div className="hero">
              <Figure name={exercise} animate ghost={!info.timer} labels />
            </div>
            <div className="legend">
              {fig.focus && (
                <span>
                  <i className="l-move" /> Moving part
                </span>
              )}
              {hasGlow && (
                <span>
                  <i className="l-glow" /> {info.glowLabel || "Gently tighten here"}
                </span>
              )}
              {!info.timer && (
                <span>
                  <i className="l-ghost" /> Start position
                </span>
              )}
            </div>
            {info.timer && (
              <div className="sheet-timer">
                <BreathTimer presets={info.timer} />
              </div>
            )}
            <div className={`frames ${info.timer ? "hide" : ""}`}>
              <figure>
                <Figure name={exercise} t={0} />
                <figcaption>
                  <b>1</b> Start
                </figcaption>
              </figure>
              <figure>
                <Figure name={exercise} t={1} />
                <figcaption>
                  <b>2</b> Move
                </figcaption>
              </figure>
            </div>
            <div className="works">
              {info.works.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
          </div>

          <div className="sheet-text">
            <h3>How to do it</h3>
            <ol className="steps-big">
              {info.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <h3>Avoid</h3>
            <ul className="avoid">
              {info.avoid.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <button className="btn full sheet-done" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
