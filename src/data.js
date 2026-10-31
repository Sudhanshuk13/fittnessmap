// All plan content lives here. Edit this file to change exercises or text.

export const HOW_TO = {
  pushup: [
    "Hands slightly wider than shoulder-width.",
    "Keep head, hips and ankles roughly in line.",
    "Gently tighten your stomach and glutes.",
    "Lower your chest under control — breathe in.",
    "Push up — breathe out.",
    "Focus on technique, not exhaustion.",
  ],
  pike: [
    "Start on hands and feet, lift hips into an inverted V.",
    "Bend elbows to lower your head toward the floor.",
    "Push back up.",
    "Too hard or uncomfortable? Do an extra set of regular push-ups instead.",
  ],
  deadbug: [
    "Lie on your back, arms raised, knees bent.",
    "Slowly extend one arm and the opposite leg.",
    "Return and switch sides.",
    "Stay controlled — don't force your back into pain.",
  ],
  plank: [
    "Keep your body aligned.",
    "Gently brace your stomach and breathe normally.",
    "Stop when form breaks or your lower back sags.",
    "Your stomach doesn't need to look flat — don't suck it in.",
  ],
  bridge: [
    "Lie on your back, knees bent, feet flat.",
    "Lift your hips while gently squeezing your glutes.",
    "Lower slowly.",
  ],
  squat: [
    "Feet about shoulder-width apart.",
    "Sit back and down — breathe in.",
    "Stand up — breathe out.",
  ],
  lunge: [
    "Step one foot back and lower your back knee toward the floor.",
    "Keep your torso upright.",
    "Push through the front foot to return.",
  ],
  birddog: [
    "Get on hands and knees.",
    "Extend your right arm and left leg.",
    "Keep your trunk steady, return, switch sides.",
  ],
  wallslide: [
    "Stand with your back and arms against a wall.",
    "Slide your arms up within a comfortable range.",
    "Slide back down slowly.",
  ],
  chintuck: [
    "Gently move your head backwards, like making a small double chin.",
    "Don't tilt your head down or force your neck.",
  ],
  sideplank: [
    "From your knees, elbow directly below your shoulder.",
    "Lift your hips gently.",
    "Pain or a visible bulge along your midline? Stop and get assessed.",
  ],
  brace: [
    "Gently tighten your stomach as if preparing for a light push.",
    "Keep breathing normally.",
    "Don't suck your stomach in as hard as possible.",
  ],
};

export const WEEK = [
  // index 0 = Sunday (matches Date.getDay())
  {
    short: "Sun", title: "Rest", focus: "Rest, sleep well, prep for the week",
    type: "rest",
    items: [
      { name: "Rest & recover", amount: "All day" },
      { name: "Sleep 7–9 hours", amount: "Tonight" },
    ],
  },
  {
    short: "Mon", title: "Chest, shoulders & core", focus: "Strength day · 20–30 min",
    type: "strength",
    items: [
      { name: "Regular push-ups", sets: 3, amount: "6–10 reps", how: "pushup" },
      { name: "Pike push-ups", sets: 2, amount: "5–8 reps", how: "pike" },
      { name: "Dead bugs", sets: 2, amount: "6 per side", how: "deadbug" },
      { name: "Forearm plank", sets: 2, amount: "15–25 sec", how: "plank" },
      { name: "Glute bridges", sets: 2, amount: "12 reps", how: "bridge" },
    ],
  },
  {
    short: "Tue", title: "Legs, back & posture", focus: "Strength day · 20–30 min",
    type: "strength",
    note: "Building legs, glutes and upper-back control gives a more balanced physique.",
    items: [
      { name: "Bodyweight squats", sets: 3, amount: "12 reps", how: "squat" },
      { name: "Reverse lunges", sets: 2, amount: "6 per leg", how: "lunge" },
      { name: "Bird dogs", sets: 2, amount: "8 per side", how: "birddog" },
      { name: "Wall slides", sets: 2, amount: "10 reps", how: "wallslide" },
      { name: "Chin tucks", sets: 2, amount: "8–10 reps", how: "chintuck" },
    ],
  },
  {
    short: "Wed", title: "Recovery & mobility", focus: "Easy day — recover",
    type: "recovery",
    items: [
      { name: "Brisk walk", amount: "15–20 min" },
      { name: "Hip-flexor stretch", amount: "20–30 sec / side" },
      { name: "Shoulder-blade squeezes", amount: "10 reps" },
      { name: "Relaxed breathing", amount: "3–5 min" },
    ],
  },
  {
    short: "Thu", title: "Chest, shoulders & core", focus: "Strength day · 20–30 min",
    type: "strength",
    items: [
      { name: "Regular push-ups", sets: 3, amount: "6–10 reps", how: "pushup" },
      { name: "Pike push-ups (or easier)", sets: 2, amount: "5–8 reps", how: "pike" },
      { name: "Dead bugs", sets: 2, amount: "6 per side", how: "deadbug" },
      { name: "Glute bridges", sets: 2, amount: "12–15 reps", how: "bridge" },
      { name: "Side plank from knees", sets: 2, amount: "10–20 sec / side", how: "sideplank" },
    ],
  },
  {
    short: "Fri", title: "Legs, glutes, back & core", focus: "Strength day · 20–30 min",
    type: "strength",
    items: [
      { name: "Bodyweight squats", sets: 3, amount: "12–15 reps", how: "squat" },
      { name: "Reverse lunges", sets: 2, amount: "6 per leg", how: "lunge" },
      { name: "Bird dogs", sets: 2, amount: "8 per side", how: "birddog" },
      { name: "Wall slides", sets: 2, amount: "10 reps", how: "wallslide" },
      { name: "Gentle abdominal bracing", sets: 5, amount: "5–10 sec", how: "brace" },
    ],
  },
  {
    short: "Sat", title: "Walking & flexibility", focus: "Active day",
    type: "recovery",
    note: "Only 15 minutes? Brisk walk + short mobility session.",
    items: [
      { name: "Walk", amount: "20–30 min (can split)" },
      { name: "Comfortable stretching", amount: "3–5 min" },
      { name: "Breathing routine", amount: "3 min" },
    ],
  },
];

