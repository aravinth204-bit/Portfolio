import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ACESFilmicToneMapping,
  BufferGeometry,
  CatmullRomCurve3,
  DoubleSide,
  Float32BufferAttribute,
  MathUtils,
  TubeGeometry,
  Vector3,
} from 'three';

function createRibbonGeometry() {
  const curve = new CatmullRomCurve3([
    new Vector3(-0.56, -1.42, 0),
    new Vector3(0.35, -1.04, 0.14),
    new Vector3(0.48, -0.43, 0.18),
    new Vector3(-0.3, 0.02, -0.12),
    new Vector3(-0.52, 0.62, -0.18),
    new Vector3(0.23, 1.08, 0.12),
    new Vector3(0.58, 1.43, 0.02),
  ]);
  const segments = 144;
  const positions = [];
  const indices = [];
  const edgePoints = [];

  for (let index = 0; index <= segments; index += 1) {
    const progress = index / segments;
    const center = curve.getPointAt(progress);
    const tangent = curve.getTangentAt(progress).normalize();
    const across = new Vector3(-tangent.y, tangent.x, 0).normalize();
    const twist = Math.sin(progress * Math.PI * 2.15) * 0.62;
    const width = 0.31 + Math.sin(progress * Math.PI) * 0.08;
    const widthVector = across.multiplyScalar(Math.cos(twist) * width);
    widthVector.z += Math.sin(twist) * width;
    const left = center.clone().add(widthVector);
    const right = center.clone().sub(widthVector);

    positions.push(left.x, left.y, left.z, right.x, right.y, right.z);
    edgePoints.push(left.clone().add(new Vector3(0, 0, 0.012)));

    if (index < segments) {
      const current = index * 2;
      const next = current + 2;
      indices.push(current, current + 1, next, current + 1, next + 1, next);
    }
  }

  const ribbon = new BufferGeometry();
  ribbon.setAttribute('position', new Float32BufferAttribute(positions, 3));
  ribbon.setIndex(indices);
  ribbon.computeVertexNormals();

  const edgeCurve = new CatmullRomCurve3(edgePoints);
  const orangeEdge = new TubeGeometry(edgeCurve, segments, 0.012, 6, false);

  return { ribbon, orangeEdge };
}

function FoldedRibbon({ pointer, animated }) {
  const group = useRef(null);
  const elapsed = useRef(0);
  const { ribbon, orangeEdge } = useMemo(() => createRibbonGeometry(), []);

  useFrame((_, delta) => {
    if (!group.current) return;

    if (animated) elapsed.current += delta;
    const time = elapsed.current;
    const targetX = (animated ? Math.sin(time * 0.38) * 0.025 : 0) + pointer.current.y * 0.12;
    const targetY = (animated ? Math.sin(time * 0.3) * 0.045 : 0) + pointer.current.x * 0.16;
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, targetX, 3, delta);
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, targetY, 3, delta);
    group.current.position.y = MathUtils.damp(
      group.current.position.y,
      animated ? Math.sin(time * 0.68) * 0.055 : 0,
      2,
      delta,
    );
  });

  return (
    <group ref={group} scale={0.88}>
      <mesh geometry={ribbon}>
        <meshStandardMaterial
          color="#4D525B"
          metalness={0.88}
          roughness={0.27}
          side={DoubleSide}
        />
      </mesh>
      <mesh geometry={orangeEdge}>
        <meshStandardMaterial
          color="#FF7138"
          emissive="#FF4A12"
          emissiveIntensity={1.35}
          metalness={0.35}
          roughness={0.24}
        />
      </mesh>
    </group>
  );
}

export default function HeroSculpture() {
  const pointer = useRef({ x: 0, y: 0 });
  const lowPower = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    const memory = navigator.deviceMemory;
    return window.matchMedia('(max-width: 600px)').matches
      || navigator.hardwareConcurrency <= 4
      || (memory !== undefined && memory <= 4);
  }, []);

  const [motionAllowed, setMotionAllowed] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const animated = !lowPower && motionAllowed;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setMotionAllowed(!query.matches);

    query.addEventListener('change', updateMotion);
    return () => query.removeEventListener('change', updateMotion);
  }, []);

  const handlePointerMove = (event) => {
    if (!animated) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointer.current.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  };

  const resetPointer = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  return (
    <div
      className="sculpture-canvas"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 36 }}
        dpr={lowPower ? 1 : [1, 1.35]}
        frameloop={animated ? 'always' : 'demand'}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'low-power',
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 4]} intensity={2.8} color="#E6E8EF" />
        <pointLight position={[-2.2, 0.4, 2.4]} intensity={16} color="#FF7138" distance={7} />
        <pointLight position={[2, -2, 1.5]} intensity={7} color="#8F98A8" distance={6} />
        <FoldedRibbon pointer={pointer} animated={animated} />
      </Canvas>
    </div>
  );
}
