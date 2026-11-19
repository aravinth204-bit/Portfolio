import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils, AdditiveBlending } from 'three';
import './HeroParticleCore.css';

// Floating Geometric Wireframe Icosahedron
function InnerCore({ pointer }) {
  const meshRef = useRef(null);
  const glowRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Constant cybernetic rotation + mouse influence
    meshRef.current.rotation.x = time * 0.22 + pointer.current.y * 0.35;
    meshRef.current.rotation.y = time * 0.32 + pointer.current.x * 0.35;

    if (glowRef.current) {
      glowRef.current.rotation.x = -time * 0.15;
      glowRef.current.rotation.y = -time * 0.25;
      const pulse = 1 + Math.sin(time * 2.5) * 0.08;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Intense Glowing Core */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#FF7138" transparent opacity={0.65} />
      </mesh>

      {/* Primary Wireframe Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          color="#FF7138"
          emissive="#FF7138"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

// Orbiting Cybernetic Ring
function OrbitRings({ pointer }) {
  const ring1 = useRef(null);
  const ring2 = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = 1.1 + Math.sin(time * 0.4) * 0.15 + pointer.current.y * 0.2;
      ring1.current.rotation.z = time * 0.4 + pointer.current.x * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -0.9 + Math.cos(time * 0.35) * 0.15;
      ring2.current.rotation.y = -time * 0.35;
    }
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[1.85, 0.016, 16, 100]} />
        <meshBasicMaterial color="#FF895D" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.15, 0.012, 16, 100]} />
        <meshBasicMaterial color="#F5F5F5" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// Floating Particle Dust Cloud
function ParticleDust({ count = 350 }) {
  const pointsRef = useRef(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 1.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      sca[i] = Math.random();
    }
    return [pos, sca];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.07;
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        color="#FF895D"
        transparent
        opacity={0.75}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroParticleCore() {
  const pointer = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const resetPointer = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  return (
    <div 
      className="particle-core-wrapper"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      {/* HUD Digital Coordinates Overlay */}
      <div className="particle-core-hud" aria-hidden="true">
        <span className="hud-badge top-left">
          <span className="hud-pulse" /> CORE://ONLINE
        </span>
        <span className="hud-coord top-right">LAT. 11.3410° N // 77.7172° E</span>
        <span className="hud-specs bottom-left">FPS 60.0 &bull; WEBGL_2.0</span>
        <span className="hud-badge bottom-right">3D ENGINE</span>
      </div>

      <Canvas
        className="particle-core-canvas"
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={18} color="#FF7138" distance={6} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#F5F5F5" />
        
        <InnerCore pointer={pointer} />
        <OrbitRings pointer={pointer} />
        <ParticleDust />
      </Canvas>
    </div>
  );
}
