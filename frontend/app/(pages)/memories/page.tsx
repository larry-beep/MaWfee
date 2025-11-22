'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Memory, memoriesApi } from '@/lib/api';
import { NavigationSidebar } from '@/components/layout/NavigationSidebar';
import { MusicController } from '@/components/MusicController';

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadMemories();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-accent-primary text-lg">Loading Memories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation Sidebar */}
      <NavigationSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage="memories"
      />

      {/* Music Controller */}
      <MusicController enabled={true} onToggle={() => {}} />

      {/* Header */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Memories
          </motion.h1>
          <motion.p
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            A beautiful collection of moments we've shared together
          </motion.p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                className="glass rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => memory.media_url && window.open(memory.media_url, '_blank')}
              >
                {/* Memory Media */}
                <div className="aspect-square bg-black/50 relative overflow-hidden">
                  {memory.media_url && memory.media_url.endsWith('.mp4') ? (
                    <video
                      src={memory.media_url}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : memory.media_url ? (
                    <img
                      src={memory.media_url}
                      alt={memory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📸</div>
                        <p className="text-sm">No Media</p>
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  {memory.media_url && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-accent-primary/80 text-white text-xs backdrop-blur-sm">
                      {memory.category}
                    </span>
                  </div>

                  {/* Secret Memory Indicator */}
                  {memory.is_secret && (
                    <div className="absolute top-4 left-4">
                      <span className="text-2xl">💖</span>
                    </div>
                  )}
                </div>

                {/* Memory Details */}
                <div className="p-6">
                  <h3 className="text-xl font-poppins font-semibold text-white mb-2 group-hover:text-accent-primary transition-colors">
                    {memory.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {memory.caption}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>📅 {new Date(memory.date).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                      {memory.is_featured && <span>⭐</span>}
                      {memory.is_secret && <span>💖</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {memories.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-2xl font-poppins text-white mb-2">No memories yet</h3>
          <p className="text-white/70">Start building your universe by adding some memories</p>
        </div>
      )}
    </div>
  );
}