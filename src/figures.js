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
export const HEAD_R = 9;

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

// Body-part widths, for a figure with some shape rather than a pure stick.
const W = { torso: 13, thigh: 10, shin: 8, upper: 8, fore: 7, bar: 9 };

// Returns drawable geometry for a figure at time t (0 = start pose, 1 = end pose).
//   segs:   [{ a, b, w, part, far }] in back-to-front draw order
//   points: named joints (hipN, kneeN, footN, handN, elbowN, …) used for labels
export function geometry(fig, t) {
  const [p0, p1] = fig.poses.map((p) => ({ glow: 0, ...p, arms: pair(p.arms), legs: pair(p.legs) }));
  const p = lerp(p0, p1 || p0, t);
  const neck = step(p.hip, p.torso, L.torso);
  const head = step(neck, p.head ?? p.torso, L.neck);
  const segs = [];
  const points = { hip: p.hip, neck, head, mid: step(p.hip, p.torso, L.torso / 2) };

  const addLeg = (from, spec, side, far) => {
    const [h, k, f] = limb(from, spec, L.thigh, L.shin);
    segs.push({ a: h, b: k, w: W.thigh, part: "leg" + side, far }, { a: k, b: f, w: W.shin, part: "leg" + side, far });
    points["knee" + side] = k;
    points["foot" + side] = f;
  };
  const addArm = (from, spec, side, far) => {
    const [s, e, h] = limb(from, spec, L.upper, L.fore);
    segs.push({ a: s, b: e, w: W.upper, part: "arm" + side, far }, { a: e, b: h, w: W.fore, part: "arm" + side, far, hand: true });
    points["elbow" + side] = e;
    points["hand" + side] = h;
  };

  if (fig.front) {
    // N = figure's right side (viewer's right), F = left side
    const sw = 13, hw = 7;
    const sh = [[neck[0] + sw, neck[1]], [neck[0] - sw, neck[1]]];
    const hp = [[p.hip[0] + hw, p.hip[1]], [p.hip[0] - hw, p.hip[1]]];
    addLeg(hp[0], p.legs[0], "N");
    addLeg(hp[1], p.legs[1], "F");
    segs.push({ a: hp[0], b: hp[1], w: W.bar, part: "torso" });
    segs.push({ a: p.hip, b: neck, w: W.torso, part: "torso" });
    segs.push({ a: sh[0], b: sh[1], w: W.bar, part: "torso" });
    addArm(sh[0], p.arms[0], "N");
    addArm(sh[1], p.arms[1], "F");
  } else {
    addLeg(p.hip, p.legs[1], "F", true);
    addArm(neck, p.arms[1], "F", true);
    addLeg(p.hip, p.legs[0], "N");
    segs.push({ a: p.hip, b: neck, w: W.torso, part: "torso" });
    addArm(neck, p.arms[0], "N");
  }
  segs.push({ a: neck, b: head, w: 6, part: "head" });

  const glowAt = fig.glowAt ?? 0.45;
  const glow = p.glow > 0 && {
    c: [p.hip[0] + (neck[0] - p.hip[0]) * glowAt, p.hip[1] + (neck[1] - p.hip[1]) * glowAt],
    angle: p.torso,
    opacity: p.glow,
  };
  const nose = fig.face != null && [step(head, fig.face, HEAD_R - 1), step(head, fig.face, HEAD_R + 3)];

  return { segs, points, head, nose, glow };
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
// Optional per figure: focus (parts drawn in the "moving" colour: armN, armF, legN, legF, head),
// labels ({ text, at: point name, dx, dy }), arrows, glow, view, period (ms per cycle).
const standing = { hip: [100, 58], torso: -90, arms: [{ a: [90, 90] }], legs: [{ to: [100, FLOOR], bend: -1 }] };
const standFront = { hip: [100, 58], torso: -90, legs: [{ to: [110, FLOOR] }, { to: [90, FLOOR], bend: -1 }] };
const onBackKneesBent = {
  hip: [92, 100], torso: 0, head: 0,
  arms: [{ a: [178, 178] }],
  legs: [{ to: [62, 106], bend: 1 }],
};
const seated = {
  hip: [95, 100], torso: -90, head: -90,
  arms: [{ to: [118, 93], bend: 1 }, { to: [114, 95], bend: 1 }],
  legs: [{ a: [-6, 172] }, { a: [4, 176] }],
};

export const FIGURES = {
  pushup: {
    face: 60,
    focus: ["armN"],
    poses: [
      { hip: [76, 86], torso: -28, arms: [{ to: [110, FLOOR], bend: 1 }], legs: [{ to: [30, FLOOR], bend: -1 }] },
      { hip: [81, 95], torso: -14, arms: [{ to: [110, FLOOR], bend: 1 }], legs: [{ to: [30, FLOOR], bend: -1 }] },
    ],
  },
  pike: {
    face: 110,
    focus: ["armN"],
    poses: [
      { hip: [80, 61], torso: 37.6, arms: [{ to: [141, FLOOR], bend: -1 }], legs: [{ to: [63, FLOOR], bend: 1 }] },
      { hip: [84, 62], torso: 45, arms: [{ to: [141, FLOOR], bend: -1 }], legs: [{ to: [63, FLOOR], bend: 1 }] },
    ],
  },
  deadbug: {
    face: -90,
    focus: ["armN", "legF"],
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
    focus: ["legF"],
    poses: [
      { ...standing, legs: [{ to: [100, FLOOR], bend: -1 }, { to: [96, FLOOR], bend: -1 }] },
      { hip: [88, 78], torso: -90, arms: [{ a: [90, 90] }], legs: [{ to: [106, FLOOR], bend: -1 }, { to: [50, 106], bend: -1 }] },
    ],
  },
  birddog: {
    face: 50,
    focus: ["armN", "legF"],
    poses: [
      { hip: [92, 82], torso: -20, head: -15, arms: [{ a: [90, 90] }, { a: [90, 90] }], legs: [{ a: [90, 180] }, { a: [90, 180] }] },
      { hip: [92, 82], torso: -20, head: -15, arms: [{ a: [-12, -12] }, { a: [90, 90] }], legs: [{ a: [90, 180] }, { a: [182, 182] }] },
    ],
  },
  wallslide: {
    front: true,
    wall: true,
    focus: ["armN", "armF"],
    poses: [
      { ...standFront, arms: [{ a: [10, -90] }, { a: [170, 270] }] },
      { ...standFront, arms: [{ a: [-55, -75] }, { a: [235, 255] }] },
    ],
  },
  chintuck: {
    face: 0,
    view: "30 -46 140 104",
    focus: ["head"],
    arrows: [{ from: [124, -22], to: [100, -22] }],
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
    focus: ["armN", "armF"],
    arrows: [{ from: [64, 34], to: [80, 34] }, { from: [136, 34], to: [120, 34] }],
    poses: [
      { ...standFront, arms: [{ a: [60, 100] }, { a: [120, 80] }], glow: 0.1 },
      { ...standFront, arms: [{ a: [80, 110] }, { a: [100, 70] }], glow: 0.9 },
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
  breathing: {
    face: 0,
    glowAt: 0.3,
    period: 8000,
    poses: [
      { ...seated, glow: 0.05 },
      { ...seated, torso: -91.5, glow: 0.85 },
    ],
  },
  meditation: {
    face: 0,
    glowAt: 0.3,
    period: 10000,
    poses: [
      { ...seated, glow: 0.05 },
      { ...seated, torso: -91, glow: 0.5 },
    ],
  },
  walk: {
    face: 0,
    period: 1800,
    poses: [
      { hip: [100, 60], torso: -88, head: -88, arms: [{ a: [112, 100] }, { a: [68, 52] }], legs: [{ a: [68, 95] }, { a: [115, 125] }] },
      { hip: [100, 60], torso: -88, head: -88, arms: [{ a: [68, 52] }, { a: [112, 100] }], legs: [{ a: [115, 125] }, { a: [68, 95] }] },
    ],
  },
  stretch: {
    front: true,
    focus: ["armN", "armF"],
    period: 5000,
    poses: [
      { ...standFront, arms: [{ a: [-80, -86] }, { a: [260, 266] }] },
      { ...standFront, torso: -78, arms: [{ a: [-58, -48] }, { a: [282, 292] }] },
    ],
  },
};

// Labels that ride along with the body. at = point name from geometry().points.
// align: "start" | "middle" | "end" (default middle).
const LABELS = {
  pushup: [
    { text: "Body in one straight line", at: "mid", dx: -6, dy: -20 },
    { text: "Hands under shoulders", at: "handN", dx: 8, dy: -6, align: "start" },
  ],
  pike: [
    { text: "Hips high", at: "hip", dx: 0, dy: -12 },
    { text: "Head toward floor", at: "head", dx: 20, dy: -18, align: "start" },
  ],
  deadbug: [
    { text: "Opposite arm + leg reach out", at: "mid", dx: -8, dy: -54 },
    { text: "Lower back stays on the floor", at: "mid", dx: 0, dy: 18 },
  ],
  plank: [
    { text: "Straight line, head to heels", at: "mid", dx: -18, dy: -22 },
    { text: "Elbows under shoulders", at: "elbowN", dx: 2, dy: 14 },
  ],
  bridge: [
    { text: "Squeeze glutes, lift hips", at: "hip", dx: 0, dy: -16 },
    { text: "Feet flat", at: "footN", dx: 0, dy: 14 },
  ],
  squat: [
    { text: "Hips back", at: "hip", dx: -14, dy: 2, align: "end" },
    { text: "Heels stay down", at: "footN", dx: 10, dy: 12, align: "start" },
  ],
  lunge: [
    { text: "Torso upright", at: "neck", dx: 14, dy: 2, align: "start" },
    { text: "Step back", at: "footF", dx: -4, dy: 14 },
  ],
  birddog: [
    { text: "Back flat", at: "mid", dx: 0, dy: -20 },
    { text: "Reach long", at: "handN", dx: 6, dy: -10, align: "start" },
  ],
  wallslide: [
    { text: "Arms touch the wall", at: "handN", dx: 8, dy: 2, align: "start" },
    { text: "Back against wall", at: "mid", dx: 18, dy: 22, align: "start" },
  ],
  chintuck: [
    { text: "Slide head back", at: "head", dx: -2, dy: -40 },
    { text: "Eyes level", at: "head", dx: 16, dy: 12, align: "start" },
  ],
  sideplank: [
    { text: "Lift your hips", at: "hip", dx: -6, dy: -18 },
    { text: "Knees on floor", at: "kneeN", dx: -4, dy: 14 },
    { text: "Elbow under shoulder", at: "elbowN", dx: 10, dy: 14 },
  ],
  brace: [
    { text: "Gently tighten belly", at: "mid", dx: -4, dy: -18 },
    { text: "Keep breathing", at: "head", dx: 0, dy: 18 },
  ],
  squeeze: [{ text: "Draw shoulder blades together", at: "neck", dx: 0, dy: -32 }],
  hipflexor: [
    { text: "Torso tall", at: "neck", dx: 12, dy: 0, align: "start" },
    { text: "Stretch here", at: "hip", dx: -12, dy: 0, align: "end" },
    { text: "Back knee on floor", at: "kneeF", dx: -4, dy: 13 },
  ],
  breathing: [
    { text: "Belly gently rises", at: "mid", dx: 32, dy: 0, align: "start" },
    { text: "Shoulders relaxed", at: "neck", dx: -12, dy: 2, align: "end" },
  ],
  meditation: [
    { text: "Attention on breath", at: "head", dx: 16, dy: 0, align: "start" },
    { text: "Sit comfortably", at: "hip", dx: 0, dy: 16 },
  ],
  walk: [
    { text: "Look ahead", at: "head", dx: 14, dy: 2, align: "start" },
    { text: "Relaxed shoulders", at: "neck", dx: -12, dy: 2, align: "end" },
    { text: "Arms swing", at: "mid", dx: 26, dy: 10, align: "start" },
  ],
  stretch: [
    { text: "Reach up tall", at: "neck", dx: 0, dy: -50 },
    { text: "Slow, no bouncing", at: "hip", dx: 20, dy: 8, align: "start" },
  ],
};
for (const k in LABELS) FIGURES[k].labels = LABELS[k];
