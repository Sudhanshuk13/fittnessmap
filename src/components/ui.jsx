import { useState } from "react";
import Figure from "./Figure";
import { useHowTo } from "./HowTo";

export function Card({ title, subtitle, className = "", children }) {
  return (
    <section className={`card ${className}`}>
      {title && <h2>{title}</h2>}
      {subtitle && <p className="card-sub">{subtitle}</p>}
      {children}
    </section>
  );
}

const isWide = () => window.matchMedia?.("(min-width: 900px)").matches;

export function Fold({ title, children, defaultOpen = isWide() }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="card fold">
      <button className="fold-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <h2>{title}</h2>
        <span className={`chev ${open ? "up" : ""}`}>⌄</span>
      </button>
      {open && <div className="fold-body">{children}</div>}
    </section>
  );
}

export function Progress({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="progress-wrap">
      <div className="progress">
        <span style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">{pct === 100 ? "Done 🎉" : `${done}/${total}`}</span>
    </div>
  );
}

export function CheckRow({ done, onToggle, name, meta, how, icon }) {
  const openHowTo = useHowTo();
  const show = how ? () => openHowTo(how, meta) : undefined;
  return (
    <li className={`row ${done ? "done" : ""}`}>
      <button className="check" onClick={onToggle} aria-label={`Mark ${name} done`} aria-pressed={done}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </button>
      {how ? (
        <button className="thumb" onClick={show} aria-label={`How to do ${name}`}>
          <Figure name={how} />
        </button>
      ) : (
        <span className="thumb emoji" aria-hidden="true">
          {icon || "•"}
        </span>
      )}
      <div className={`row-body ${how ? "clickable" : ""}`} onClick={show}>
        <div className="row-title">{name}</div>
        <div className="row-meta">{meta}</div>
      </div>
      {how && (
        <button className="how-btn" onClick={show}>
          How?
        </button>
      )}
    </li>
  );
}

// Checklist for `items` on `date`. Ids default to `${prefix}${index}`.
export function Checklist({ store, date, items, prefix, idOf, metaOf = (it) => it.amount, nameOf = (it) => it.name }) {
  const id = (it, i) => (idOf ? idOf(it) : `${prefix}${i}`);
  const done = items.filter((it, i) => store.isChecked(date, id(it, i))).length;
  return (
    <>
      <Progress done={done} total={items.length} />
      <ul className="rows">
        {items.map((it, i) => (
          <CheckRow
            key={id(it, i)}
            done={store.isChecked(date, id(it, i))}
            onToggle={() => store.toggle(date, id(it, i))}
            name={nameOf(it)}
            meta={metaOf(it)}
            how={it.how}
            icon={it.icon}
          />
        ))}
      </ul>
    </>
  );
}

export const Note = ({ kind = "info", children }) => <div className={`note ${kind}`}>{children}</div>;

export const Bullets = ({ items, numbered }) => {
  const Tag = numbered ? "ol" : "ul";
  return (
    <Tag className={`bullets ${numbered ? "num" : ""}`}>
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </Tag>
  );
};
