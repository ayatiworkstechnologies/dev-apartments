"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export default function HeroSection() {
  const { scrollY } = useScroll();

  const backgroundY = useSpring(
    useTransform(scrollY, [0, 700], [0, -36]),
    {
      stiffness: 75,
      damping: 24,
      mass: 0.8,
    },
  );

  const contentY = useSpring(
    useTransform(scrollY, [0, 600], [0, -24]),
    {
      stiffness: 80,
      damping: 24,
      mass: 0.8,
    },
  );

  const contentOpacity = useTransform(
    scrollY,
    [0, 420],
    [1, 0],
  );

  const scrollIndicatorOpacity = useTransform(
    scrollY,
    [0, 180],
    [1, 0],
  );

  return (
    <section
      id="home"
      className="
        relative w-full overflow-hidden bg-[#3b2816]

        h-[100svh]
        min-h-[560px]
        max-h-[960px]

        sm:min-h-[620px]
        lg:min-h-[680px]
      "
    >
      {/* Background image */}
      <motion.div
        style={{ y: backgroundY }}
        className="
          pointer-events-none absolute
          -inset-y-10 inset-x-0 z-0
        "
        aria-hidden="true"
      >
        <Image
          src="/images/hero-banner-1.png"
          alt="Divya Desam luxury residential community"
          fill
          priority
          sizes="100vw"
          draggable={false}
          className="
            select-none object-cover

            object-[center_center]

            max-sm:object-[52%_center]
          "
        />
      </motion.div>

      {/* Soft overlay */}
      <div
        className="
          pointer-events-none absolute inset-0 z-[1]

          bg-gradient-to-b
          from-black/10
          via-black/[0.02]
          to-black/25
        "
      />

      {/* Side vignette */}
      <div
        className="
          pointer-events-none absolute inset-0 z-[2]

          bg-[linear-gradient(90deg,rgba(0,0,0,0.18)_0%,transparent_24%,transparent_76%,rgba(0,0,0,0.18)_100%)]
        "
      />

      {/* Main centered content */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="
          absolute inset-x-0 z-20

          top-[24%]

          flex flex-col items-center
          px-4 text-center

          sm:top-[20%]
          md:top-[15%]
          lg:top-[13%]
          xl:top-[19%]
        "
      >
        {/* Tagline */}
        <motion.p
          initial={{
            opacity: 0,
            y: -18,
            filter: "blur(7px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.75,
            delay: 0.18,
            ease,
          }}
          className="
            font-secondary font-medium
            tracking-[0.01em]
            text-[#2f2923]

            text-[11px]

            sm:text-[13px]
            md:text-[14px]
            lg:text-[15px]
            xl:text-[16px]
          "
        >
          Transforming the future of home living
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.9,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.95,
            delay: 0.08,
            ease,
          }}
          className="
            mt-3 select-none whitespace-nowrap

            font-primary font-bold
            leading-[0.95]
            tracking-[-0.055em]
            text-[#090909]

            drop-shadow-[0_3px_12px_rgba(255,255,255,0.08)]

            text-[clamp(46px,13vw,68px)]

            sm:mt-4
            sm:text-[clamp(64px,10vw,88px)]

            md:text-[clamp(74px,9vw,100px)]

            lg:text-[clamp(82px,8vw,112px)]

            xl:text-[clamp(88px,7vw,120px)]
          "
        >
          Divya Desam
        </motion.h1>

        {/* Get Started button */}
        <motion.a
          href="#projects"
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.85,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 155,
            damping: 14,
            mass: 0.8,
            delay: 0.55,
          }}
          whileHover={{
            y: -3,
            scale: 1.06,
            backgroundColor: "#b88d48",
            color: "#ffffff",
          }}
          whileTap={{
            scale: 0.94,
          }}
          className="
            mt-5 inline-flex items-center
            justify-center rounded-full

            bg-white text-[#151515]
            font-primary font-semibold
            no-underline

            shadow-[0_10px_30px_rgba(0,0,0,0.14)]
            backdrop-blur-sm

            px-5 py-2
            text-[11px]

            sm:mt-6
            sm:px-6 sm:py-2.5
            sm:text-[12px]

            md:px-7
            md:text-[13px]

            lg:mt-7
            lg:px-8
            lg:py-3
            lg:text-[14px]
          "
        >
          Get Started
        </motion.a>
      </motion.div>

      {/* Bottom-center scroll indicator */}
      <motion.a
        href="#projects"
        style={{
          opacity: scrollIndicatorOpacity,
        }}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.75,
          delay: 0.85,
          ease,
        }}
        aria-label="Scroll to projects"
        className="
          absolute bottom-5 left-1/2 z-30
          flex -translate-x-1/2 flex-col
          items-center no-underline

          sm:bottom-7
          lg:bottom-8
        "
      >
        {/* Animated line */}
        <div
          className="
            relative mb-1.5
            h-7 w-px
            overflow-hidden
            bg-white/35

            sm:h-9
          "
        >
          <motion.span
            animate={{
              y: ["-100%", "160%"],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute left-0 top-0
              h-1/2 w-full
              bg-white
            "
          />
        </div>

        {/* Scroll text */}
        <motion.span
          animate={{
            opacity: [0.55, 1, 0.55],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            font-secondary font-medium
            tracking-[0.03em]
            text-white

            text-[9px]
            sm:text-[10px]
            lg:text-[11px]
          "
        >
          Scroll
        </motion.span>
      </motion.a>

      {/* Bottom image darkening */}
      <div
        className="
          pointer-events-none absolute
          inset-x-0 bottom-0 z-10
          h-[22%]

          bg-gradient-to-t
          from-black/25
          via-black/5
          to-transparent
        "
      />
    </section>
  );
}