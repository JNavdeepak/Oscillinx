"use client";
import { useState } from "react";
export default function Command({ text }: { text: string }) {
  const [status, setStatus] = useState("Copy");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied");
    } catch {
      setStatus("Select text to copy");
    }
  }
  return (
    <div className="command">
      <code>{text}</code>
      <button onClick={copy} aria-live="polite">
        {status}
      </button>
    </div>
  );
}
