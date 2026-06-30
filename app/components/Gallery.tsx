"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";

/* Row A — exterior / architectural */
const rowA = [
  { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=85&auto=format&fit=crop", alt: "Villa exterior" },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=85&auto=format&fit=crop", alt: "Modern white villa" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85&auto=format&fit=crop", alt: "Poolside villa" },
  { src: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=85&auto=format&fit=crop", alt: "Green valley villa" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85&auto=format&fit=crop", alt: "Pearl residence" },
  { src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=85&auto=format&fit=crop", alt: "Pristine villa" },
];

/* Row B — interior / lifestyle */
const rowB = [
  { src: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=85&auto=format&fit=crop", alt: "Interior living space" },
  { src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=900&q=85&auto=format&fit=crop", alt: "Contemporary architecture" },
  { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85&auto=format&fit=crop", alt: "Open plan living" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop",  alt: "Modern kitchen" },
  { src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=85&auto=format&fit=crop", alt: "Pushpa Ave villa" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop", alt: "Dev pristine" },
];

/*
 * Duplicate 4× so the loop has plenty of runway.
 * Using mr-4 (not gap-4) on each image so every item's footprint
 * includes its trailing space → translateX(-50%) lands exactly
 * at the seam with zero jump.
 */
const trackA = [...rowA, ...rowA, ...rowA, ...rowA];
const trackB = [...rowB, ...rowB, ...rowB, ...rowB];

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative group shrink-0 overflow-hidden rounded-2xl h-52 sm:h-64 md:h-72 lg:h-80 xl:h-96 mr-3 sm:mr-4 shadow-[0_2px_20px_rgba(0,0,0,0.09)]">
      <img
        src={src}
        alt={alt}
        className="h-full w-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        draggable={false}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 bg-white text-gray-900 text-[11.5px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <Eye size={11} /> View
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 px-4"
      >
        <h2 className="text-[28px] sm:text-[34px] lg:text-[44px] font-black text-gray-900 mb-3">
          Luxury Living{" "}
          <span className="text-[#b08c1c] italic">Gallery</span>
        </h2>
        <p className="text-gray-400 text-[13px] sm:text-[14px] max-w-md mx-auto leading-relaxed">
          Experience the beauty, comfort, and quality of our development through carefully
          selected project photographs.
        </p>
      </motion.div>

      {/* ── Row 1: scrolls LEFT ── pause whole row on hover */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 hover:[&_.track]:[animation-play-state:paused]"
      >
        <div
          className="track flex w-max animate-[marquee_40s_linear_infinite] will-change-transform"
          aria-label="Gallery row 1"
        >
          {trackA.map((img, i) => (
            <GalleryImage key={i} src={img.src} alt={img.alt} />
          ))}
        </div>
      </motion.div>

      {/* ── Row 2: scrolls RIGHT — pause whole row on hover */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="hover:[&_.track]:[animation-play-state:paused]"
      >
        <div
          className="track flex w-max animate-[marquee-reverse_36s_linear_infinite] will-change-transform"
          aria-label="Gallery row 2"
        >
          {trackB.map((img, i) => (
            <GalleryImage key={i} src={img.src} alt={img.alt} />
          ))}
        </div>
      </motion.div>

    </section>
  );
}
