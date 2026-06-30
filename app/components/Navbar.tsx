"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",              href: "#" },
  { label: "About Us",          href: "#about" },
  { label: "Current Projects",  href: "#projects" },
  { label: "Recent Projects",   href: "#recent" },
  { label: "Completed Projects",href: "#completed" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const header = document.getElementById("site-header");
      if (header && !header.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <motion.header
      id="site-header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* Logo */}
          <motion.a href="#" whileHover={{ scale: 1.02 }} className="shrink-0">
            <img
              src="/logo.png"
              alt="Dev Appartments"
              className="h-9 sm:h-10 w-auto object-contain"
              draggable={false}
            />
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
                    relative px-4 lg:px-5 py-1.5 text-[12.5px] lg:text-[13px] font-medium rounded-full
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

          {/* Desktop CTA */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:inline-flex items-center px-5 lg:px-6 py-2 lg:py-2.5 rounded-full bg-[#e8612c] text-white text-[13px] lg:text-[13.5px] font-semibold hover:bg-[#d05525] transition-colors duration-200 shrink-0"
          >
            Contact
          </motion.a>

          {/* Mobile: Contact pill + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-full bg-[#e8612c] text-white text-[12px] font-semibold"
            >
              Contact
            </a>
            <button
              type="button"
              className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 sm:px-6 pt-2 pb-4">
              {navLinks.map((link) => {
                const isActive = active === link.label;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => { setActive(link.label); setMenuOpen(false); }}
                    className={`flex items-center gap-3 py-3.5 border-b border-gray-50 last:border-0 text-[14px] font-medium transition-colors duration-150 ${
                      isActive ? "text-gray-900" : "text-gray-500 active:text-gray-900"
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b08c1c] shrink-0" />
                    )}
                    {!isActive && <span className="w-1.5 h-1.5 shrink-0" />}
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
