"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";

// Estado mutable compartido: los timelines de GSAP escriben aquí y
// useFrame lo copia al avión en cada frame. Sin re-renders de React.
export type Flight = {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  visible: boolean;
  idle: boolean;
};

export function createFlight(): Flight {
  return { x: -10, y: 0, z: 0.5, rotX: 0, rotY: 0, rotZ: 0, scale: 1, visible: false, idle: false };
}

function Plane({ flight }: { flight: Flight }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/paper-plane/scene.gltf");
  const model = useMemo(() => scene.clone(true), [scene]);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    const bob = flight.idle ? Math.sin(t * 1.6) * 0.08 : 0;
    g.position.set(flight.x, flight.y + bob, flight.z);
    g.rotation.set(flight.rotX, flight.rotY, flight.rotZ + (flight.idle ? Math.sin(t * 1.1) * 0.05 : 0));
    g.scale.setScalar(flight.scale);
    g.visible = flight.visible;
  });

  return (
    <group ref={group}>
      {/* Orden importa: primero se acuesta el dart (X), luego la nariz a +X (Z) */}
      <group rotation={[0, 0, -Math.PI / 2]}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Center>
            <primitive object={model} />
          </Center>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/paper-plane/scene.gltf");

export default function PlaneScene({ flight }: { flight: Flight }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      className="pointer-events-none"
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 6]} intensity={1.6} />
      <directionalLight position={[-5, -2, 2]} intensity={0.4} />
      <Plane flight={flight} />
    </Canvas>
  );
}
