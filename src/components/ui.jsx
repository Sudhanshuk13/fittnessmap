import { useState } from "react";
import { HOW_TO } from "../data";

export function Card({ title, className = "", children }) {
  return (
    <section className={`card ${className}`}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

export function Fold({ title, children }) {
  const [open, setOpen] = useState(false);
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
      <span className="progress-label">
        {done}/{total}
      </span>
    </div>
  );
}

export function CheckRow({ done, onToggle, name, meta, how, steps }) {
  const [open, setOpen] = useState(false);
  const detail = steps || (how && HOW_TO[how]);
  return (
    <li className={`row ${done ? "done" : ""}`}>
      <button className="check" onClick={onToggle} aria-label={`Mark ${name} done`}>
        {done ? "✓" : ""}
      </button>
      <div className="row-body" onClick={() => detail && setOpen(!open)}>
        <div className="row-title">{name}</div>
        <div className="row-meta">{meta}</div>
      </div>
      {detail && (
        <button className={`chev ${open ? "up" : ""}`} onClick={() => setOpen(!open)} aria-label="How to">
          ⌄
        </button>
      )}
      {detail && open && (
        <ol className="steps">
          {detail.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      )}
    </li>
  );
}

// Renders a checklist for `items` on `date`, with ids `${prefix}${index}`
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
            steps={it.steps}
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
