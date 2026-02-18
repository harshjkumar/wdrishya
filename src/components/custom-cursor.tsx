"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    function animate() {
      // dot follows cursor exactly
      dot!.style.left = mx + "px";
      dot!.style.top  = my + "px";

      // ring lags behind
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring!.style.left = rx + "px";
      ring!.style.top  = ry + "px";

      requestAnimationFrame(animate);
    }

    function onEnterLink() { ring!.classList.add("expanded"); }
    function onLeaveLink() { ring!.classList.remove("expanded"); }

    window.addEventListener("mousemove", onMove);
    const links = document.querySelectorAll("a, button, [data-cursor-expand]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
