"use client";
import { useEffect, useState } from "react";
const sections = [
  ["Features", "features"],
  ["Architecture", "architecture"],
  ["Desktop", "desktop"],
  ["Mobile", "mobile"],
  ["Resources", "resources"],
];
export function Brand() {
  return (
    <a className="brand" href="/" aria-label="OSCILLINX home">
      <img
        src="/logo.png"
        alt="OSCILLINX Logo"
        width={44}
        height={22}
        className="brand-logo"
      />
      <span>OSCILLINX</span>
    </a>
  );
}
export function Icon({
  kind,
}: {
  kind: "sun" | "moon" | "down" | "play" | "terminal" | "menu" | "close";
}) {
  const path = {
    sun: "M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M16 12a4 4 0 1 1-8 0 4 4 0 1 1 8 0",
    moon: "M20 15A9 9 0 0 1 9 4a8.5 8.5 0 1 0 11 11Z",
    down: "M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4",
    play: "m8 5 11 7-11 7z",
    terminal: "m4 6 6 6-6 6m9 0h7",
    menu: "M3 7h18M3 16h18",
    close: "m5 5 14 14M19 5 5 19",
  }[kind];
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}
export function Header() {
  const [light, setLight] = useState(false),
    [open, setOpen] = useState(false),
    [active, setActive] = useState("");
  useEffect(() => {
    setLight(document.documentElement.dataset.theme === "light");
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-8% 0px -65% 0px" },
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", key);
    return () => {
      obs.disconnect();
      document.removeEventListener("keydown", key);
    };
  }, []);
  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    try {
      localStorage.setItem("osc-theme", next ? "light" : "dark");
    } catch {}
  }
  return (
    <header>
      <div className="wrap bar">
        <Brand />
        <nav
          id="main-navigation"
          aria-label="Main"
          className={open ? "nav open" : "nav"}
        >
          {sections.map(([label, id]) => (
            <a
              aria-current={active === id ? "location" : undefined}
              key={id}
              href={"/#" + id}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="square"
            aria-label={"Switch to " + (light ? "dark" : "light") + " theme"}
            onClick={toggle}
          >
            <Icon kind={light ? "moon" : "sun"} />
          </button>
          <a className="btn nav-download" href="/#downloads">
            <Icon kind="down" />
            Download
          </a>
          <button
            className="square menu"
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <Icon kind={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="wrap">
      <div className="foot-nav">
        <Brand />
        <nav aria-label="Footer">
          <a href="/docs/">Documentation</a>
          <a href="/models/">Models</a>
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
        </nav>
      </div>
      <div className="foot-large" aria-hidden="true">
        OSCILLINX
      </div>
      <div className="foot-base">
        <span>Offline-first intelligence.</span>
        <a href="#content">Back to top ↑</a>
      </div>
    </footer>
  );
}
