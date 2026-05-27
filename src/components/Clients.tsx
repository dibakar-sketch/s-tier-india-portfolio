'use client';

import { motion } from 'framer-motion';
import { clients } from '@/utils/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

export default function Clients() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Trusted by <span className="gradient-text">Premium Brands</span>
          </h2>
          <p className="text-luxury-beige text-lg max-w-2xl mx-auto">
            We\'ve partnered with leading companies to create award-winning campaigns.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              className="glass p-6 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <div className="text-4xl">{client.logo}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
