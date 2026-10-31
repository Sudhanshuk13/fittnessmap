import { Card, Fold, Note, Bullets } from "../components/ui";

export default function Food() {
  return (
    <>
      <Card>
        <p className="eyebrow">At ~65 kg — no aggressive diet</p>
        <h2 className="day-title">Eat enough protein, train, observe</h2>
        <div className="stat">
          <div>
            <b>78–104 g</b>
            <span>protein / day</span>
          </div>
          <div>
            <b>1.2–1.6 g</b>
            <span>per kg body weight</span>
          </div>
        </div>
        <p className="muted small">
          Start by including a good protein source at each main meal. Kidney disease or protein restrictions? Ask your
          clinician first.
        </p>
      </Card>

      <Fold title="🌅 Breakfast">
        <p className="muted">After waking: water as thirsty, move a few minutes. Pick one:</p>
        <Bullets
          items={[
            "Eggs with roti or whole-grain bread",
            "Poha with peas + curd",
            "Oats with milk and nuts",
            "Besan chilla with curd",
            "Idli with sambar",
          ]}
        />
      </Fold>

      <Fold title="🍛 Lunch — plate guide">
        <div className="plate">
          <div className="plate-half">
            Vegetables
            <small>½ plate</small>
          </div>
          <div className="plate-q">
            Protein
            <small>¼</small>
          </div>
          <div className="plate-q carb">
            Rice / roti
            <small>¼</small>
          </div>
        </div>
        <p className="muted">+ curd or fruit if hungry.</p>
        <p>
          <b>Protein:</b> dal, rajma, chana, paneer, soy, eggs, chicken, fish.
        </p>
        <p className="muted small">
          Rice and roti aren't automatically the cause of belly fat — total intake and activity matter more.
        </p>
      </Fold>

      <Fold title="🍎 Evening snack">
        <p className="muted">Pick 1–2 based on hunger:</p>
        <Bullets items={["Fruit", "Roasted chana", "Curd", "Milk", "Small serving of nuts", "Boiled eggs"]} />
        <p className="muted small">No fat-burning foods or supplements needed.</p>
      </Fold>

      <Fold title="🌙 Dinner">
        <Bullets
          items={[
            "Roti, dal, sabzi and curd",
            "Rice, rajma and vegetables",
            "Eggs, roti and vegetables",
            "Chicken or paneer with rice and vegetables",
          ]}
        />
        <p className="muted small">No need to cut dinner carbs for a flatter stomach.</p>
      </Fold>

      <Fold title="🫧 Managing bloating">
        <Bullets
          numbered
          items={[
            "Eat slowly, chew thoroughly.",
            "Avoid very large meals if uncomfortable.",
            "Cut down fizzy drinks.",
            "Notice if milk or specific foods trigger symptoms.",
            "Walk gently 10–15 min after eating.",
            "Track bowel movements if constipated.",
          ]}
        />
        <p className="muted small">
          Don't eliminate lots of foods without a clear reason. Frequent, persistent or worsening bloating → get a
          medical assessment.
        </p>
        <Note kind="danger">
          <b>Seek urgent care</b> for severe sudden abdominal pain, repeated vomiting, or a swollen abdomen with no stool
          or gas.
        </Note>
      </Fold>
    </>
  );
}
