import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

// Positions générées une fois au chargement du module, hors du composant
const COUNT = 160;
const positions = new Float32Array(COUNT * 3);
for (let i = 0; i < COUNT; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 20; // x
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
}

function Particles() {
  const mesh = useRef();

  // Animation — dérive lente vers le haut
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.02;
    mesh.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#c9a84c"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticlesBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
