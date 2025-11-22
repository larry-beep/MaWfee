'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HeartStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [discovered, setDiscovered] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0.5);

  // Pulsing animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 0.8;
      meshRef.current.scale.setScalar(pulse);

      // Glow effect when discovered
      if (discovered) {
        const glow = Math.sin(state.clock.elapsedTime * 4) * 0.3 + 0.7;
        setGlowIntensity(glow);
      }
    }
  });

  const handleClick = (event: any) => {
    event.stopPropagation();
    if (!discovered) {
      setDiscovered(true);
      // Trigger celebration animation
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    // Add confetti, special effects, or reveal secret memory
    console.log('Heart Star discovered! 💖');
    // You could add a callback here to trigger confetti or show a special modal
  };

  return (
    <group position={[8, 4, -3]}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        scale={0.8}
      >
        {/* Heart star shape - using dodecahedron as a special shape */}
        <dodecahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color={discovered ? "#ff6b8a" : "#f6f7ff"}
          emissive={discovered ? "#ff6b8a" : "#f6f7ff"}
          emissiveIntensity={glowIntensity}
          transparent={true}
          opacity={discovered ? 1 : 0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Outer glow when discovered */}
      {discovered && (
        <mesh>
          <dodecahedronGeometry args={[0.7]} />
          <meshBasicMaterial
            color="#ff6b8a"
            transparent={true}
            opacity={glowIntensity * 0.3}
          />
        </mesh>
      )}

      {/* Sparkle particles around discovered heart */}
      {discovered && (
        <SparkleField count={20} />
      )}
    </group>
  );
}

function SparkleField({ count }: { count: number }) {
  const particles = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y += 0.005;
      particles.current.rotation.x += 0.003;
    }
  });

  const sparkleGeometry = () => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      const radius = 1.5;
      positions[i] = (Math.random() - 0.5) * radius;
      positions[i + 1] = (Math.random() - 0.5) * radius;
      positions[i + 2] = (Math.random() - 0.5) * radius;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  };

  return (
    <points ref={particles} geometry={sparkleGeometry()}>
      <pointsMaterial
        color="#f6f7ff"
        size={0.05}
        transparent={true}
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}