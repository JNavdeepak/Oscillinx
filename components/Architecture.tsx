"use client";
import { useState } from "react";
const stages = [
  ["User input", "You write a prompt in the mobile chat."],
  [
    "Mobile app",
    "The React Native interface passes the message and conversation context to the runtime.",
  ],
  ["Prompt processing", "The app formats the message for the selected model."],
  ["llama.rn", "The React Native binding calls the native inference engine."],
  [
    "llama.cpp",
    "The native engine evaluates tokens using the loaded model weights.",
  ],
  [
    "Local model",
    "The compatible GGUF model supplies the weights from device storage.",
  ],
  ["Response", "Generated text returns to the conversation on your device."],
];
export default function Architecture() {
  const [step, setStep] = useState(0);
  return (
    <div className="pipeline">
      <div className="steps" aria-label="Mobile inference stages">
        {stages.map(([name], i) => (
          <button
            key={name}
            aria-pressed={step === i}
            onFocus={() => setStep(i)}
            onPointerEnter={() => setStep(i)}
            onClick={() => setStep(i)}
          >
            <span className="node" /> {name}
          </button>
        ))}
      </div>
      <div className="step-detail" aria-live="polite">
        <span className="tech">
          MOBILE INFERENCE · {String(step + 1).padStart(2, "0")} / 07
        </span>
        <h3>{stages[step][0]}</h3>
        <p>{stages[step][1]}</p>
      </div>
    </div>
  );
}
