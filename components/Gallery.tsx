"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";

/* Row A — exterior / architectural */
const rowA = [
  { src: "/images/gallery-01.png", alt: "Villa exterior" },
  { src: "/images/gallery-02.png", alt: "Modern white villa" },
  { src: "/images/gallery-03.png", alt: "Poolside villa" },
  { src: "/images/gallery-04.png", alt: "Green valley villa" },
  { src: "/images/gallery-05.png", alt: "Pearl residence" },
  { src: "/images/gallery-6.png", alt: "Pristine villa" },
  { src: "/images/gallery-1.png", alt: "Luxury villa" },
];

/* Row B — interior / lifestyle */
const rowB = [
  { src: "/images/gallery-8.png", alt: "Interior living space" },
  { src: "/images/gallery-9.png", alt: "Contemporary architecture" },
  { src: "/images/gallery-2.png", alt: "Open plan living" },
  { src: "/images/gallery-11.png", alt: "Modern kitchen" },
  { src: "/images/gallery-12.png", alt: "Pushpa Ave villa" },
  { src: "/images/gallery-6.png", alt: "Dev pristine" },
  { src: "/images/gallery-14.png", alt: "Luxury villa interior" },
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
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3">
          A Glimpse of Life at {" "}
          <span className="text-[#b08c1c] italic">Divya Desam
</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Experience beautifully designed spaces, thoughtful architecture, and modern villa living.
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
