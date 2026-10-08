"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./HeroSurface.module.css";

// A folded hyperbolic paraboloid: an original mathematical sculpture, not data.
function pointOnSurface(u, v) {
  return [
    u * 2.15,
    1.3 * (v*v - u*u) + 0.14 * Math.sin(u * 18 + v * 2.6),
    v * 1.9,
  ];
}

function rotatePoint([x, y, z], angle) {
  return [
    x * Math.cos(angle) + z * Math.sin(angle),
    y,
    z * Math.cos(angle) - x * Math.sin(angle),
  ];
}

function projectPoint(point, angle) {
  const [x, y, z] = rotatePoint(point, angle);
  return [
    400 + 117.2 * (x * 0.7682 - z * 0.6402),
    340 - 117.2 * (-x * 0.3089 + y * 0.876 + z * -0.3707),
  ];
}

function makeFallback(angle) {
  const faces = [];
  const resolution = 34;
  for (let i = 0; i < resolution; i += 1) {
    for (let j = 0; j < resolution; j += 1) {
      const u = (i / resolution) * 2 - 1;
      const v = (j / resolution) * 2 - 1;
      const step = 2 / resolution;
      const corners = [
        [u, v],
        [u + step, v],
        [u + step, v + step],
        [u, v + step],
      ].map(([a, b]) => pointOnSurface(a, b));
      const center = rotatePoint(
        pointOnSurface(u + step / 2, v + step / 2),
        angle,
      );
      const wave = Math.cos((u + step / 2) * 18 + (v + step / 2) * 2.6);
      const normal = rotatePoint(
        [
          -(2.6 * (u + step / 2) + 2.52 * wave) / 2.15,
          1,
          -(-2.6 * (v + step / 2) + 0.364 * wave) / 1.9,
        ],
        angle,
      );
      const length = Math.hypot(...normal);
      const light = Math.max(
        0,
        (normal[0] * -0.38 + normal[1] * 0.85 + normal[2] * 0.36) / length,
      );
      const highlight = Math.pow(light, 12) * 70;
      const color = `rgb(${Math.round(12 + light * 34 + highlight)}, ${Math.round(52 + light * 80 + highlight)}, ${Math.round(123 + light * 110 + highlight * 0.25)})`;
      faces.push({
        points: corners
          .map((point) =>
            projectPoint(point, angle)
              .map((coordinate) => coordinate.toFixed(1))
              .join(","),
          )
          .join(" "),
        color,
        depth: center[0] * 0.5605 + center[1] * 0.482 + center[2] * 0.6726,
        key: `${i}-${j}`,
      });
    }
  }
  return faces.sort((a, b) => a.depth - b.depth);
}

