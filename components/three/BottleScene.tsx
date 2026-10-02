"use client";

import { useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * BottleScene — the stylised glass-bottle pour. All motion is driven by a
 * shared progress ref (0→1) written by the pinned section's ScrollTrigger,
 * so the 3D scene never re-renders on scroll.
 *
 * Choreography (matches the PRD):
 *   0.00–0.45  camera orbits, bottle begins to tilt
 *   0.15–0.60  milk pours; bottle level falls
 *   0.22–0.80  glass level rises
 *   full       gentle orbit continues
 */

const smooth = (p: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const MILK = "#F6F0E3";
const GLASS = "#F2ECDF";

function Bottle({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const milk = useRef<THREE.Mesh>(null);

  const profile = [
    new THREE.Vector2(0.0, 0.02),
    new THREE.Vector2(0.5, 0.02),
    new THREE.Vector2(0.56, 0.3),
    new THREE.Vector2(0.56, 1.3),
    new THREE.Vector2(0.5, 1.6),
    new THREE.Vector2(0.3, 1.9),
    new THREE.Vector2(0.2, 2.05),
    new THREE.Vector2(0.2, 2.3),
    new THREE.Vector2(0.23, 2.32),
    new THREE.Vector2(0.23, 2.4),
  ];

  useFrame((state) => {
    const p = progressRef.current;
    if (group.current) {
      const tilt = smooth(p, 0.12, 0.4) * -0.62;
      group.current.rotation.z = tilt;
      group.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
    if (milk.current) {
      const level = 1 - smooth(p, 0.16, 0.6) * 0.75;
      milk.current.scale.y = Math.max(0.05, level);
      milk.current.position.y = 0.08 + 0.775 * level;
    }
  });

  return (
    <group ref={group} position={[-0.62, 0.28, 0]}>
      {/* glass body */}
      <mesh>
        <latheGeometry args={[profile, 28]} />
        {/* meshStandardMaterial with transparency, NOT meshPhysicalMaterial:
            `transmission` performs real refraction, which is one of the most
            expensive things you can ask a GPU to do per pixel. At bottle size
            the visual difference is negligible; the cost is not. */}
        <meshStandardMaterial
          color={GLASS}
          transparent
          opacity={0.42}
          roughness={0.12}
          metalness={0.05}
        />
      </mesh>
      {/* milk inside */}
      <mesh ref={milk} position={[0, 0.855, 0]}>
        <cylinderGeometry args={[0.47, 0.47, 1.55, 24]} />
        <meshStandardMaterial color={MILK} roughness={0.35} />
      </mesh>
      {/* cap */}
      <mesh position={[0, 2.47, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.1, 20]} />
        <meshStandardMaterial color="#D9C9A8" roughness={0.5} />
      </mesh>
    </group>
  );
}

function PourGlass({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const milk = useRef<THREE.Mesh>(null);
  const stream = useRef<THREE.Mesh>(null);

  const profile = [
    new THREE.Vector2(0.0, 0.02),
    new THREE.Vector2(0.36, 0.02),
    new THREE.Vector2(0.42, 0.9),
    new THREE.Vector2(0.4, 0.92),
  ];

  useFrame(() => {
    const p = progressRef.current;
    const level = smooth(p, 0.22, 0.8);
    if (milk.current) {
      milk.current.scale.y = Math.max(0.001, level);
      milk.current.position.y = 0.06 + 0.39 * level;
    }
    if (stream.current) {
      const pouring = smooth(p, 0.16, 0.22) * (1 - smooth(p, 0.58, 0.66));
      stream.current.scale.y = Math.max(0.001, pouring);
      stream.current.position.y = 0.1 + 0.95 * pouring;
      (stream.current.material as THREE.MeshStandardMaterial).opacity = pouring;
    }
  });

  return (
    <group position={[0.66, 0, 0]}>
      <mesh>
        <latheGeometry args={[profile, 24]} />
        <meshStandardMaterial
          color={GLASS}
          transparent
          opacity={0.38}
          roughness={0.12}
          metalness={0.05}
        />
      </mesh>
      <mesh ref={milk} position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.33, 0.33, 0.78, 22]} />
        <meshStandardMaterial color={MILK} roughness={0.35} />
      </mesh>
      {/* falling stream */}
      <mesh ref={stream} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 1.9, 10]} />
        <meshStandardMaterial color={MILK} roughness={0.3} transparent opacity={0} />
      </mesh>
    </group>
  );
}

function CameraRig({ progressRef }: { progressRef: MutableRefObject<number> }) {
  useFrame((state) => {
    const p = progressRef.current;
    const angle = -0.4 + p * 1.7 + Math.sin(state.clock.elapsedTime * 0.12) * 0.04;
    const radius = 5.6;
    state.camera.position.set(Math.sin(angle) * radius, 1.7, Math.cos(angle) * radius);
    state.camera.lookAt(0, 1.05, 0);
  });
  return null;
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[6, 32]} />
      <meshBasicMaterial color="#F1EADD" transparent opacity={0.55} />
    </mesh>
  );
}

export default function BottleScene({
  progressRef,
}: {
  progressRef: MutableRefObject<number>;
}) {
  return (
    <Canvas
      /* dpr capped at 1.25 and antialias off: at this size the difference is
         imperceptible, but MSAA on a full-viewport canvas is a real cost on
         mid-range laptops. */
      dpr={[1, 1.25]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.7, 5.6], fov: 36 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#FFF6E8" />
      <directionalLight position={[-5, 3, -2]} intensity={0.4} color="#E8DFD0" />
      <CameraRig progressRef={progressRef} />
      <Bottle progressRef={progressRef} />
      <PourGlass progressRef={progressRef} />
      <Ground />
    </Canvas>
  );
}
