'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MusicController } from '@/components/MusicController';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent-secondary/10 to-transparent" />
      </div>

      {/* Music Controller */}
      <MusicController enabled={true} onToggle={() => {}} />

      {/* Navigation Menu */}
      <motion.nav
        className="absolute top-6 left-6 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button className="glass px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">
          ☰ Menu
        </button>
      </motion.nav>

      {/* Main Content */}
      <div className="text-center z-10 px-6">
        <motion.h1
          className="text-5xl md:text-7xl font-poppins font-bold text-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {showText && (
            <span className="typewriter inline-block">
              Made for you, my universe
            </span>
          )}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          A journey through our memories, floating in the stars above
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <Link href="/universe">
            <button className="group relative px-12 py-4 text-lg font-medium text-white rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary/80 hover:to-accent-secondary/80 transition-all transform hover:scale-105">
              <span className="relative z-10">Enter Universe</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-white/40 text-sm">✨ Scroll or click to begin ✨</div>
      </motion.div>

      {/* Decorative Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent-star rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}