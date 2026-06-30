"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

const projects = [
  { id: 1, title: "Villa, Pea Cock Enclave-4", location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=85&auto=format&fit=crop" },
  { id: 2, title: "Dev Pristine Villa",        location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=85&auto=format&fit=crop" },
  { id: 3, title: "Villa, Pushpa Ave",         location: "KK",      year: "2026", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=85&auto=format&fit=crop" },
  { id: 4, title: "Dev Pristine Villa",        location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=85&auto=format&fit=crop" },
  { id: 5, title: "Dev Heritage Homes",        location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=85&auto=format&fit=crop" },
  { id: 6, title: "Green Valley Villas",       location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=700&q=85&auto=format&fit=crop" },
  { id: 7, title: "Pearl Residences",          location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=85&auto=format&fit=crop" },
];

const trackVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.92, filter: "blur(8px)" },
  show: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 65, damping: 18, mass: 0.9 },
  },
};

export default function ProjectsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="py-16 lg:py-24 bg-white">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-4 mb-12"
      >
        <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-black text-gray-900 leading-tight mb-3">
          Creative{" "}
          <span className="text-[#b08c1c] italic">Projects That</span>
          <br />
          <span className="text-[#b08c1c] italic">Define</span>{" "}
          Our Style
        </h2>
        <p className="text-gray-400 text-[13px] sm:text-sm max-w-sm mx-auto leading-relaxed">
          Our diverse portfolio represents decades of construction experience backed by a
          passion for quality, outstanding client service.
        </p>
      </motion.div>

      {/* Edge-bleeding scroll track */}
      <motion.div
        ref={scrollRef}
        variants={trackVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.05 }}
        className="flex gap-5 overflow-x-auto pb-5 px-[clamp(20px,5vw,90px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            variants={cardVariants}
            className="group shrink-0 cursor-pointer w-[clamp(240px,27vw,320px)]"
          >
            {/* Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.10)] h-[clamp(300px,34vw,420px)]">

              {/* Image */}
              <img
                src={proj.img}
                alt={proj.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />

              {/* Year pill — top left */}
              <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-sm text-gray-800 text-[10.5px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {proj.year}
              </div>

              {/* Arrow button — top right, appears on hover */}
              <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight size={14} className="text-gray-800" />
              </div>

              {/* Bottom gradient + info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-16 pb-4 px-4">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin size={10} className="text-[#b08c1c] shrink-0" />
                  <span className="text-[#d4a832] text-[10.5px] font-semibold">{proj.location}</span>
                </div>
                <h3 className="text-white font-bold text-[14px] leading-snug">{proj.title}</h3>

                {/* "View Project" slides up on hover */}
                <div className="mt-2.5 overflow-hidden h-6">
                  <p className="text-white/70 text-[11px] font-medium translate-y-7 group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center gap-1">
                    View Project <ArrowUpRight size={10} />
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