export default function HeroSurface({ active = true }) {
  const host = useRef(null);
  const controls = useRef(null);
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const fallback = useMemo(() => makeFallback(angle), [angle]);

  useEffect(() => {
    angleRef.current = angle;
    controls.current?.rotate(angle);
  }, [angle]);

  useEffect(() => {
    const container = host.current;
    container.dataset.interactive = "true";
    return () => {
      delete container.dataset.interactive;
    };
  }, []);

  useEffect(() => {
    if (!active || !host.current) return undefined;

    const container = host.current;
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let disposeScene = () => {};
    let generation = 0;

    async function start() {
      const currentGeneration = ++generation;
      disposeScene();
      delete container.dataset.ready;
      if (motionPreference.matches) return;

      let renderer;
      let scene;
      let frame = 0;
      let observer;
      let resizeObserver;
      let removeListeners = () => {};
      let disposed = false;
      const resources = [];
      const cleanUp = () => {
        if (disposed) return;
        disposed = true;
        cancelAnimationFrame(frame);
        observer?.disconnect();
        resizeObserver?.disconnect();
        removeListeners();
        resources.forEach((resource) => resource.dispose());
        scene?.clear();
        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
        }
        controls.current = null;
        delete container.dataset.ready;
      };
      disposeScene = cleanUp;

      try {
        const THREE = await import("three");
        if (currentGeneration !== generation) return;

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.domElement.setAttribute("aria-hidden", "true");
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
          -3.4,
          3.4,
          2.9,
          -2.9,
          0.1,
          40,
        );
        camera.position.set(5, 4.3, 6);
        camera.lookAt(0, 0, 0);
        const sculpture = new THREE.Group();
        sculpture.rotation.y = angleRef.current;
        sculpture.rotation.x = 0.08;
        scene.add(sculpture);

        const columns = 128;
        const rows = 96;
        const positions = [];
        const indices = [];
        for (let i = 0; i <= columns; i += 1) {
          for (let j = 0; j <= rows; j += 1) {
            positions.push(
              ...pointOnSurface((i / columns) * 2 - 1, (j / rows) * 2 - 1),
            );
            if (i < columns && j < rows) {
              const a = i * (rows + 1) + j;
              indices.push(
                a,
                a + 1,
                a + rows + 1,
                a + 1,
                a + rows + 2,
                a + rows + 1,
              );
            }
          }
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3),
        );
        geometry.setIndex(indices);
        geometry.computeVertexNormals();
        const material = new THREE.MeshPhysicalMaterial({
          color: 0x2675e6,
          metalness: 0.43,
          roughness: 0.31,
          clearcoat: 0.7,
          clearcoatRoughness: 0.34,
          side: THREE.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        resources.push(geometry, material);
        sculpture.add(new THREE.Mesh(geometry, material));

        // Rectangular isolines preserve the surface's mathematical structure.
        const gridPoints = [];
        const gridCount = 34;
        const lineSegments = 112;
        for (let line = 0; line <= gridCount; line += 1) {
          const fixed = (line / gridCount) * 2 - 1;
          for (let segment = 0; segment < lineSegments; segment += 1) {
            const a = (segment / lineSegments) * 2 - 1;
            const b = ((segment + 1) / lineSegments) * 2 - 1;
            gridPoints.push(
              ...pointOnSurface(fixed, a),
              ...pointOnSurface(fixed, b),
            );
            gridPoints.push(
              ...pointOnSurface(a, fixed),
              ...pointOnSurface(b, fixed),
            );
          }
        }
        const gridGeometry = new THREE.BufferGeometry();
        gridGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(gridPoints, 3),
        );
        const gridMaterial = new THREE.LineBasicMaterial({
          color: 0xbcdcff,
          transparent: true,
          opacity: 0.16,
          depthWrite: false,
        });
        resources.push(gridGeometry, gridMaterial);
        sculpture.add(new THREE.LineSegments(gridGeometry, gridMaterial));

        scene.add(new THREE.HemisphereLight(0xc8e4ff, 0x061339, 3));
        const keyLight = new THREE.DirectionalLight(0xd9ebff, 5);
        keyLight.position.set(-3, 6, 5);
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0x2b68ff, 4);
        rimLight.position.set(4, 1, -4);
        scene.add(rimLight);
        const fillLight = new THREE.DirectionalLight(0x8ebdff, 1.8);
        fillLight.position.set(3, -3, 4);
        scene.add(fillLight);

        let inView = true;
        let contextAvailable = true;
        let targetX = 0;
        let targetY = angleRef.current;
        let turn = angleRef.current;
        let previousTime = 0;

        function render(time) {
          frame = 0;
          if (
            !inView ||
            !contextAvailable ||
            document.hidden ||
            currentGeneration !== generation
          )
            return;
          const elapsed = previousTime
            ? Math.min((time - previousTime) / 1000, 0.05)
            : 1 / 60;
          previousTime = time;
          const easing = 1 - Math.exp(-elapsed * 7);
          sculpture.rotation.x += (targetX - sculpture.rotation.x) * easing;
          sculpture.rotation.y += (targetY - sculpture.rotation.y) * easing;
          renderer.render(scene, camera);
          if (renderer.getContext().isContextLost()) return;
          container.dataset.ready = "true";
          if (
            Math.abs(targetX - sculpture.rotation.x) +
              Math.abs(targetY - sculpture.rotation.y) >
            0.0005
          ) {
            frame = requestAnimationFrame(render);
          }
        }

        function requestRender() {
          if (!frame && inView && contextAvailable && !document.hidden) {
            previousTime = 0;
            frame = requestAnimationFrame(render);
          }
        }

        function resize() {
          const { width, height } = container.getBoundingClientRect();
          if (!width || !height) return;
          const aspect = width / height;
          const halfHeight = Math.max(2.9, 3.35 / aspect);
          camera.left = -halfHeight * aspect;
          camera.right = halfHeight * aspect;
          camera.top = halfHeight;
          camera.bottom = -halfHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          requestRender();
        }

        function pointerMove(event) {
          if (event.pointerType === "touch") return;
          const bounds = container.getBoundingClientRect();
          targetY =
            turn + ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.24;
          targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.13;
          requestRender();
        }

        function pointerLeave() {
          targetX = 0;
          targetY = turn;
          requestRender();
        }

        function visibilityChange() {
          if (document.hidden) {
            cancelAnimationFrame(frame);
            frame = 0;
          } else requestRender();
        }

        function contextLost(event) {
          event.preventDefault();
          contextAvailable = false;
          cancelAnimationFrame(frame);
          frame = 0;
          delete container.dataset.ready;
        }

        function contextRestored() {
          contextAvailable = true;
          requestRender();
        }

        controls.current = {
          rotate(nextAngle) {
            turn = nextAngle;
            targetY = turn;
            requestRender();
          },
        };
        container.addEventListener("pointermove", pointerMove, {
          passive: true,
        });
        container.addEventListener("pointerleave", pointerLeave, {
          passive: true,
        });
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        renderer.domElement.addEventListener(
          "webglcontextrestored",
          contextRestored,
        );
        document.addEventListener("visibilitychange", visibilityChange);
        removeListeners = () => {
          container.removeEventListener("pointermove", pointerMove);
          container.removeEventListener("pointerleave", pointerLeave);
          renderer.domElement.removeEventListener(
            "webglcontextlost",
            contextLost,
          );
          renderer.domElement.removeEventListener(
            "webglcontextrestored",
            contextRestored,
          );
          document.removeEventListener("visibilitychange", visibilityChange);
        };
        observer = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          if (inView) requestRender();
          else {
            cancelAnimationFrame(frame);
            frame = 0;
          }
        });
        observer.observe(container);
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        resize();
      } catch {
        // The server-rendered sculpture remains useful when WebGL is unavailable.
        cleanUp();
      }
    }

    start();
    motionPreference.addEventListener("change", start);
    return () => {
      generation += 1;
      motionPreference.removeEventListener("change", start);
      disposeScene();
    };
  }, [active]);

  return (
    <div className={styles.surface}>
      <div
        className={styles.art}
        ref={host}
        role="img"
        aria-label="A blue, folded mathematical surface. An interactive procedural sculpture, not a chart of market data."
      >
        <svg
          className={styles.fallback}
          viewBox="0 0 800 680"
          aria-hidden="true"
          focusable="false"
        >
          <g strokeWidth="0.48" strokeLinejoin="round">
            {fallback.map((face) => (
              <polygon
                key={face.key}
                points={face.points}
                fill={face.color}
                stroke={face.color}
              />
            ))}
          </g>
        </svg>
      </div>
      <button
        className={styles.rotate}
        type="button"
        onClick={() => setAngle((previous) => previous + Math.PI / 4)}
        aria-label="Rotate sculpture"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M19.1 8A8 8 0 1 0 20 14M19.1 8V3M19.1 8H14"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Rotate sculpture</span>
      </button>
    </div>
  );
}
