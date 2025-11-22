'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: string;
}

export function NavigationSidebar({ isOpen, onToggle, currentPage }: NavigationSidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/universe', label: 'Universe', icon: '🌌' },
    { href: '/memories', label: 'Memories', icon: '📸' },
    { href: '/special', label: 'Special', icon: '💖' },
    { href: '/about', label: 'About', icon: '💭' },
    { href: '/admin', label: 'Admin', icon: '⚙️' },
  ];

  return (
    <>
      {/* Sidebar Overlay for mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-secondary/90 backdrop-blur-lg border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          ${isMobile ? 'w-64' : 'w-20 hover:w-64'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${!isMobile ? 'translate-x-0' : ''}
        `}
        initial={false}
        animate={{ x: isOpen || !isMobile ? 0 : '-100%' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className={`text-white font-poppins font-bold transition-opacity duration-300 ${!isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              Navigation
            </h2>
            {isMobile && (
              <button
                onClick={onToggle}
                className="text-white hover:text-accent-primary transition-colors p-2"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = currentPage === item.label.toLowerCase();

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-accent-primary/20 text-accent-primary border-l-4 border-accent-primary'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={isMobile ? onToggle : undefined}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className={`font-medium transition-opacity duration-300 ${!isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="text-center text-white/50 text-xs">
            <p className={`transition-opacity duration-300 ${!isMobile ? 'opacity-0' : 'opacity-100'}`}>
              Her Beautiful Universe
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Toggle Button (Desktop Only) */}
      {!isMobile && (
        <motion.button
          className="fixed top-6 left-6 z-40 glass p-3 rounded-lg text-white hover:bg-white/20 transition-colors"
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </motion.button>
      )}
    </>
  );
}