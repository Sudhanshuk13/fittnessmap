// Stick-figure illustrations for each exercise.
//
// A pose is described by a hip point, a torso angle and limbs. Angles are in
// degrees, SVG style: 0 = right, 90 = down, -90 = up. A limb is either
//   { a: [upperAngle, lowerAngle] }       — fixed angles, or
//   { to: [x, y], bend: 1 | -1 }           — reach for a point (2-joint IK).
// arms/legs: [near, far]. Far limbs are drawn lighter, behind the body.
// Front-view figures (front: true) draw arms/legs from left and right sides instead.

export const FLOOR = 108;
const L = { torso: 38, neck: 13, upper: 20, fore: 19, thigh: 25, shin: 25 };
export const HEAD_R = 8;

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const step = ([x, y], a, l) => [x + l * Math.cos(rad(a)), y + l * Math.sin(rad(a))];

function limb(start, spec, l1, l2) {
  if (spec.a) {
    const mid = step(start, spec.a[0], l1);
    return [start, mid, step(mid, spec.a[1], l2)];
  }
  const dx = spec.to[0] - start[0];
  const dy = spec.to[1] - start[1];
  const d = Math.min(Math.max(Math.hypot(dx, dy), Math.abs(l1 - l2) + 0.01), l1 + l2 - 0.01);
  const base = deg(Math.atan2(dy, dx));
  const alpha = deg(Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)));
  return [start, step(start, base + (spec.bend ?? 1) * alpha, l1), step(start, base, d)];
}

const pair = (arr) => (arr.length === 1 ? [arr[0], arr[0]] : arr);

function lerp(a, b, t) {
  if (typeof a === "number") return a + ((b ?? a) - a) * t;
  if (Array.isArray(a)) return a.map((v, i) => lerp(v, b?.[i], t));
  if (a && typeof a === "object") {
    const o = {};
    for (const k in a) o[k] = k === "bend" ? a[k] : lerp(a[k], b?.[k], t);
    return o;
  }
  return a;
}

// Returns drawable geometry for a figure at time t (0 = start pose, 1 = end pose).
export function geometry(fig, t) {
  const [p0, p1] = fig.poses.map((p) => ({ glow: 0, ...p, arms: pair(p.arms), legs: pair(p.legs) }));
  const p = lerp(p0, p1 || p0, t);
  const neck = step(p.hip, p.torso, L.torso);
  const head = step(neck, p.head ?? p.torso, L.neck);
  const lines = [];

  if (fig.front) {
    const sw = 13, hw = 7;
    const sh = [[neck[0] + sw, neck[1]], [neck[0] - sw, neck[1]]];
    const hp = [[p.hip[0] + hw, p.hip[1]], [p.hip[0] - hw, p.hip[1]]];
    p.legs.forEach((s, i) => lines.push({ pts: limb(hp[i], s, L.thigh, L.shin) }));
    lines.push({ pts: [hp[0], hp[1]] }, { pts: [p.hip, neck] }, { pts: [sh[0], sh[1]] });
    p.arms.forEach((s, i) => lines.push({ pts: limb(sh[i], s, L.upper, L.fore) }));
  } else {
    lines.push({ pts: limb(p.hip, p.legs[1], L.thigh, L.shin), far: true });
    lines.push({ pts: limb(neck, p.arms[1], L.upper, L.fore), far: true });
    lines.push({ pts: limb(p.hip, p.legs[0], L.thigh, L.shin) });
    lines.push({ pts: [p.hip, neck] });
    lines.push({ pts: limb(neck, p.arms[0], L.upper, L.fore) });
  }

  const glowAt = fig.glowAt ?? 0.45;
  const glow = p.glow > 0 && {
    c: [p.hip[0] + (neck[0] - p.hip[0]) * glowAt, p.hip[1] + (neck[1] - p.hip[1]) * glowAt],
    angle: p.torso,
    opacity: p.glow,
  };
  const nose = fig.face != null && [step(head, fig.face, HEAD_R - 1), step(head, fig.face, HEAD_R + 3)];

  return { lines, head, nose, glow, neckLine: [neck, head] };
}

// Smooth back-and-forth with short holds at each end.
export function cycle(ms, period = 3600) {
  const ph = (ms % period) / period;
  const ease = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x);
  if (ph < 0.15) return 0;
  if (ph < 0.5) return ease((ph - 0.15) / 0.35);
  if (ph < 0.65) return 1;
  return 1 - ease((ph - 0.65) / 0.35);
}

// ---------- poses ----------
const standing = { hip: [100, 58], torso: -90, arms: [{ a: [90, 90] }], legs: [{ to: [100, FLOOR], bend: -1 }] };
const onBackKneesBent = {
  hip: [92, 100], torso: 0, head: 0,
  arms: [{ a: [178, 178] }],
  legs: [{ to: [62, 106], bend: 1 }],
};

