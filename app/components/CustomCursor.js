"use client";
import React, { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 20;

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const points = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })));
  const raf = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const onMouseDown = () => {
      if (dotRef.current) {
        dotRef.current.style.transition = "opacity 0.2s ease, transform 0.15s ease";
        dotRef.current.style.width = "18px";
        dotRef.current.style.height = "18px";
        dotRef.current.style.marginLeft = "-9px";
        dotRef.current.style.marginTop = "-9px";
      }
    };

    const onMouseUp = () => {
      if (dotRef.current) {
        dotRef.current.style.transition = "opacity 0.2s ease, width 0.25s ease, height 0.25s ease, margin 0.25s ease";
        dotRef.current.style.width = "10px";
        dotRef.current.style.height = "10px";
        dotRef.current.style.marginLeft = "-5px";
        dotRef.current.style.marginTop = "-5px";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const animate = () => {
      // Update trail points
      points.current[0].x += (mouse.current.x - points.current[0].x) * 0.6;
      points.current[0].y += (mouse.current.y - points.current[0].y) * 0.6;
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        points.current[i].x += (points.current[i - 1].x - points.current[i].x) * 0.55;
        points.current[i].y += (points.current[i - 1].y - points.current[i].y) * 0.55;
      }

      // Move dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      }

      // Draw trail line
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (visible) {
        const pts = points.current;
        const style = getComputedStyle(document.documentElement);
        const color = style.getPropertyValue("--text-muted").trim() || "#555";

        for (let i = 0; i < pts.length - 1; i++) {
          const progress = i / (pts.length - 1);
          const opacity = 0.45 * (1 - progress);
          const width = Math.max(0.5, 4 * (1 - progress));

          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [visible]);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 99998,
        }}
      />

      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "10px",
          height: "10px",
          marginLeft: "-5px",
          marginTop: "-5px",
          borderRadius: "50%",
          backgroundColor: "var(--text-primary)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          willChange: "transform",
          transition: "opacity 0.2s ease",
        }}
      />
    </>
  );
}
