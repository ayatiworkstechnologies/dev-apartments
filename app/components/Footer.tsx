"use client";

import { motion } from "framer-motion";
import { Building2, Mail, Phone } from "lucide-react";

const socials = [
  { label: "Facebook",  d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", fill: false },
  { label: "X",         d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", fill: true },
  { label: "Instagram", d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z", fill: false },
  { label: "LinkedIn",  d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", fill: false },
  { label: "YouTube",   d: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20.06 12 20.06 12 20.06s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02l5.75-3.02-5.75-3.02v6.04z", fill: false },
];

const navLinks = [
  { label: "Home",             href: "#" },
  { label: "About Us",         href: "#" },
  { label: "Current projects", href: "#projects" },
  { label: "Recent projects",  href: "#projects" },
  { label: "Complete Projects", href: "#completed" },
  { label: "Contact us",       href: "#contact" },
];

/* Stagger the three columns in */
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
const colVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};


export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-100">
      <div className="max-w-290 mx-auto px-4 sm:px-8">

        {/* ── 3-column staggered grid ── */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_1.4fr_1.6fr] gap-10 pt-12 pb-10"
        >

          {/* Col 1: Brand */}
          <motion.div variants={colVariants}>
            <div className="mb-4">
              <img src="/logo.png" alt="Dev Appartments" className="h-12 w-auto object-contain" draggable={false} />
            </div>
            <p className="text-gray-900 font-bold text-[14px] mb-3 font-primary">Dev Appartments.</p>
            <p className="text-gray-500 text-[12.5px] leading-relaxed mb-5 max-w-65">
              We, at Dev Appartments aim to be the pillar of success and are unparalleled
              when it comes to the Real Estate business.
            </p>
            <p className="text-gray-800 font-bold text-[12.5px] mb-1 font-primary">Mon-Fri, 09.00 AM-06.00 PM</p>
            <p className="text-gray-800 font-bold text-[12.5px] mb-6 font-primary">Sunday Holiday</p>
            <div className="flex items-center gap-4">
              {socials.map(({ label, d, fill }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.2, opacity: 0.75 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[#e8612c] transition-opacity duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24"
                    fill={fill ? "currentColor" : "none"}
                    stroke={fill ? "none" : "currentColor"}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={d} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 2: Discover More */}
          <motion.div variants={colVariants}>
            <p className="font-bold text-gray-900 text-[15px] mb-5 font-primary">Discover More</p>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label} className="flex items-center gap-2">
                  <span className="w-1.25 h-1.25 rounded-full bg-gray-400 shrink-0" />
                  <a
                    href={href}
                    className="text-gray-600 text-[13px] hover:text-[#b08c1c] transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Contact */}
          <motion.div variants={colVariants} className="space-y-7">
            <div>
              <p className="flex items-center gap-2 font-bold text-gray-900 text-[15px] mb-2 font-primary">
                <Building2 size={16} className="text-[#e8612c]" /> Office
              </p>
              <p className="text-gray-500 text-[12.5px] leading-relaxed">
                New No. 15/2, Old No. 7/2, First Main Road,<br />
                Kasturibai Nagar Adyar Chennai -600020
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 font-bold text-gray-900 text-[15px] mb-2 font-primary">
                <Mail size={15} className="text-[#e8612c]" /> Email
              </p>
              <a href="mailto:info@devappartments.com"
                className="text-gray-500 text-[12.5px] hover:text-[#b08c1c] transition-colors duration-200">
                info@devappartments.com
              </a>
            </div>
            <div>
              <p className="flex items-center gap-2 font-bold text-gray-900 text-[15px] mb-2 font-primary">
                <Phone size={15} className="text-[#e8612c]" /> Mobile
              </p>
              <p className="text-gray-500 text-[12.5px]">98400 37777 || 98403 33117</p>
            </div>
          </motion.div>

        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="border-t border-gray-100 py-5 text-center"
        >
          <p className="text-gray-400 text-[11.5px]">
            © 2026 Dev Appartments. All rights reserved | Design &amp; Developed by Ayatiworks
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
