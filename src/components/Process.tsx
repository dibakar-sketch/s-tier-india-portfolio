'use client';

import { motion } from 'framer-motion';
import { processSteps } from '@/utils/constants';

export default function Process() {
  return (
    <section id="process" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Our Creative <span className="gradient-text">Process</span>
          </h2>
          <p className="text-luxury-beige text-lg max-w-2xl">
            From discovery to delivery, we follow a strategic approach to ensure
            exceptional results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Line connector */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[60%] w-full h-0.5 bg-gradient-to-r from-neon-cyan to-transparent" />
              )}

              <div className="glass p-6 rounded-2xl relative z-10">
                <div className="text-4xl font-black text-neon-cyan mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-luxury-beige text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
