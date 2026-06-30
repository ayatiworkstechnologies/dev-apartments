"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  const { scrollY } = useScroll();

  const wavesY    = useSpring(useTransform(scrollY, [0, 600], [0, -12]), { stiffness: 80, damping: 25 });
  const homeloBY  = useSpring(useTransform(scrollY, [0, 600], [0, -22]), { stiffness: 80, damping: 25 });
  const buildingY = useSpring(useTransform(scrollY, [0, 600], [0, -46]), { stiffness: 80, damping: 25 });
  const ctaO      = useTransform(scrollY, [0, 220], [1, 0]);
  const ctaY      = useSpring(useTransform(scrollY, [0, 300], [0, 18]),  { stiffness: 80, damping: 25 });

  return (
    <section className="relative w-full h-svh min-h-145 overflow-hidden bg-[#f3e8d5]">

      {/* Background image */}
      <motion.div style={{ y: wavesY }} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <Image
          src="/images/hero-banner.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          draggable={false}
        />
      </motion.div>

      {/* Tagline — letter-by-letter drop */}
      <div className="absolute top-16 sm:top-18 inset-x-0 text-center z-10 px-4">
        {"Transforming the future of home living".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.03, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-[#7a6a58] text-[clamp(10px,2.2vw,14px)] italic tracking-[0.03em] font-normal font-secondary"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* HOMELO */}
      <motion.h1
        style={{ y: homeloBY }}
        initial={{ opacity: 0, scaleX: 0.88, filter: "blur(12px)" }}
        animate={{ opacity: 1, scaleX: 1,   filter: "blur(0px)" }}
        transition={{ delay: 0.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        aria-label="HOMELO"
        className="
          absolute inset-x-0 text-center z-10 select-none whitespace-nowrap leading-none
          font-bold text-[#b08c1c] tracking-[0.01em]
          top-[22%]   text-[clamp(52px,18vw,100px)]
          sm:top-[24%] sm:text-[clamp(72px,16vw,180px)]
          lg:top-[26%] lg:text-[clamp(90px,17.2vw,225px)]
        "
      >
        HOMELO
      </motion.h1>



      {/* CTA */}
      <motion.div
        style={{ opacity: ctaO, y: ctaY }}
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, duration: 0.75, ease: "easeOut" }}
        className="
          absolute z-30
          bottom-5 left-4
          sm:bottom-10 sm:left-7
          lg:bottom-[clamp(36px,6vh,72px)] lg:left-[clamp(40px,6vw,90px)]
        "
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-white text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-secondary font-medium"
        >
          start your journey towards<br />homeownership today!
        </motion.p>

        <div className="flex items-center gap-2.5">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, backgroundColor: "#3a2d1f", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3a2d1f] text-white text-xs sm:text-sm font-semibold no-underline whitespace-nowrap transition-colors duration-200"
          >
            Get Started
            <ChevronRight size={14} strokeWidth={2.5} />
          </motion.a>

          <motion.a
            href="#completed"
            whileHover={{ color: "#b08c1c" }}
            whileTap={{ scale: 0.97 }}
            className="text-[#4a3a28] text-xs sm:text-sm font-medium no-underline transition-colors duration-200 font-secondary"
          >
            View Projects
          </motion.a>
        </div>
      </motion.div>

    </section>
  );
}
