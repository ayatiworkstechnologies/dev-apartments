"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const projects = [
  { id: 1, title: "Villa, Pea Cock Enclave-4", location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=85&auto=format&fit=crop" },
  { id: 2, title: "Dev Pristine Villa",        location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=85&auto=format&fit=crop" },
  { id: 3, title: "Villa, Pushpa Ave",         location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=85&auto=format&fit=crop" },
  { id: 4, title: "Dev Pristine Villa",        location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=85&auto=format&fit=crop" },
  { id: 5, title: "Dev Heritage Homes",        location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=85&auto=format&fit=crop" },
  { id: 6, title: "Green Valley Villas",       location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=700&q=85&auto=format&fit=crop" },
  { id: 7, title: "Pearl Residences",          location: "Chennai", year: "2026", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=85&auto=format&fit=crop" },
];

export default function ProjectsCarousel() {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(2); // center card starts active

  /* Update active index based on scroll position */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const cardW = el.scrollWidth / projects.length;
      const idx   = Math.round(el.scrollLeft / cardW);
      setActive(Math.min(Math.max(idx, 0), projects.length - 1));
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  return (
    <section id="projects" className="py-16 lg:py-24 bg-white overflow-hidden">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-4 mb-10 sm:mb-14"
      >
        <h2 className="text-[24px] sm:text-[34px] lg:text-[44px] font-black text-gray-900 leading-tight mb-3">
          Creative{" "}
          <span className="text-[#b08c1c] italic">Projects That</span>
          <br />
          <span className="text-[#b08c1c] italic">Define</span>{" "}
          Our Style
        </h2>
        <p className="text-gray-400 text-[12.5px] sm:text-[13.5px] max-w-sm mx-auto leading-relaxed font-secondary">
          Our diverse portfolio represents decades of construction experience backed by a
          passion for quality, outstanding client service.
        </p>
      </motion.div>

      {/* Scroll track */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-8
          px-[calc(50vw-110px)] sm:px-[calc(50vw-130px)] lg:px-[calc(50vw-160px)]
          scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {projects.map((proj, i) => {
          const isActive = i === active;
          return (
            <motion.div
              key={proj.id}
              onClick={() => {
                setActive(i);
                const el = scrollRef.current;
                if (!el) return;
                const cardW = el.scrollWidth / projects.length;
                el.scrollTo({ left: cardW * i, behavior: "smooth" });
              }}
              animate={{
                scale:  isActive ? 1 : 0.88,
                y:      isActive ? 0 : 20,
              }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
              className="shrink-0 cursor-pointer"
              style={{ scrollSnapAlign: "center" }}
            >
              {/* Image card */}
              <div
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.10)]
                  transition-all duration-300
                  w-55 sm:w-65 lg:w-75
                  ${isActive
                    ? "h-75 sm:h-90 lg:h-105"
                    : "h-65 sm:h-77.5 lg:h-90"
                  }
                `}
              >
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Hover "View" badge */}
                <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="bg-white text-gray-900 text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md tracking-wide">
                    View
                  </span>
                </div>
              </div>

              {/* Info below card */}
              <div className="mt-3 sm:mt-4 px-1">
                <p className="text-gray-400 text-[11px] sm:text-[12px] font-secondary mb-0.5">
                  {proj.location}
                </p>
                <p className="text-gray-900 text-[13px] sm:text-[14.5px] font-bold leading-snug font-primary">
                  {proj.title}
                </p>
                <p className="text-gray-400 text-[11px] sm:text-[12px] font-secondary mt-0.5">
                  {proj.year}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}
