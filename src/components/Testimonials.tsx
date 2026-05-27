'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/utils/constants';
import { useState } from 'react';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass p-8 md:p-12 rounded-2xl text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl text-neon-cyan">
                  ★
                </span>
              ))}
            </div>

            <p className="text-lg md:text-xl text-luxury-beige mb-8 leading-relaxed italic">
              "{testimonials[current].text}"
            </p>

            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                className="w-12 h-12 rounded-full"
              />
              <div className="text-left">
                <p className="font-bold">{testimonials[current].name}</p>
                <p className="text-sm text-luxury-beige">{testimonials[current].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-neon-cyan hover:text-luxury-black transition-all"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-neon-cyan hover:text-luxury-black transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
