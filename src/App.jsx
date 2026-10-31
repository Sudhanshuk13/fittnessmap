import { useState } from "react";
import { useStore, programWeek, now } from "./store";
import Today from "./views/Today";
import Core from "./views/Core";
import Food from "./views/Food";
import Posture from "./views/Posture";
import Track from "./views/Track";

const TABS = [
  { id: "today", label: "Today", icon: "🏋️", View: Today },
  { id: "core", label: "Core", icon: "🎯", View: Core },
  { id: "food", label: "Food", icon: "🍽️", View: Food },
  { id: "posture", label: "Posture", icon: "🧘", View: Posture },
  { id: "track", label: "Track", icon: "📈", View: Track },
];

export default function App() {
  const store = useStore();
  const [tab, setTab] = useState("today");
  const week = programWeek(store.start);
  const { View } = TABS.find((t) => t.id === tab);

  const goto = (id) => {
    setTab(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <header className="topbar">
        <div>
          <h1>Daily Fitness Map</h1>
          <p className="muted">{now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" })}</p>
        </div>
        <button className="pill" onClick={() => goto("track")}>
          {week ? `Week ${week}` : "Set start"}
        </button>
      </header>

      <main>
        <View store={store} goto={goto} />
      </main>

      <nav className="tabbar">
        {TABS.map((t) => (
          <button key={t.id} className={t.id === tab ? "active" : ""} onClick={() => goto(t.id)}>
            <span className="ico">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </>
  );
}