export const CORE_ROUTINE = [
  { name: "Gentle abdominal bracing", amount: "1 min", how: "brace",
    steps: ["Lie on your back, knees bent.", "Breathe normally.", "Gently tighten stomach muscles.", "Hold 5–10 sec without holding your breath.", "Relax and repeat."] },
  { name: "Dead bugs", amount: "2 min · 5–6 per side", how: "deadbug" },
  { name: "Bird dogs", amount: "2 min · 6–8 per side", how: "birddog" },
  { name: "Plank practice", amount: "2 × 10–20 sec", how: "plank" },
];

export const DAILY_HABITS = [
  { id: "move", label: "Workout or planned walk", target: "15–30 min" },
  { id: "protein", label: "Protein at main meals", target: "Each meal" },
  { id: "veg", label: "Fruit & vegetables", target: "Variety" },
  { id: "breath", label: "Morning breathing", target: "3 min" },
  { id: "meditate", label: "Evening meditation", target: "5 min" },
  { id: "posture", label: "Posture breaks", target: "Every 30–60 min" },
  { id: "water", label: "Drink water regularly", target: "Through the day" },
  { id: "sleep", label: "Sleep", target: "7–9 hours" },
];

export const PHASES = [
  { weeks: [1, 2], title: "Build the habit",
    points: ["Follow the weekly schedule.", "Keep reps manageable.", "Learn to brace while breathing.", "Walk regularly.", "Balanced meals & consistent sleep."] },
  { weeks: [3, 4], title: "Gradually add workload",
    points: ["Add 1–2 reps to an exercise.", "Add ~5 sec to plank holds.", "Add a set only if you recover well.", "Don't increase everything at once."] },
  { weeks: [5, 8], title: "Develop strength",
    points: ["Push-ups: 3×6 → 3×10–12.", "Slower, controlled lowering.", "Progress squats and lunges.", "Add a band or weights for back training when available."] },
  { weeks: [9, 12], title: "Review your results",
    points: ["Push-up strength", "Plank stability", "Walking stamina", "Posture & comfort at work", "Waist measurement & physique", "Not progressing? Adjust training and food — don't just eat less."] },
];

export const POSTURE = [
  { name: "Chin tucks", amount: "8–10 reps", how: "chintuck" },
  { name: "Shoulder-blade squeezes", amount: "10 reps", steps: ["Draw your shoulder blades gently together.", "Hold briefly, release."] },
  { name: "Wall slides", amount: "8–10 reps", how: "wallslide" },
  { name: "Hip-flexor stretch", amount: "20–30 sec / side", steps: ["Stretch the front of the hip.", "Don't arch your back."] },
  { name: "Glute bridges", amount: "10–12 reps", how: "bridge" },
];
