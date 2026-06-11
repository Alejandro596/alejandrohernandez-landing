"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Trail, Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import {
  CanvasTexture,
  CatmullRomCurve3,
  Group,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  Vector3,
} from "three";

// Estado mutable compartido: GSAP solo anima `progress` (0..1); la posición
// y la orientación salen de la CURVA 3D nativa de three.js. La tangente
// analítica de la curva da el rumbo exacto en cada punto — cero ruido,
// cero titubeo. Nada se deriva de deltas frame a frame.
export type FlightPathPoint = { x: number; y: number; z: number };

export type Flight = {
  path: FlightPathPoint[] | null;
  pathVersion: number; // se incrementa al asignar un path nuevo
  progress: number; // 0..1 a lo largo de la curva, por longitud de arco
  rotX: number; // inclinaciones artísticas extra sobre la orientación base
  rotY: number;
  rotZ: number;
  scale: number;
  visible: boolean;
  flying: boolean;
};

export function createFlight(): Flight {
  return {
    path: null,
    pathVersion: 0,
    progress: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    scale: 1,
    visible: false,
    flying: false,
  };
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function wrapAngle(a: number) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function Plane({ flight }: { flight: Flight }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/paper-plane/scene.gltf");

  // Papel VERDE de marca con patrón: textura procesal tipo papel milimetrado
  // (cuadrícula clara + moteado) sobre el verde, en vez del bakeado original.
  const paperTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#23cd62";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 256; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i + 0.5, 0);
      ctx.lineTo(i + 0.5, 256);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i + 0.5);
      ctx.lineTo(256, i + 0.5);
      ctx.stroke();
    }
    // fibra del papel: puntitos oscuros y claros dispersos
    for (let i = 0; i < 420; i++) {
      ctx.fillStyle = i % 2 ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.05)";
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 1.4, 1.4);
    }
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    t.wrapS = t.wrapT = RepeatWrapping;
    t.repeat.set(2, 2);
    t.anisotropy = 4;
    return t;
  }, []);

  const model = useMemo(() => {
    const m = scene.clone(true);
    m.traverse((o) => {
      if ((o as Mesh).isMesh) {
        const mat = (o as Mesh).material as MeshStandardMaterial;
        mat.map = paperTex;
        mat.color.set("#ffffff"); // el color lo pone la textura
        mat.flatShading = true;
        mat.roughness = 0.5;
        mat.metalness = 0.04;
        mat.envMapIntensity = 0.6;
        mat.needsUpdate = true;
      }
    });
    return m;
  }, [scene, paperTex]);

  const cache = useRef<{ version: number; curve: CatmullRomCurve3 | null }>({
    version: -1,
    curve: null,
  });
  const pitch = useRef(0);
  const bank = useRef(0);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    g.visible = flight.visible;
    if (!flight.visible) return;

    const c = cache.current;
    if (c.version !== flight.pathVersion) {
      c.version = flight.pathVersion;
      c.curve = flight.path
        ? new CatmullRomCurve3(
            flight.path.map((p) => new Vector3(p.x, p.y, p.z)),
            false,
            "catmullrom",
            0.5
          )
        : null;
      if (c.curve) c.curve.arcLengthDivisions = 600;
      pitch.current = 0;
      bank.current = 0;
    }
    const curve = c.curve;
    if (!curve) return;

    const u = clamp(flight.progress, 0, 1);
    const pos = curve.getPointAt(u); // parametrizado por longitud de arco
    const tan = curve.getTangentAt(u);

    // Rumbo y cabeceo directos de la tangente: el avión apunta exactamente
    // hacia donde va, siempre.
    const heading = Math.atan2(-tan.z, tan.x);
    const horiz = Math.hypot(tan.x, tan.z);
    const targetPitch = clamp(Math.atan2(tan.y, horiz) * 0.45, -0.3, 0.3);
    pitch.current += (targetPitch - pitch.current) * 0.1;

    // Banqueo desde la CURVATURA: cuánto gira el rumbo un poco más adelante.
    // Se ladea entrando a la curva y se nivela solo en las rectas.
    const ahead = curve.getTangentAt(Math.min(1, u + 0.012));
    const turn = wrapAngle(Math.atan2(-ahead.z, ahead.x) - heading);
    const targetBank = clamp(turn * 3.2, -0.5, 0.5);
    bank.current += (targetBank - bank.current) * 0.08;

    g.position.copy(pos);
    // yaw (Y) -> pitch (Z, eje de las alas) -> roll (X, eje de la nariz)
    g.rotation.order = "YZX";
    g.rotation.set(flight.rotX + bank.current, heading + flight.rotY, flight.rotZ + pitch.current);
    g.scale.setScalar(flight.scale);
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
      <Trail width={1.8} length={7} decay={1.3} color="#6fe39c" attenuation={(w) => w * w}>
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
      {/* Luces + entorno HDR: papel blanco con volumen sobre fondo oscuro */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 7, 4]} intensity={1.6} color="#fff7e6" />
      <directionalLight position={[-6, -3, 3]} intensity={0.5} color="#dff5e4" />
      <directionalLight position={[0, 2, -6]} intensity={1.2} color="#ffffff" />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <Plane flight={flight} />
    </Canvas>
  );
}
