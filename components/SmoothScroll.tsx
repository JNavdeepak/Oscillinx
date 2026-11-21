"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    // Smoothly scroll to in-page anchors with offset for the 76px sticky header
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      let targetId: string | null = null;
      if (href.startsWith("#") && href.length > 1) {
        targetId = href;
      } else if (href.startsWith("/#") && href.length > 2) {
        if (
          window.location.pathname === "/" ||
          window.location.pathname === ""
        ) {
          targetId = href.substring(1);
        }
      }

      if (targetId) {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -76 });
          history.pushState(null, "", targetId);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
