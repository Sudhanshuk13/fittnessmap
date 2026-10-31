import { useState } from "react";
import { useStore, programWeek, now } from "./store";
import { HowToProvider } from "./components/HowTo";
import Icon from "./components/Icon";
import Today from "./views/Today";
import Exercises from "./views/Exercises";
import Food from "./views/Food";
import Posture from "./views/Posture";
import Track from "./views/Track";

const TABS = [
  { id: "today", label: "Today", icon: "today", View: Today },
  { id: "moves", label: "Exercises", icon: "moves", View: Exercises },
  { id: "food", label: "Food", icon: "food", View: Food },
  { id: "posture", label: "Posture", icon: "posture", View: Posture },
  { id: "track", label: "Progress", icon: "track", View: Track },
];

const dateLabel = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });

export default function App() {
  const store = useStore();
  const [tab, setTab] = useState("today");
  const week = programWeek(store.start);
  const current = TABS.find((t) => t.id === tab);

  const goto = (id) => {
    setTab(id);
    window.scrollTo({ top: 0 });
  };

  const navButtons = TABS.map((t) => (
    <button
      key={t.id}
      className={t.id === tab ? "active" : ""}
      aria-current={t.id === tab ? "page" : undefined}
      onClick={() => goto(t.id)}
    >
      <Icon name={t.icon} />
      <span>{t.label}</span>
    </button>
  ));

  return (
    <HowToProvider>
      <div className="shell">
        <aside className="side">
          <div className="brand">
            <img src="/icon.svg" alt="" width="32" height="32" />
            <span>Daily Fitness Map</span>
          </div>
          <nav className="side-nav">{navButtons}</nav>
          <button className="side-week" onClick={() => goto("track")}>
            {week ? (
              <>
                <b>Week {week}</b> of 12
              </>
            ) : (
              "Set your start date →"
            )}
          </button>
        </aside>

        <div className="content">
          <header className="topbar">
            <div>
              <p className="topbar-date">{dateLabel}</p>
              <h1>{current.id === "today" ? "Your plan" : current.label}</h1>
            </div>
            <button className="pill" onClick={() => goto("track")}>
              {week ? `Week ${week}/12` : "Set start"}
            </button>
          </header>

          <main>
            <current.View store={store} goto={goto} />
          </main>
        </div>
      </div>

      <nav className="tabbar">{navButtons}</nav>
    </HowToProvider>
  );
}
