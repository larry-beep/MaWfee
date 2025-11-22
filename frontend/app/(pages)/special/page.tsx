'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavigationSidebar } from '@/components/layout/NavigationSidebar';
import { MusicController } from '@/components/MusicController';

export default function SpecialPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [heartDiscovered, setHeartDiscovered] = useState(false);

  useEffect(() => {
    // Check if heart star has been discovered
    const discovered = localStorage.getItem('heart_discovered') === 'true';
    setHeartDiscovered(discovered);
  }, []);

  const handleReveal = () => {
    setHeartDiscovered(true);
    localStorage.setItem('heart_discovered', 'true');
  };

  return (
    <div className="min-h-screen bg-primary">
      <NavigationSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage="special"
      />

      <MusicController enabled={true} onToggle={() => {}} />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-poppins font-bold text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Special Moments
          </motion.h1>

          <motion.div
            className="glass rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-8xl mb-6">💖</div>
            <h2 className="text-3xl font-poppins font-bold text-white mb-4">
              The Hidden Heart Star
            </h2>

            {heartDiscovered ? (
              <div className="space-y-4">
                <p className="text-xl text-accent-primary">
                  🎉 Congratulations! You found the Heart Star! 🎉
                </p>
                <p className="text-white/80">
                  You've discovered the special secret hidden in our universe.
                  This represents the special connection we share that's hidden
                  but always there when you look closely.
                </p>
                <div className="mt-8">
                  <div className="text-6xl animate-pulse">✨</div>
                  <p className="text-white/60 mt-4">
                    Keep exploring our universe to find more special moments together.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-white/80 mb-6">
                  There's a special secret hidden somewhere in our 3D universe.
                  Explore carefully to find the mysterious Heart Star!
                </p>
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">
                    How to find it:
                  </h3>
                  <ul className="text-white/70 space-y-2 text-left max-w-md mx-auto">
                    <li>🌌 Visit the 3D Universe</li>
                    <li>🖱️ Navigate around the memory sphere</li>
                    <li>💫 Look for something that doesn't belong</li>
                    <li>✨ Click on the mysterious glowing object</li>
                    <li>💖 The Heart Star will reveal itself!</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <a
                    href="/universe"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-full font-medium hover:from-accent-primary/80 hover:to-accent-secondary/80 transition-all"
                  >
                    Explore Universe
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-poppins font-semibold text-white mb-3">
                What is the Heart Star?
              </h3>
              <p className="text-white/80">
                The Heart Star represents the special bond between us -
                unique, precious, and glowing with love. It's hidden because
                the most precious things in life are often discovered,
                not immediately visible.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-poppins font-semibold text-white mb-3">
                Keep Exploring
              </h3>
              <p className="text-white/80">
                Our universe is filled with memories, moments, and secrets.
                Keep coming back to explore and discover new ways that our
                story continues to grow and evolve together.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}