export const FIGURES = {
  pushup: {
    face: 60,
    poses: [
      { hip: [76, 86], torso: -28, arms: [{ to: [110, FLOOR], bend: 1 }], legs: [{ to: [30, FLOOR], bend: -1 }] },
      { hip: [81, 95], torso: -14, arms: [{ to: [110, FLOOR], bend: 1 }], legs: [{ to: [30, FLOOR], bend: -1 }] },
    ],
  },
  pike: {
    face: 110,
    poses: [
      { hip: [80, 61], torso: 37.6, arms: [{ to: [141, FLOOR], bend: -1 }], legs: [{ to: [63, FLOOR], bend: 1 }] },
      { hip: [84, 62], torso: 45, arms: [{ to: [141, FLOOR], bend: -1 }], legs: [{ to: [63, FLOOR], bend: 1 }] },
    ],
  },
  deadbug: {
    face: -90,
    poses: [
      { hip: [80, 100], torso: 0, head: 0, arms: [{ a: [-90, -90] }, { a: [-90, -90] }], legs: [{ a: [-90, -180] }, { a: [-90, -180] }] },
      { hip: [80, 100], torso: 0, head: 0, arms: [{ a: [-15, -15] }, { a: [-90, -90] }], legs: [{ a: [-90, -180] }, { a: [-184, -184] }] },
    ],
  },
  plank: {
    face: 60,
    poses: [
      { hip: [93, 95], torso: -15, arms: [{ a: [90, 0] }], legs: [{ to: [45, FLOOR], bend: -1 }], glow: 0.15 },
      { hip: [93, 95], torso: -15, arms: [{ a: [90, 0] }], legs: [{ to: [45, FLOOR], bend: -1 }], glow: 0.9 },
    ],
  },
  bridge: {
    face: -90,
    glowAt: 0.05,
    poses: [
      onBackKneesBent,
      { ...onBackKneesBent, hip: [95, 80], torso: 31.8, glow: 0.8 },
    ],
  },
  squat: {
    face: 0,
    poses: [
      { ...standing, head: -90 },
      { hip: [80, 84], torso: -58, head: -70, arms: [{ a: [-5, -5] }], legs: [{ to: [100, FLOOR], bend: -1 }] },
    ],
  },
  lunge: {
    face: 0,
    poses: [
      { ...standing, legs: [{ to: [100, FLOOR], bend: -1 }, { to: [96, FLOOR], bend: -1 }] },
      { hip: [88, 78], torso: -90, arms: [{ a: [90, 90] }], legs: [{ to: [106, FLOOR], bend: -1 }, { to: [50, 106], bend: -1 }] },
    ],
  },
  birddog: {
    face: 50,
    poses: [
      { hip: [92, 82], torso: -20, head: -15, arms: [{ a: [90, 90] }, { a: [90, 90] }], legs: [{ a: [90, 180] }, { a: [90, 180] }] },
      { hip: [92, 82], torso: -20, head: -15, arms: [{ a: [-12, -12] }, { a: [90, 90] }], legs: [{ a: [90, 180] }, { a: [182, 182] }] },
    ],
  },
  wallslide: {
    front: true,
    wall: true,
    poses: [
      { hip: [100, 58], torso: -90, arms: [{ a: [10, -90] }, { a: [170, 270] }], legs: [{ to: [110, FLOOR] }, { to: [90, FLOOR], bend: -1 }] },
      { hip: [100, 58], torso: -90, arms: [{ a: [-55, -75] }, { a: [235, 255] }], legs: [{ to: [110, FLOOR] }, { to: [90, FLOOR], bend: -1 }] },
    ],
  },
  chintuck: {
    face: 0,
    view: "50 -30 100 84",
    arrows: [{ from: [122, -20], to: [100, -20] }],
    poses: [
      { ...standing, head: -66 },
      { ...standing, head: -100 },
    ],
  },
  sideplank: {
    poses: [
      { hip: [95, 100], torso: -23.2, arms: [{ a: [90, 0] }], legs: [{ a: [170, 180] }] },
      { hip: [92, 88], torso: -4.5, arms: [{ a: [90, 0] }], legs: [{ a: [140, 180] }], glow: 0.7 },
    ],
  },
  brace: {
    face: -90,
    poses: [
      { ...onBackKneesBent, glow: 0.1 },
      { ...onBackKneesBent, glow: 0.95 },
    ],
  },
  squeeze: {
    front: true,
    glowAt: 0.85,
    arrows: [{ from: [66, 40], to: [80, 40] }, { from: [134, 40], to: [120, 40] }],
    poses: [
      { hip: [100, 58], torso: -90, arms: [{ a: [60, 100] }, { a: [120, 80] }], legs: [{ to: [110, FLOOR] }, { to: [90, FLOOR], bend: -1 }], glow: 0.1 },
      { hip: [100, 58], torso: -90, arms: [{ a: [80, 110] }, { a: [100, 70] }], legs: [{ to: [110, FLOOR] }, { to: [90, FLOOR], bend: -1 }], glow: 0.9 },
    ],
  },
  hipflexor: {
    face: 0,
    glowAt: 0,
    arrows: [{ from: [106, 56], to: [128, 56] }],
    poses: [
      { hip: [85, 82], torso: -90, arms: [{ a: [90, 90] }], legs: [{ to: [118, FLOOR], bend: -1 }, { a: [113, 180] }], glow: 0.1 },
      { hip: [95, 85], torso: -90, arms: [{ a: [90, 90] }], legs: [{ to: [118, FLOOR], bend: -1 }, { a: [127, 180] }], glow: 0.85 },
    ],
  },
};
