"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Current Projects", href: "#projects" },
  { label: "Recent Projects", href: "#recent" },
  { label: "Completed Projects", href: "#completed" },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-300 mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.a href="#" whileHover={{ scale: 1.02 }}>
            <img src="/logo.png" alt="Dev Appartments" className="h-10 w-auto object-contain" draggable={false} />
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            {navLinks.map((link) => {
              const isActive = active === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  className={`
                    relative px-5 py-1.75 text-[13px] font-medium rounded-full
                    transition-all duration-200 select-none mx-0.5
                    ${isActive
                      ? "text-gray-900 border border-gray-800"
                      : "text-gray-500 hover:text-gray-800 border border-transparent"
                    }
                  `}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full bg-[#e8612c] text-white text-[13.5px] font-semibold hover:bg-[#d05525] transition-colors duration-200"
          >
            Contact
          </motion.a>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 pb-5 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => { setActive(link.label); setMenuOpen(false); }}
                className={`block py-3 text-[13px] font-medium border-b border-gray-50 last:border-0 ${
                  active === link.label ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-4 block text-center px-6 py-3 rounded-full bg-[#e8612c] text-white text-sm font-semibold"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
