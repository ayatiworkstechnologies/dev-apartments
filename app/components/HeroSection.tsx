"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  /* ── Parallax: map vertical scroll to per-layer Y offsets ── */
  const { scrollY } = useScroll();

  const wavesY     = useSpring(useTransform(scrollY, [0, 600], [0, -12]),  { stiffness: 80, damping: 25 });
  const homeloBY   = useSpring(useTransform(scrollY, [0, 600], [0, -22]),  { stiffness: 80, damping: 25 });
  const buildingY  = useSpring(useTransform(scrollY, [0, 600], [0, -46]),  { stiffness: 80, damping: 25 });
  const taglineO   = useTransform(scrollY, [0, 180], [1, 0]);
  const ctaO       = useTransform(scrollY, [0, 220], [1, 0]);
  const ctaY       = useSpring(useTransform(scrollY, [0, 300], [0, 18]),   { stiffness: 80, damping: 25 });

  return (
    <section className="relative w-full h-svh min-h-[560px] overflow-hidden bg-[#f3e8d5]">

      {/* ── Background waves (slowest parallax layer) ── */}
      <motion.div
        style={{ y: wavesY }}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path d="M 1440 -50 C 1200 150 900 450 400 580 C 100 660 -80 740 -80 920 L 1440 920 Z" fill="#e6d8c3" opacity="0.5" />
          <path d="M 1440 150 C 1150 250 850 500 500 620 C 250 700 80 760 80 920 L 1440 920 Z" fill="#dfd0b8" opacity="0.35" />
          <path d="M 900 -50 C 1050 60 1300 80 1440 30 L 1440 -50 Z" fill="#e6d8c3" opacity="0.4" />
        </svg>
      </motion.div>

      {/* ── Tagline — letter-by-letter drop from top ── */}
      <div className="absolute top-20 inset-x-0 text-center z-10 overflow-hidden px-4">
        {"Transforming the future of home living".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + i * 0.032,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block text-[#7a6a58] text-[clamp(12.5px,1vw,15px)] italic tracking-[0.03em] font-normal font-secondary"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* ── HOMELO — big gold text, behind building ── */}
      <motion.h1
        style={{ y: homeloBY }}
        initial={{ opacity: 0, scaleX: 0.86, filter: "blur(12px)" }}
        animate={{ opacity: 1, scaleX: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        aria-label="HOMELO"
        className=" -mt-20
          absolute inset-x-0 text-center z-10 select-none whitespace-nowrap leading-none
          font-bold text-[#b08c1c] tracking-[0.01em]
          top-[28%] text-[clamp(70px,17.2vw,225px)]
          max-[768px]:top-[24%] max-[768px]:text-[clamp(56px,17vw,100px)]
          max-[480px]:top-[20%] max-[480px]:text-[clamp(44px,15.5vw,80px)]
        "
      >
        HOMEO
      </motion.h1>

      {/* ── Building — anchored bottom-center, rises on entrance ── */}
      <motion.div
        style={{ y: buildingY }}
        className="
          absolute z-20 left-1/2 -translate-x-1/2 bottom-0
          w-[clamp(320px,52vw,780px)]
          max-[768px]:w-[clamp(260px,75vw,480px)]
          max-[480px]:w-[clamp(220px,88vw,340px)]
        "
      >
        <motion.img
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=90&auto=format&fit=crop"
          alt="Dev Appartments Building"
          className="w-full h-auto object-contain block drop-shadow-[0_-8px_60px_rgba(0,0,0,0.18)]"
          draggable={false}
        />
      </motion.div>

      {/* ── CTA — fades & drifts down on scroll ── */}
      <motion.div
        style={{ opacity: ctaO, y: ctaY }}
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, duration: 0.75, ease: "easeOut" }}
        className="
          absolute z-30
          bottom-[clamp(40px,6vh,80px)] left-[clamp(24px,6vw,90px)]
          max-[768px]:bottom-7 max-[768px]:left-5
        "
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="text-[#3a2d1f] text-[clamp(11.5px,0.9vw,13.5px)] leading-[1.6] mb-[1.1rem] font-medium"
        >
          start your journey towards homeownership today!
        </motion.p>

        <div className="flex items-center gap-[0.6rem]">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, backgroundColor: "rgba(58,45,31,0.07)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center px-[1.1rem] py-[0.45rem] rounded-full border-[1.5px] border-[#3a2d1f] text-[#3a2d1f] text-[12.5px] font-semibold no-underline whitespace-nowrap bg-transparent transition-colors duration-200"
          >
            Get Started
          </motion.a>

          <motion.a
            href="#projects"
            whileHover={{ backgroundColor: "#3a2d1f", color: "#fff", scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-[33px] h-[33px] flex items-center justify-center rounded-full border-[1.5px] border-[#3a2d1f] text-[#3a2d1f] no-underline shrink-0 bg-transparent transition-colors duration-200"
            aria-label="Get started"
          >
            <ChevronRight size={15} strokeWidth={2.5} />
          </motion.a>
        </div>
      </motion.div>

    </section>
  );
}
