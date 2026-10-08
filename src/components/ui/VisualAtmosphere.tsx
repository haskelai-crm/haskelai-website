"use client";

import { useEffect, useState } from "react";

export default function VisualAtmosphere() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.body.dataset.motion = paused ? "paused" : "playing";
    return () => { delete document.body.dataset.motion; };
  }, [paused]);

  return (
    <>
      <div className="ambient-scene" aria-hidden="true">
        <div className="ambient-orb ambient-orb-mint" />
        <div className="ambient-orb ambient-orb-violet" />
        <div className="ambient-orb ambient-orb-blue" />
        <div className="ambient-grid" />
      </div>
      <button
        type="button"
        className="motion-toggle"
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        {paused ? "Resume motion" : "Pause motion"}
      </button>
    </>
  );
}
