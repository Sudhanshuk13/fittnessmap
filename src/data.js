// All plan content lives here. Edit this file to change exercises or text.
// Each HOW_TO key has a matching illustration in figures.js.

export const HOW_TO = {
  pushup: {
    name: "Regular push-up",
    works: ["Chest", "Shoulders", "Triceps", "Core"],
    steps: [
      "Hands on the floor slightly wider than your shoulders.",
      "Straighten your legs so head, hips and ankles form one line.",
      "Gently tighten your stomach and squeeze your glutes.",
      "Breathe in and lower your chest slowly toward the floor.",
      "Breathe out and push the floor away to come back up.",
    ],
    avoid: ["Hips sagging down or sticking up", "Elbows flaring straight out sideways", "Rushing — quality beats quantity"],
  },
  pike: {
    name: "Pike push-up",
    works: ["Shoulders", "Triceps", "Upper back"],
    steps: [
      "Start in a push-up position, then walk your feet in.",
      "Lift your hips high so your body makes an upside-down V.",
      "Bend your elbows and lower the top of your head toward the floor.",
      "Push back up until your arms are straight.",
    ],
    avoid: ["Letting hips drop during the rep", "Forcing it if your shoulders hurt — do another set of regular push-ups instead"],
  },
  deadbug: {
    name: "Dead bug",
    works: ["Deep core", "Abdominal control"],
    steps: [
      "Lie on your back. Arms point straight up at the ceiling.",
      "Lift your legs so knees are bent at 90°, shins parallel to the floor.",
      "Slowly reach one arm overhead and straighten the opposite leg.",
      "Stop just above the floor, then return to the start.",
      "Switch sides. Move slowly and keep breathing.",
    ],
    avoid: ["Lower back arching off the floor", "Moving fast or swinging"],
  },
  plank: {
    name: "Forearm plank",
    works: ["Core", "Shoulders", "Glutes"],
    steps: [
      "Forearms on the floor, elbows directly below your shoulders.",
      "Step your feet back so your body is one straight line.",
      "Gently brace your stomach — like preparing for a light push.",
      "Breathe normally and hold for the set time.",
    ],
    avoid: ["Lower back sagging", "Holding your breath", "Sucking your stomach in hard — gentle brace only"],
  },
  bridge: {
    name: "Glute bridge",
    works: ["Glutes", "Hamstrings", "Lower back"],
    steps: [
      "Lie on your back, knees bent, feet flat and hip-width apart.",
      "Arms rest on the floor beside you.",
      "Squeeze your glutes and lift your hips up.",
      "Pause for a second at the top, then lower slowly.",
    ],
    avoid: ["Over-arching your lower back at the top", "Pushing through your toes — push through your heels"],
  },
  squat: {
    name: "Bodyweight squat",
    works: ["Thighs", "Glutes", "Core"],
    steps: [
      "Stand with feet about shoulder-width apart, toes slightly out.",
      "Breathe in, push your hips back and bend your knees like sitting on a chair.",
      "Raise your arms forward for balance. Keep your chest up.",
      "Go as low as is comfortable.",
      "Breathe out and push through your whole foot to stand up.",
    ],
    avoid: ["Heels lifting off the floor", "Knees collapsing inward"],
  },
  lunge: {
    name: "Reverse lunge",
    works: ["Thighs", "Glutes", "Balance"],
    steps: [
      "Stand tall with feet hip-width apart.",
      "Take a big step backward with one leg.",
      "Lower your back knee toward the floor — both knees bend to about 90°.",
      "Push through the front foot to return to standing.",
      "Repeat on the other leg.",
    ],
    avoid: ["Leaning your upper body forward", "Front knee caving inward"],
  },
  birddog: {
    name: "Bird dog",
    works: ["Core", "Lower back", "Glutes", "Balance"],
    steps: [
      "Get on your hands and knees. Hands under shoulders, knees under hips.",
      "Reach one arm forward and the opposite leg back at the same time.",
      "Keep your back flat — imagine balancing a cup on it.",
      "Hold for a moment, return, and switch sides.",
    ],
    avoid: ["Twisting your hips", "Lifting the leg too high and arching your back"],
  },
  wallslide: {
    name: "Wall slide",
    works: ["Upper back", "Shoulders", "Posture"],
    steps: [
      "Stand with your back against a wall, feet a little in front.",
      "Raise your arms into a 'W' shape with elbows and wrists touching the wall.",
      "Slowly slide your arms up the wall as far as is comfortable.",
      "Slide back down to the W position.",
    ],
    avoid: ["Arching your lower back off the wall", "Forcing past a comfortable range"],
  },
  chintuck: {
    name: "Chin tuck",
    works: ["Neck", "Posture"],
    steps: [
      "Sit or stand tall, looking straight ahead.",
      "Gently slide your head straight backward — like making a small double chin.",
      "Hold for 2–3 seconds, then relax.",
    ],
    avoid: ["Tilting your head down", "Forcing or straining your neck"],
  },
  sideplank: {
    name: "Side plank (from knees)",
    works: ["Side core (obliques)", "Shoulders", "Hips"],
    steps: [
      "Lie on your side with knees bent behind you.",
      "Put your elbow directly below your shoulder.",
      "Lift your hips so your body forms a line from knees to head.",
      "Hold, breathing normally, then switch sides.",
    ],
    avoid: ["Hips dropping back to the floor", "Continuing if you feel pain or see a bulge along your midline — stop and get it checked"],
  },
  brace: {
    name: "Gentle abdominal bracing",
    works: ["Deep core", "Abdominal control"],
    steps: [
      "Lie on your back with your knees bent.",
      "Breathe normally.",
      "Gently tighten your stomach as if preparing for a light push.",
      "Hold for 5–10 seconds while still breathing.",
      "Relax and repeat.",
    ],
    avoid: ["Holding your breath", "Sucking your stomach in as hard as possible"],
  },
  squeeze: {
    name: "Shoulder-blade squeeze",
    works: ["Upper back", "Posture"],
    steps: [
      "Sit or stand tall, arms relaxed.",
      "Gently draw your shoulder blades back and together.",
      "Hold for 2–3 seconds, then release.",
    ],
    avoid: ["Shrugging your shoulders up toward your ears", "Arching your lower back"],
  },
  hipflexor: {
    name: "Hip-flexor stretch",
    works: ["Front of hip", "Posture"],
    steps: [
      "Kneel on one knee, other foot flat in front of you.",
      "Keep your upper body tall.",
      "Gently shift your hips forward until you feel a stretch at the front of the back hip.",
      "Hold 20–30 seconds, then switch sides.",
    ],
    avoid: ["Arching your lower back", "Bouncing into the stretch"],
  },
};

