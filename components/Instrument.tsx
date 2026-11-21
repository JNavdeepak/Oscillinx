"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Frame";
const transcript = [
  "Initializing the local environment…",
  "Opening model weights from disk…",
  "Allocating context memory…",
  "Inference engine ready.",
  "› Where is my prompt processed?",
  "On this device. The local runtime reads the model from storage and generates the reply here.",
];
export default function Instrument() {
  const [consoleView, show] = useState(false),
    [line, setLine] = useState(0);
  useEffect(() => {
    if (!consoleView || line >= transcript.length) return;
    const id = setTimeout(
      () => setLine((v) => v + 1),
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 410,
    );
    return () => clearTimeout(id);
  }, [consoleView, line]);
  function simulate() {
    setLine(0);
    show(true);
  }
  return (
    <div
      className={"instrument" + (consoleView ? " running" : "")}
      id="simulation"
    >
      <div className="instrument-top">
        <span className="tech">
          <i className="indicator" />{" "}
          {consoleView ? "CONSOLE PREVIEW" : "SIGNAL VIEW"}
        </span>
        <span className="scope-mark" aria-hidden="true">
          ⌖
        </span>
      </div>
      {consoleView ? (
        <div className="terminal" aria-label="Simulated inference transcript">
          <span className="tech">OSCILLINX / EXAMPLE SESSION</span>
          {transcript.slice(0, line).map((t) => (
            <p key={t}>{t}</p>
          ))}
          <span className="cursor" aria-hidden="true" />
        </div>
      ) : (
        <div
          className="field"
          role="img"
          aria-label="Dimensional olive signal field formed by fine concentric samples"
        >
          <span className="cross one" />
          <span className="cross two" />
          <div className="sculpture" />
        </div>
      )}
      <div className="instrument-bottom">
        <span className="wave" aria-hidden="true">
          {[5, 9, 14, 8, 21, 16, 10, 18, 25, 12, 7, 14, 9, 5].map((v, i) => (
            <i style={{ height: v }} key={i} />
          ))}
        </span>
        <button onClick={consoleView ? () => show(false) : simulate}>
          <Icon kind={consoleView ? "terminal" : "play"} />
          {consoleView ? "Signal view" : "Run simulation"}
        </button>
      </div>
    </div>
  );
}
