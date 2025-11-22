'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { MemoryNode } from './MemoryNode';
import { ParticleField } from './ParticleField';
import { HeartStar } from './HeartStar';
import { Memory } from '@/lib/api';

interface UniverseSceneProps {
  memories: Memory[];
  onMemoryClick: (memory: Memory) => void;
  settings: any;
}

function SceneContent({ memories, onMemoryClick, settings }: UniverseSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Auto-rotate the entire universe
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += settings.camera_rotation_speed || 0.001;
    }
  });

  // Position memories on sphere surface
  const positionedMemories = memories.map((memory, index) => {
    const phi = Math.acos(-1 + (2 * index) / memories.length);
    const theta = Math.sqrt(memories.length * Math.PI) * phi;

    return {
      ...memory,
      position: [
        (memory.orbit_radius || 5) * Math.cos(theta) * Math.sin(phi),
        (memory.orbit_radius || 5) * Math.sin(theta) * Math.sin(phi),
        (memory.orbit_radius || 5) * Math.cos(phi),
      ] as [number, number, number],
    };
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#9b6cff" />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={settings.particle_count || 1000}
        factor={4}
        saturation={0}
        fade
      />

      {/* Memory nodes */}
      <group ref={groupRef}>
        {positionedMemories.map((memory) => (
          <MemoryNode
            key={memory.id}
            memory={memory}
            position={memory.position}
            onClick={() => onMemoryClick(memory)}
          />
        ))}

        {/* Hidden Heart Star */}
        <HeartStar />
      </group>

      {/* Orbit controls for manual navigation */}
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={25}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Particle field for depth */}
      <ParticleField count={500} />
    </>
  );
}

export function UniverseScene({ memories, onMemoryClick, settings }: UniverseSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-primary to-secondary flex items-center justify-center">
        <div className="text-accent-primary text-2xl font-poppins">Loading Universe...</div>
      </div>
    );
  }

  return (
    <div className="three-canvas">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 15] }}
      >
        <SceneContent
          memories={memories}
          onMemoryClick={onMemoryClick}
          settings={settings}
        />
      </Canvas>
    </div>
  );
}