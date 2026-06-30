"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Villa, Pushpa Ave",
    location: "ECR",
    desc: "Experience contemporary villa living with thoughtfully planned spaces, premium finishes, and a prime location near the ECR coastline.",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=90&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=300&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Dev Pristine Villa",
    location: "Chennai",
    desc: "A signature project redefining residential luxury — every detail crafted for the discerning homebuyer.",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=90&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Villa, Pea Cock Enclave-4",
    location: "Chennai",
    desc: "Beautifully designed villas with modern amenities in one of Chennai's most sought-after residential enclaves.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=90&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&q=80&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Dev Heritage Homes",
    location: "Chennai",
    desc: "Heritage-inspired architecture blended with modern comforts, set amidst lush green surroundings.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=90&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Green Valley Villas",
    location: "Chennai",
    desc: "Serene residential villas surrounded by nature, offering a peaceful retreat from city life.",
    img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=90&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=300&q=80&auto=format&fit=crop",
  },
];

const TOTAL = projects.length;

export default function CompletedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Track: 500% wide, translate 0% → -80% */
  const xRaw = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-((TOTAL - 1) / TOTAL) * 100}%`]
  );

  /* Silky-smooth spring — lower stiffness for graceful glide */
  const x = useSpring(xRaw, { stiffness: 55, damping: 22, mass: 0.6 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(TOTAL - 1, Math.max(0, Math.round(v * (TOTAL - 1)))));
  });

  /* Formatted counter "01 / 05" */
  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`;

  return (
    <div ref={containerRef} id="completed" className="relative h-[500vh]">

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen bg-white flex items-center overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="grid lg:grid-cols-[5fr_8fr] gap-10 lg:gap-20 items-center">

            {/* ── Left: heading + desc + counter + dots ── */}
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -32, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[48px] font-black text-gray-900 leading-[1.15] mb-4 lg:mb-6"
              >
                Explore{" "}
                <span className="text-[#b08c1c]">Our</span>
                <br />
                <span className="text-[#b08c1c]">Successfully</span>
                <br />
                <span className="text-[#b08c1c]">Completed</span>
                <br />
                Residential Projects
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-gray-400 text-[13px] sm:text-[14px] leading-relaxed mb-10 max-w-xs"
              >
                Discover beautifully completed communities that reflect innovative
                design, superior construction, and Dev Appartments&apos; commitment
                to excellence and customer satisfaction.
              </motion.p>

              {/* Counter + dots row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ delay: 0.22, duration: 0.55 }}
                className="flex items-center gap-5"
              >
                {/* Animated slide counter */}
                <span className="text-[13px] font-bold text-gray-400 tabular-nums w-12 shrink-0">
                  {counter}
                </span>

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {projects.map((_, i) => (
                    <span
                      key={i}
                      className={`block rounded-full transition-all duration-400 ${
                        i === activeIndex
                          ? "w-8 h-[3px] bg-[#b08c1c]"
                          : "w-3 h-[3px] bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right: scroll-driven slide track ── */}
            <motion.div
              initial={{ opacity: 0, x: 40, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-3xl shadow-[0_8px_50px_rgba(0,0,0,0.14)]"
            >
              <motion.div className="flex w-[500%]" style={{ x }}>
                {projects.map((proj) => (
                  <div key={proj.id} className="w-1/5 shrink-0 relative">

                    {/* Full image — tall */}
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-[62vh] sm:h-[68vh] lg:h-[74vh] object-cover"
                    />

                    {/* Bottom gradient */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent h-2/5 pointer-events-none" />

                    {/* Floating info card */}
                    <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl">
                      <div className="flex gap-3 items-start">

                        {/* Thumbnail */}
                        <img
                          src={proj.thumb}
                          alt={proj.title}
                          className="w-14 h-14 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0"
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-gray-900 text-[14.5px] leading-snug mb-0.5 font-primary">
                            {proj.title}
                          </p>
                          <div className="flex items-center gap-1 mb-2">
                            <MapPin size={10} className="text-[#b08c1c] shrink-0" />
                            <p className="text-[#b08c1c] text-[11.5px] font-semibold font-primary">{proj.location}</p>
                          </div>
                          <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-2">
                            {proj.desc}
                          </p>
                          <button
                            type="button"
                            className="mt-3 inline-flex items-center gap-1.5 text-[#b08c1c] text-[12px] font-bold hover:gap-2.5 transition-all duration-200"
                          >
                            Explore More <ArrowRight size={12} />
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
