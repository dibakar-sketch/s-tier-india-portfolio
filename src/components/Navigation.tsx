'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', id: 'hero', href: '/' },
    { label: 'Portfolio', id: 'portfolio', href: '/#portfolio' },
    { label: 'Services', id: 'services', href: '/#services' },
    { label: 'Process', id: 'process', href: '/#process' },
    { label: 'Contact', id: 'contact', href: '/#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
      onMouseEnter={() => setIsScrolled(true)}
      onMouseLeave={() => setIsScrolled(false)}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold gradient-text"
        >
          <Link href="/">S-Tier India</Link>
        </motion.div>

        <div className="hidden md:flex gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={(e) => handleScroll(e, item.id)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="text-sm font-medium hover:text-neon-cyan transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="/jokes"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + 5 * 0.1 }}
            className="text-sm font-medium hover:text-neon-cyan transition-colors"
          >
            😂 Jokes
          </motion.a>
          <motion.a
            href="/todos"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + 6 * 0.1 }}
            className="text-sm font-medium hover:text-neon-cyan transition-colors"
          >
            ✓ Tasks
          </motion.a>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden md:block px-6 py-2 bg-neon-cyan text-luxury-black font-bold rounded-lg hover:bg-neon-purple transition-all duration-300"
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  );
}