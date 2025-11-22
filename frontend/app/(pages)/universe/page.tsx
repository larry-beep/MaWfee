'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MemoryModal } from '@/components/MemoryModal';
import { NavigationSidebar } from '@/components/layout/NavigationSidebar';
import { MusicController } from '@/components/MusicController';
import { Memory, memoriesApi, settingsApi } from '@/lib/api';
import { isWebGLSupported } from '@/lib/utils';

// Dynamically import 3D components to avoid SSR issues
const UniverseScene = dynamic(() => import('@/components/3d/UniverseScene').then(mod => ({ default: mod.UniverseScene })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-b from-primary to-secondary flex items-center justify-center">
      <div className="text-accent-primary text-2xl font-poppins">Loading Universe...</div>
    </div>
  ),
});

export default function UniversePage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    camera_rotation_speed: 0.001,
    particle_count: 1000,
    music_enabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    setWebGLSupported(isWebGLSupported());

    loadMemories();
    loadSettings();
  }, []);

  const loadMemories = async () => {
    try {
      const response = await memoriesApi.getAll();
      setMemories(response.data);
    } catch (error) {
      console.error('Failed to load memories:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await settingsApi.get();
      setSettings(response.data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMemory(null);
  };

  const handleModalNavigate = (direction: 'prev' | 'next') => {
    const currentIndex = memories.findIndex(m => m.id === selectedMemory?.id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : memories.length - 1;
    } else {
      newIndex = currentIndex < memories.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedMemory(memories[newIndex]);
  };

  // Fallback for devices that don't support WebGL
  if (!webGLSupported) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <div className="text-6xl mb-6">🌍</div>
          <h1 className="text-4xl font-poppins font-bold text-white mb-4">
            3D Universe Not Available
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Your device doesn't support WebGL, which is required for the 3D universe experience.
          </p>
          <a
            href="/memories"
            className="inline-block px-8 py-4 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/80 transition-colors"
          >
            View Photo Gallery Instead
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Universe Scene */}
      <UniverseScene
        memories={memories}
        onMemoryClick={handleMemoryClick}
        settings={settings}
      />

      {/* Navigation Sidebar */}
      <NavigationSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage="universe"
      />

      {/* Music Controller */}
      <MusicController
        enabled={settings.music_enabled}
        onToggle={() => {}}
      />

      {/* Memory Modal */}
      <MemoryModal
        memory={selectedMemory}
        memories={memories}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onNavigate={handleModalNavigate}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-primary/90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-accent-primary text-lg font-poppins">Loading Memories...</div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-30">
        <div className="glass px-6 py-3 rounded-full text-white/80 text-sm">
          🖱️ Click and drag to explore • Click memories to view • Find the hidden 💖
        </div>
      </div>
    </div>
  );
}