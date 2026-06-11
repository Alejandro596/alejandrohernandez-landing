"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Trail } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Group, Mesh, MeshStandardMaterial } from "three";

// Estado mutable compartido: los timelines de GSAP escriben aquí y
// useFrame lo copia al avión en cada frame. Sin re-renders de React.
export type Flight = {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number; // offset adicional; el rumbo base lo calcula la trayectoria
  rotZ: number;
  scale: number;
  visible: boolean;
  flying: boolean;
};

export function createFlight(): Flight {
  return { x: -10, y: 0, z: 0.5, rotX: 0, rotY: 0, rotZ: 0, scale: 1, visible: false, flying: false };
}

function lerpAngle(a: number, b: number, t: number) {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

function Plane({ flight }: { flight: Flight }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/paper-plane/scene.gltf");

  // Clon propio + flat shading: cada cara del pliegue recibe su luz → se ve 3D de verdad
  const model = useMemo(() => {
    const m = scene.clone(true);
    m.traverse((o) => {
      if ((o as Mesh).isMesh) {
        const mat = (o as Mesh).material as MeshStandardMaterial;
        mat.flatShading = true;
        mat.roughness = 0.42;
        mat.metalness = 0.05;
        mat.needsUpdate = true;
      }
    });
    return m;
  }, [scene]);

  const prev = useRef({ x: flight.x, y: flight.y, z: flight.z });
  const heading = useRef(0);
  const pitch = useRef(0);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;

    // Rumbo desde la velocidad: el avión apunta hacia donde vuela (nunca gira en el sitio)
    const pr = prev.current;
    const dx = flight.x - pr.x;
    const dy = flight.y - pr.y;
    const dz = flight.z - pr.z;
    prev.current = { x: flight.x, y: flight.y, z: flight.z };
    const horiz = Math.hypot(dx, dz);
    if (horiz > 1.5) {
      // teletransporte (inicio de ciclo): rumbo instantáneo, sin barrido visible
      heading.current = Math.atan2(-dz, dx);
      pitch.current = 0;
    } else if (horiz > 0.0008) {
      heading.current = lerpAngle(heading.current, Math.atan2(-dz, dx), 0.16);
      const targetPitch = Math.max(-0.55, Math.min(0.55, Math.atan2(dy, horiz) * 0.55));
      pitch.current += (targetPitch - pitch.current) * 0.12;
    }

    // Aleteo de papel: vibración sutil solo en vuelo
    const flutterZ = flight.flying ? Math.sin(t * 16) * 0.035 + Math.sin(t * 7.3) * 0.02 : 0;
    const flutterX = flight.flying ? Math.sin(t * 11) * 0.022 : 0;
    const bobY = flight.flying ? Math.sin(t * 9) * 0.03 : 0;

    g.position.set(flight.x, flight.y + bobY, flight.z);
    g.rotation.set(
      flight.rotX + flutterX,
      heading.current + flight.rotY,
      flight.rotZ + pitch.current + flutterZ
    );
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
      {/* Tres luces: clave cálida arriba-derecha, relleno frío, contraluz para los bordes */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 7, 4]} intensity={2.1} color="#fffef0" />
      <directionalLight position={[-6, -3, 3]} intensity={0.5} color="#dff5e4" />
      <directionalLight position={[0, 2, -6]} intensity={1.1} color="#ffffff" />
      <Plane flight={flight} />
    </Canvas>
  );
}
