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

function useCycle(enabled) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!enabled || reducedMotion()) return;
    const fn = (now) => setT(cycle(now));
    listeners.add(fn);
    if (!raf) raf = requestAnimationFrame(tick);
    return () => listeners.delete(fn);
  }, [enabled]);
  return t;
}

// Tight viewBox around both poses so figures fill their frame.
const boxCache = {};
function fitBox(name) {
  if (boxCache[name]) return boxCache[name];
  const fig = FIGURES[name];
  if (fig.view) return (boxCache[name] = fig.view);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = FLOOR + 4;
  for (const t of [0, 0.5, 1]) {
    const g = geometry(fig, t);
    const pts = g.lines.flatMap((l) => l.pts).concat([
      [g.head[0] - HEAD_R, g.head[1] - HEAD_R],
      [g.head[0] + HEAD_R, g.head[1] + HEAD_R],
    ]);
    for (const [x, y] of pts) {
      x0 = Math.min(x0, x); y0 = Math.min(y0, y);
      x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    }
  }
  const pad = 10;
  let w = x1 - x0 + pad * 2, h = y1 - y0 + pad * 2;
  // keep a pleasant landscape-ish frame
  const minW = h * 1.3;
  if (w < minW) { x0 -= (minW - w) / 2; w = minW; }
  return (boxCache[name] = `${x0 - pad} ${y0 - pad} ${w} ${h}`);
}

const pts = (arr) => arr.map((p) => p.join(",")).join(" ");

export default function Figure({ name, t = 1, animate = false, className = "" }) {
  const fig = FIGURES[name];
  const live = useCycle(animate);
  const markerId = useId().replace(/:/g, "");
  if (!fig) return null;

  const g = geometry(fig, animate ? live : t);
  const [vx, vy, vw, vh] = fitBox(name).split(" ").map(Number);

  return (
    <svg className={`figure ${className}`} viewBox={`${vx} ${vy} ${vw} ${vh}`} aria-hidden="true">
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0L10 5L0 10z" className="fig-arrow-head" />
        </marker>
      </defs>
      {fig.wall && <rect className="fig-wall" x={vx} y={vy} width={vw} height={FLOOR + 3 - vy} />}
      <line className="fig-floor" x1={vx} x2={vx + vw} y1={FLOOR + 3} y2={FLOOR + 3} />
      {g.glow && (
        <ellipse
          className="fig-glow"
          cx={g.glow.c[0]} cy={g.glow.c[1]} rx="15" ry="10"
          opacity={g.glow.opacity}
          transform={`rotate(${g.glow.angle} ${g.glow.c[0]} ${g.glow.c[1]})`}
        />
      )}
      {g.lines.map((l, i) => (
        <polyline key={i} className={l.far ? "fig-limb far" : "fig-limb"} points={pts(l.pts)} />
      ))}
      <polyline className="fig-limb" points={pts(g.neckLine)} />
      <circle className="fig-head" cx={g.head[0]} cy={g.head[1]} r={HEAD_R} />
      {g.nose && <polyline className="fig-nose" points={pts(g.nose)} />}
      {fig.arrows?.map((a, i) => (
        <line key={i} className="fig-arrow" x1={a.from[0]} y1={a.from[1]} x2={a.to[0]} y2={a.to[1]} markerEnd={`url(#${markerId})`} />
      ))}
    </svg>
  );
}
