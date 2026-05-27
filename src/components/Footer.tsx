'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative py-16 px-6 border-t border-luxury-grey">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-12 mb-12"
        >
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">S-Tier India</h3>
            <p className="text-luxury-beige text-sm">
              Premium creative agency crafting cinematic brand experiences.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-luxury-beige text-sm">
              <li><a href="#services" className="hover:text-neon-cyan transition-colors">Podcast Production</a></li>
              <li><a href="#services" className="hover:text-neon-cyan transition-colors">AI Filmmaking</a></li>
              <li><a href="#services" className="hover:text-neon-cyan transition-colors">Graphic Design</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-luxury-beige text-sm">
              <li><a href="#" className="hover:text-neon-cyan transition-colors">About</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-luxury-beige text-sm">
              <li><a href="mailto:hello@stierindia.com" className="hover:text-neon-cyan transition-colors">Email</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-luxury-grey pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-luxury-beige text-sm">
            © {currentYear} S-Tier India. All rights reserved.
          </p>
          <div className="flex gap-6 text-luxury-beige text-sm mt-4 md:mt-0">
            <a href="#" className="hover:text-neon-cyan transition-colors">Privacy</a>
            <a href="#" className="hover:text-neon-cyan transition-colors">Terms</a>
            <a href="#" className="hover:text-neon-cyan transition-colors">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
