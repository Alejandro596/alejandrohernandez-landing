"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Trail } from "@react-three/drei";
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
  flying: boolean;
};

export function createFlight(): Flight {
  return { x: -10, y: 0, z: 0.5, rotX: 0, rotY: 0, rotZ: 0, scale: 1, visible: false, flying: false };
}

function Plane({ flight }: { flight: Flight }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/paper-plane/scene.gltf");
  const model = useMemo(() => scene.clone(true), [scene]);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    // Aleteo de papel: vibración sutil solo en vuelo
    const flutterZ = flight.flying ? Math.sin(t * 16) * 0.035 + Math.sin(t * 7.3) * 0.02 : 0;
    const flutterX = flight.flying ? Math.sin(t * 11) * 0.022 : 0;
    const bobY = flight.flying ? Math.sin(t * 9) * 0.03 : 0;
    g.position.set(flight.x, flight.y + bobY, flight.z);
    g.rotation.set(flight.rotX + flutterX, flight.rotY, flight.rotZ + flutterZ);
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
      {/* Estela: cinta que sigue la cola del avión */}
      <Trail width={1.6} length={6.5} decay={1.4} color="#9bf0b8" attenuation={(w) => w * w}>
        <mesh position={[-1.15, 0.04, 0]}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </Trail>
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
