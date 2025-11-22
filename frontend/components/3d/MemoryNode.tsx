'use client';

import { useRef, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Memory } from '@/lib/api';

interface MemoryNodeProps {
  memory: Memory;
  position: [number, number, number];
  onClick: () => void;
}

export function MemoryNode({ memory, position, onClick }: MemoryNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isSecret = memory.is_secret;

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onClick();
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  // Different colors for different categories and secret memories
  const getNodeColor = () => {
    if (isSecret) return '#ff6b8a'; // Pink for heart star
    const colors = {
      romantic: '#ff69b4',
      adventure: '#9b6cff',
      milestone: '#ffd700',
      everyday: '#87ceeb',
    };
    return colors[memory.category] || '#9b6cff';
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={hovered ? 1.3 : 1}
      >
        {isSecret ? (
          // Sphere for secret memories (simplified from heart)
          <sphereGeometry args={[0.5, 32, 32]} />
        ) : (
          // Sphere for regular memories
          <sphereGeometry args={[0.4, 32, 32]} />
        )}
        <meshStandardMaterial
          color={getNodeColor()}
          emissive={getNodeColor()}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          transparent={true}
          opacity={isSecret ? 0.7 : 0.9}
        />
      </mesh>

      {/* Glow effect when hovered */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshBasicMaterial
            color={getNodeColor()}
            transparent={true}
            opacity={0.2}
          />
        </mesh>
      )}

      {/* Memory title when hovered */}
      {hovered && (
        <Text
          position={[0, 1, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {memory.title}
        </Text>
      )}
    </group>
  );
}