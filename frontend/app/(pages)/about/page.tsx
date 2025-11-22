'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavigationSidebar } from '@/components/layout/NavigationSidebar';
import { MusicController } from '@/components/MusicController';

export default function AboutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary">
      <NavigationSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage="about"
      />

      <MusicController enabled={true} onToggle={() => {}} />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-poppins font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About This Universe
          </motion.h1>

          <div className="space-y-8">
            <motion.div
              className="glass rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">
                Our Beautiful Universe
              </h2>
              <p className="text-white/80 leading-relaxed text-lg">
                This is more than just a photo gallery - it's our universe,
                where memories float like stars in the vastness of space.
                Each memory is carefully placed in our personal cosmos,
                creating a constellation of moments that tell our unique story.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-poppins font-semibold text-white mb-3">
                  🌌 The 3D Universe
                </h3>
                <p className="text-white/80">
                  Explore our memories in three-dimensional space. Each photo
                  or video floats in our personal universe, positioned
                  meaningfully to create a celestial map of our journey together.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-poppins font-semibold text-white mb-3">
                  💖 The Heart Star
                </h3>
                <p className="text-white/80">
                  Hidden somewhere in our universe is a special secret.
                  The Heart Star represents the unique bond between us,
                  waiting to be discovered by those who explore carefully.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-poppins font-semibold text-white mb-3">
                  📸 Memory Categories
                </h3>
                <p className="text-white/80">
                  From romantic moments to everyday adventures, each memory
                  is categorized and given its place in our universe, creating
                  a rich tapestry of shared experiences.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-poppins font-semibold text-white mb-3">
                  🎵 Immersive Experience
                </h3>
                <p className="text-white/80">
                  Background music, smooth animations, and interactive elements
                  create an emotional journey through our memories, making each
                  visit feel like coming home.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="glass rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">
                Created with Love
              </h2>
              <p className="text-white/80 leading-relaxed text-lg mb-6">
                This universe was built as a tribute to our story, our memories,
                and our future together. Every line of code, every animation,
                and every pixel was crafted with love and dedication to create
                something as unique and special as what we share.
              </p>
              <div className="text-6xl animate-pulse">💕</div>
              <p className="text-white/60 mt-4">
                For us, for always, for everything we are and will be.
              </p>
            </motion.div>

            <motion.div
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-poppins font-semibold text-white mb-3">
                🚀 Technology Behind the Magic
              </h3>
              <p className="text-white/80 mb-4">
                This universe is powered by modern web technologies:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">⚛️</div>
                  <div className="text-sm text-white/70">Next.js</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">🎨</div>
                  <div className="text-sm text-white/70">Three.js</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">🎭</div>
                  <div className="text-sm text-white/70">Framer Motion</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">🐍</div>
                  <div className="text-sm text-white/70">Django</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}