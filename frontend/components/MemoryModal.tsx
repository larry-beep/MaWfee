'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Memory } from '@/lib/api';

interface MemoryModalProps {
  memory: Memory | null;
  memories: Memory[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function MemoryModal({
  memory,
  memories,
  isOpen,
  onClose,
  onNavigate
}: MemoryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (memory) {
      const index = memories.findIndex(m => m.id === memory.id);
      setCurrentIndex(index);
    }
  }, [memory, memories]);

  if (!memory || !isOpen) return null;

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : memories.length - 1;
    onNavigate('prev');
  };

  const handleNext = () => {
    const nextIndex = currentIndex < memories.length - 1 ? currentIndex + 1 : 0;
    onNavigate('next');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal Content */}
        <motion.div
          className="relative max-w-4xl w-full max-h-[90vh] overflow-auto glass rounded-2xl border border-white/10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            ✕
          </button>

          {/* Memory Content */}
          <div className="p-6">
            {/* Title */}
            <motion.h2
              className="text-3xl font-poppins font-bold text-white mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {memory.title}
            </motion.h2>

            {/* Media Container */}
            <motion.div
              className="relative bg-black rounded-xl overflow-hidden mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ minHeight: '400px' }}
            >
              {memory.media_url && memory.media_url.endsWith('.mp4') ? (
                <video
                  src={memory.media_url}
                  controls
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '500px' }}
                />
              ) : memory.media_url ? (
                <img
                  src={memory.media_url}
                  alt={memory.title}
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '500px' }}
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center text-white/50">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📸</div>
                    <p>No media available</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Memory Details */}
            <motion.div
              className="space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Caption */}
              <p className="text-lg text-white/90 leading-relaxed">
                {memory.caption}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="text-white/60">
                  📅 {new Date(memory.date).toLocaleDateString()}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary border border-accent-primary/30">
                  {memory.category}
                </span>
                {memory.is_featured && (
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    ⭐ Featured
                  </span>
                )}
                {memory.is_secret && (
                  <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                    💖 Secret
                  </span>
                )}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              className="flex justify-between items-center mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handlePrev}
                className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                ← Previous
              </button>

              <span className="text-white/60 text-sm">
                {currentIndex + 1} / {memories.length}
              </span>

              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                Next →
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}