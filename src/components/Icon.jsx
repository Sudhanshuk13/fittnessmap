const PATHS = {
  today: "M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 13h3v3H8z",
  moves: "M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12",
  food: "M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 7 0 2 1 3 3 3",
  posture: "M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 10l7 1 7-1M12 11v4M9 21l3-6 3 6",
  track: "M4 4v16h16M8 15l3-4 3 2 5-6",
};

export default function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}
