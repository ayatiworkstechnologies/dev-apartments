"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/* ======================================================
   HERO SLIDER TYPES
====================================================== */

interface HeroSlide {
  id: number;
  image: string;
  imageAlt: string;
  tagline: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
  nowrapTitle?: boolean;
}

/* ======================================================
   HERO SLIDER DATA

   First slide is unchanged.
   Add more slides inside this array.
====================================================== */

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero-banner-1.png",
    imageAlt: "Divya Desam luxury residential community",
    tagline: "Transforming the future of home living",
    title: "Divya Desam",
    buttonText: "Get Started",
    buttonLink: "#projects",
    objectPosition: "center center",
    mobileObjectPosition: "52% center",
    nowrapTitle: true,
  },
  // {
  //   id: 2,
  //   image: "/images/hero-banner-2.png",
  //   imageAlt: "Dev Pristine Villa luxury residential community",
  //   tagline: "Elegant coastal homes designed for life",
  //   title: "Dev Pristine Villa",
  //   buttonText: "Explore Project",
  //   buttonLink: "/recent-projects/dev-pristine-villa",
  //   objectPosition: "center center",
  //   mobileObjectPosition: "58% center",
  //   nowrapTitle: false,
  // },
];

/* ======================================================
   SETTINGS
====================================================== */

/* Automatic slide change every 2.5 seconds */
const AUTOPLAY_DURATION = 2500;

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

/* ======================================================
   SLIDE ANIMATIONS
====================================================== */

const backgroundVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 1.06,
  },

  center: {
    opacity: 1,
    scale: 1,
  },

  exit: {
    opacity: 0,
    scale: 1.025,
  },
};

const contentVariants: Variants = {
  enter: {
    opacity: 0,
    y: 24,
  },

  center: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: -18,
  },
};

const taglineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
    filter: "blur(5px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.55,
      ease,
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.94,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.92,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      type: "spring",
      stiffness: 170,
      damping: 16,
      mass: 0.8,
    },
  },
};