export const WEEK = [
  // index 0 = Sunday (matches Date.getDay())
  {
    short: "Sun", title: "Rest", focus: "Rest, sleep well, prep for the week",
    type: "rest",
    items: [
      { name: "Rest & recover", amount: "All day", icon: "🛋️" },
      { name: "Sleep 7–9 hours", amount: "Tonight", icon: "😴" },
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
      { name: "Brisk walk", amount: "15–20 min", icon: "🚶" },
      { name: "Hip-flexor stretch", amount: "20–30 sec / side", how: "hipflexor" },
      { name: "Shoulder-blade squeezes", amount: "10 reps", how: "squeeze" },
      { name: "Relaxed breathing", amount: "3–5 min", icon: "🌬️" },
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
      { name: "Walk", amount: "20–30 min (can split)", icon: "🚶" },
      { name: "Comfortable stretching", amount: "3–5 min", how: "hipflexor" },
      { name: "Breathing routine", amount: "3 min", icon: "🌬️" },
    ],
  },
];

export const CORE_ROUTINE = [
  { name: "Gentle abdominal bracing", amount: "1 min", how: "brace" },
  { name: "Dead bugs", amount: "2 min · 5–6 per side", how: "deadbug" },
  { name: "Bird dogs", amount: "2 min · 6–8 per side", how: "birddog" },
  { name: "Plank practice", amount: "2 × 10–20 sec", how: "plank" },
];

export const POSTURE = [
  { name: "Chin tucks", amount: "8–10 reps", how: "chintuck" },
  { name: "Shoulder-blade squeezes", amount: "10 reps", how: "squeeze" },
  { name: "Wall slides", amount: "8–10 reps", how: "wallslide" },
  { name: "Hip-flexor stretch", amount: "20–30 sec / side", how: "hipflexor" },
  { name: "Glute bridges", amount: "10–12 reps", how: "bridge" },
];

export const DAILY_HABITS = [
  { id: "move", label: "Workout or planned walk", target: "15–30 min", icon: "🏃" },
  { id: "protein", label: "Protein at main meals", target: "Each meal", icon: "🥚" },
  { id: "veg", label: "Fruit & vegetables", target: "Variety", icon: "🥦" },
  { id: "breath", label: "Morning breathing", target: "3 min", icon: "🌬️" },
  { id: "meditate", label: "Evening meditation", target: "5 min", icon: "🧘" },
  { id: "posture", label: "Posture breaks", target: "Every 30–60 min", icon: "🪑" },
  { id: "water", label: "Drink water regularly", target: "Through the day", icon: "💧" },
  { id: "sleep", label: "Sleep", target: "7–9 hours", icon: "😴" },
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
