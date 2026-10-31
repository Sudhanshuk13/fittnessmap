import { useEffect, useId, useState } from "react";
import { FIGURES, FLOOR, HEAD_R, geometry, cycle } from "../figures";

// One shared animation clock for every animated figure on the page.
const listeners = new Set();
let raf = 0;
function tick(now) {
  listeners.forEach((fn) => fn(now));
  raf = listeners.size ? requestAnimationFrame(tick) : 0;
}
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function useCycle(enabled, period) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!enabled || reducedMotion()) return;
    const fn = (now) => setT(cycle(now, period));
    listeners.add(fn);
    if (!raf) raf = requestAnimationFrame(tick);
    return () => listeners.delete(fn);
  }, [enabled, period]);
  return t;
}

const labelPos = (g, l) => {
  const p = g.points[l.at];
  return { p, x: p[0] + l.dx, y: p[1] + l.dy };
};

// Tight viewBox around every pose (and labels, if shown) so figures fill their frame.
// Returns [x, y, w, h, labelFontSize]. Label size scales with the frame so text
// reads the same on tall standing figures and short lying-down ones.
const boxCache = {};
function fitBox(name, withLabels) {
  const key = name + withLabels;
  if (boxCache[key]) return boxCache[key];
  const fig = FIGURES[name];
  const samples = [0, 0.25, 0.5, 0.75, 1].map((t) => geometry(fig, t));

  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = FLOOR + 4;
  const add = (x, y) => {
    x0 = Math.min(x0, x); y0 = Math.min(y0, y);
    x1 = Math.max(x1, x); y1 = Math.max(y1, y);
  };
  for (const g of samples) {
    g.segs.forEach((s) => { add(...s.a); add(...s.b); });
    add(g.head[0] - HEAD_R, g.head[1] - HEAD_R);
    add(g.head[0] + HEAD_R, g.head[1] + HEAD_R);
    fig.arrows?.forEach((a) => { add(...a.from); add(...a.to); });
  }
  const size = Math.max(6.5, (y1 - y0) * 0.075);

  if (fig.view) {
    const v = fig.view.split(" ").map(Number);
    return (boxCache[key] = [...v, Math.max(6.5, v[3] * 0.07)]);
  }
  if (withLabels) {
    for (const g of samples) {
      for (const l of fig.labels || []) {
        const { x, y } = labelPos(g, l);
        const w = l.text.length * size * 0.56;
        const left = l.align === "start" ? x : l.align === "end" ? x - w : x - w / 2;
        add(left, y - size);
        add(left + w, y + 2);
      }
    }
  }
  const pad = 9;
  let w = x1 - x0 + pad * 2;
  const h = y1 - y0 + pad * 2;
  const minW = h * 1.3; // keep a landscape-ish frame
  if (w < minW) { x0 -= (minW - w) / 2; w = minW; }
  return (boxCache[key] = [x0 - pad, y0 - pad, w, h, size]);
}

function Body({ g, focus, className = "" }) {
  return (
    <g className={className}>
      {g.glow && (
        <ellipse
          className="fig-glow"
          cx={g.glow.c[0]} cy={g.glow.c[1]} rx="16" ry="11"
          opacity={g.glow.opacity}
          transform={`rotate(${g.glow.angle} ${g.glow.c[0]} ${g.glow.c[1]})`}
        />
      )}
      {g.segs.map((s, i) => {
        const cls = `fig-seg ${s.far ? "far" : ""} ${focus.includes(s.part) ? "move" : ""}`;
        return (
          <g key={i} className={cls}>
            <line x1={s.a[0]} y1={s.a[1]} x2={s.b[0]} y2={s.b[1]} strokeWidth={s.w} />
            {s.hand && <circle cx={s.b[0]} cy={s.b[1]} r="4.2" />}
          </g>
        );
      })}
      <circle className={`fig-head ${focus.includes("head") ? "move" : ""}`} cx={g.head[0]} cy={g.head[1]} r={HEAD_R} />
      {g.nose && <line className="fig-nose" x1={g.nose[0][0]} y1={g.nose[0][1]} x2={g.nose[1][0]} y2={g.nose[1][1]} />}
    </g>
  );
}

export default function Figure({ name, t = 1, animate = false, ghost = false, labels = false, className = "" }) {
  const fig = FIGURES[name];
  const live = useCycle(animate, fig?.period);
  const markerId = useId().replace(/:/g, "");
  if (!fig) return null;

  const g = geometry(fig, animate ? live : t);
  const [vx, vy, vw, vh, fontSize] = fitBox(name, labels);
  const focus = fig.focus || [];

  return (
    <svg className={`figure ${className}`} viewBox={`${vx} ${vy} ${vw} ${vh}`} aria-hidden="true">
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M0 0L10 5L0 10z" className="fig-arrow-head" />
        </marker>
      </defs>
      {fig.wall && <rect className="fig-wall" x={vx} y={vy} width={vw} height={FLOOR + 3 - vy} />}
      <rect className="fig-mat" x={vx} y={FLOOR + 1.5} width={vw} height={vh} />
      {ghost && <Body g={geometry(fig, 0)} focus={[]} className="fig-ghost" />}
      <Body g={g} focus={focus} />
      {fig.arrows?.map((a, i) => (
        <line key={i} className="fig-arrow" x1={a.from[0]} y1={a.from[1]} x2={a.to[0]} y2={a.to[1]} markerEnd={`url(#${markerId})`} />
      ))}
      {labels &&
        fig.labels?.map((l) => {
          const { p, x, y } = labelPos(g, l);
          return (
            <g key={l.text} className="fig-label">
              <line x1={p[0]} y1={p[1]} x2={x} y2={y - fontSize * 0.3} />
              <circle cx={p[0]} cy={p[1]} r="1.6" />
              <text x={x} y={y} textAnchor={l.align || "middle"} fontSize={fontSize}>
                {l.text}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