/* ======================================================
   COMPONENT
====================================================== */

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = heroSlides[activeIndex];

  const { scrollY } = useScroll();

  /* Background parallax */
  const backgroundY = useSpring(
    useTransform(scrollY, [0, 700], [0, -36]),
    {
      stiffness: 75,
      damping: 24,
      mass: 0.8,
    },
  );

  /* Content parallax */
  const contentY = useSpring(
    useTransform(scrollY, [0, 600], [0, -24]),
    {
      stiffness: 80,
      damping: 24,
      mass: 0.8,
    },
  );

  /* Content fade when scrolling down */
  const contentOpacity = useTransform(
    scrollY,
    [0, 420],
    [1, 0],
  );

  /* Bottom controls fade when scrolling */
  const bottomControlsOpacity = useTransform(
    scrollY,
    [0, 180],
    [1, 0],
  );

  /* ====================================================
     AUTOMATIC SLIDER
  ==================================================== */

  useEffect(() => {
    if (heroSlides.length <= 1) {
      return;
    }

    const sliderInterval = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === heroSlides.length - 1
          ? 0
          : currentIndex + 1,
      );
    }, AUTOPLAY_DURATION);

    return () => {
      window.clearInterval(sliderInterval);
    };
  }, []);

  /* Manual dot navigation */
  const goToSlide = (index: number) => {
    if (index === activeIndex) {
      return;
    }

    setActiveIndex(index);
  };

  return (
    <section
      id="home"
      className="
        relative h-[100svh]
        min-h-[560px]
        max-h-[960px]
        w-full overflow-hidden
        bg-[#3b2816]

        sm:min-h-[620px]
        lg:min-h-[680px]
      "
    >
      {/* ==================================================
          BACKGROUND SLIDER
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute -inset-y-10
          inset-x-0 z-0
        "
        aria-hidden="true"
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeSlide.id}
            variants={backgroundVariants}
            initial={reduceMotion ? false : "enter"}
            animate="center"
            exit="exit"
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease,
            }}
            style={{
              y: backgroundY,
              willChange: "transform, opacity",
            }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.imageAlt}
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              draggable={false}
              style={{
                objectPosition:
                  activeSlide.objectPosition ?? "center center",
              }}
              className="select-none object-cover"
            />

            {/* Mobile-specific image position */}
            <style jsx>{`
              @media (max-width: 639px) {
                div :global(img) {
                  object-position: ${activeSlide.mobileObjectPosition ??
                  activeSlide.objectPosition ??
                  "center center"} !important;
                }
              }
            `}</style>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Soft overlay */}
      <div
        className="
          pointer-events-none
          absolute inset-0 z-[1]
          bg-gradient-to-b
          from-black/10
          via-black/[0.02]
          to-black/25
        "
      />

      {/* Side vignette */}
      <div
        className="
          pointer-events-none
          absolute inset-0 z-[2]
          bg-[linear-gradient(90deg,rgba(0,0,0,0.18)_0%,transparent_24%,transparent_76%,rgba(0,0,0,0.18)_100%)]
        "
      />

      {/* ==================================================
          DYNAMIC SLIDE CONTENT
      ================================================== */}

      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="
          absolute inset-x-0
          top-[24%] z-20

          flex flex-col items-center
          px-4 text-center

          sm:top-[20%]
          md:top-[15%]
          lg:top-[13%]
          xl:top-[19%]
        "
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeSlide.id}
            variants={contentVariants}
            initial={reduceMotion ? false : "enter"}
            animate="center"
            exit="exit"
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              ease,
            }}
            className="
              flex w-full flex-col
              items-center
            "
          >
            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="
                font-secondary font-semibold
                tracking-[0.01em]
                text-[#000000]

                text-[11px]
                sm:text-[13px]
                md:text-[14px]
                lg:text-[15px]
                xl:text-[16px]
              "
            >
              {activeSlide.tagline}
            </motion.p>

            {/* Main title */}
            <motion.h1
              variants={titleVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className={`
                mt-3 select-none

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

                ${
                  activeSlide.nowrapTitle
                    ? "whitespace-nowrap"
                    : "max-w-[95vw] text-balance"
                }
              `}
            >
              {activeSlide.title}
            </motion.h1>

            {/* CTA button */}
            <motion.a
              href={activeSlide.buttonLink}
              variants={buttonVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
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
                mt-5 inline-flex
                items-center justify-center
                rounded-full

                bg-white
                px-5 py-2
                text-[11px]
                text-[#151515]

                font-primary font-semibold
                no-underline

                shadow-[0_10px_30px_rgba(0,0,0,0.14)]
                backdrop-blur-sm

                sm:mt-6
                sm:px-6 sm:py-2.5
                sm:text-[12px]

                md:px-7
                md:text-[13px]

                lg:mt-7
                lg:px-8 lg:py-3
                lg:text-[14px]
              "
            >
              {activeSlide.buttonText}
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ==================================================
          BOTTOM SCROLL + DOT INDICATORS

          Scroll is displayed first.
          Slider indicators are below Scroll.
      ================================================== */}

      <motion.div
        style={{
          opacity: bottomControlsOpacity,
        }}
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.6,
          ease,
        }}
        className="
          absolute bottom-4 left-1/2
          z-30 flex
          -translate-x-1/2
          flex-col items-center

          sm:bottom-6
          lg:bottom-7
        "
      >
        {/* Scroll indicator */}
        <a
          href="#projects"
          aria-label="Scroll to projects"
          className="
            flex flex-col items-center
            no-underline
          "
        >
          {/* Animated scroll line */}
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
        </a>

        {/* Slide indicators below Scroll */}
        {heroSlides.length > 1 && (
          <div
            className="
              mt-3 flex
              items-center gap-2
            "
            aria-label="Hero slider navigation"
          >
            {heroSlides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className="
                    relative h-[6px]
                    overflow-hidden
                    rounded-full
                    bg-white/45
                    transition-[width,background-color]
                    duration-500

                    sm:h-[7px]
                  "
                  style={{
                    width: isActive ? 40 : 9,
                  }}
                >
                  {isActive && (
                    <motion.span
                      key={`${activeSlide.id}-progress`}
                      initial={{
                        scaleX: 0,
                      }}
                      animate={{
                        scaleX: 1,
                      }}
                      transition={{
                        duration: AUTOPLAY_DURATION / 1000,
                        ease: "linear",
                      }}
                      className="
                        absolute inset-0
                        origin-left
                        rounded-full
                        bg-[#B88D48]
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Bottom image darkening */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0
          bottom-0 z-10
          h-[25%]

          bg-gradient-to-t
          from-black/30
          via-black/5
          to-transparent
        "
      />
    </section>
  );
}