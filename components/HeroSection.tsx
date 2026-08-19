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
import { useCallback, useEffect, useState } from "react";

/* ======================================================
   TYPES
====================================================== */

interface HeroSlide {
  id: number;

  /* Desktop and tablet image */
  image: string;

  /* Separate mobile image */
  mobileImage?: string;

  imageAlt: string;
  tagline: string;
  title: string;
  buttonText: string;
  buttonLink: string;

  objectPosition?: string;
  mobileObjectPosition?: string;

  nowrapTitle?: boolean;

  /* Optional slide-specific colours */
  taglineColor?: string;
  titleColor?: string;
}

/* ======================================================
   HERO SLIDER DATA
====================================================== */

const heroSlides: HeroSlide[] = [
  {
    id: 1,

    image: "/images/hb-01.png",

    mobileImage:
      "/images/hb-mobile-o1.png",

    imageAlt:
      "Divya Desam luxury residential community",

    tagline:
      "Transforming the future of home living",

    title: "Divya Desam",

    buttonText: "Get Started",

    buttonLink: "/divya-desam",

    objectPosition: "center center",

    mobileObjectPosition: "center center",

    nowrapTitle: true,

    taglineColor: "#FFFFFF",

    titleColor: "#FFFFFF",
  },

  {
    id: 2,

    image: "/images/hb-02.png",

    mobileImage:
      "/images/hb-mobile-o2.png",

    imageAlt:
      "Divya Desam traditional luxury villa",

    tagline:
      "Rooted in tradition, crafted for modern living",

    title: "Divya Desam",

    buttonText: "Explore Project",

    buttonLink: "/divya-desam",

    objectPosition: "center center",

    mobileObjectPosition: "center center",

    nowrapTitle: true,

    taglineColor: "#FFFFFF",

    titleColor: "#FFFFFF",
  },

  {
    id: 3,

    image: "/images/hb-03.png",

    mobileImage:
      "/images/hb-mobile-o3.png",

    imageAlt:
      "Divya Desam premium villa community",

    tagline:
      "A timeless address designed around your family",

    title: "Divya Desam",

    buttonText: "View Villas",

    buttonLink: "/divya-desam",

    objectPosition: "center center",

    mobileObjectPosition: "center center",

    nowrapTitle: true,

    taglineColor: "#FFFFFF",

    titleColor: "#FFFFFF",
  },

  {
    id: 4,

    image: "/images/hb-04.png",

    mobileImage:
      "/images/hb-mobile-o4.png",

    imageAlt:
      "Divya Desam peaceful residential destination",

    tagline:
      "Where heritage, comfort and community come together",

    title: "Divya Desam",

    buttonText: "Discover More",

    buttonLink: "/divya-desam",

    objectPosition: "center center",

    mobileObjectPosition: "center center",

    nowrapTitle: true,

    taglineColor: "#FFFFFF",

    titleColor: "#FFFFFF",
  },
];

/* ======================================================
   SLIDER SETTINGS
====================================================== */

/* Smooth and comfortable slider timing */
const AUTOPLAY_DURATION = 5500;

/* Banner transition duration */
const SLIDE_TRANSITION_DURATION = 1.35;

const ease: [
  number,
  number,
  number,
  number,
] = [0.22, 1, 0.36, 1];

/* ======================================================
   BACKGROUND ANIMATION
====================================================== */

const backgroundVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 1.025,
  },

  center: {
    opacity: 1,
    scale: 1,
  },

  exit: {
    opacity: 0,
    scale: 1.015,
  },
};

/* ======================================================
   CONTENT ANIMATION
====================================================== */

const contentVariants: Variants = {
  enter: {
    opacity: 0,
    y: 18,
  },

  center: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: -12,
  },
};

const taglineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.7,
      delay: 0.12,
      ease,
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.975,
    filter: "blur(6px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.85,
      delay: 0.08,
      ease,
    },
  },
};

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      type: "spring",
      stiffness: 145,
      damping: 17,
      mass: 0.8,
      delay: 0.18,
    },
  },
};

/* ======================================================
   COMPONENT
====================================================== */

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] =
    useState(0);

  /*
   * Used to restart the autoplay timer when
   * the user manually changes a slide.
   */
  const [timerKey, setTimerKey] =
    useState(0);

  const activeSlide =
    heroSlides[activeIndex];

  const { scrollY } = useScroll();

  /* ====================================================
     PARALLAX
  ==================================================== */

  const backgroundY = useSpring(
    useTransform(
      scrollY,
      [0, 700],
      [0, -28],
    ),
    {
      stiffness: 70,
      damping: 25,
      mass: 0.85,
    },
  );

  const contentY = useSpring(
    useTransform(
      scrollY,
      [0, 600],
      [0, -20],
    ),
    {
      stiffness: 75,
      damping: 25,
      mass: 0.85,
    },
  );

  const contentOpacity = useTransform(
    scrollY,
    [0, 430],
    [1, 0],
  );

  const bottomControlsOpacity =
    useTransform(
      scrollY,
      [0, 200],
      [1, 0],
    );

  /* ====================================================
     NEXT SLIDE
  ==================================================== */

  const showNextSlide =
    useCallback(() => {
      setActiveIndex((currentIndex) =>
        currentIndex ===
        heroSlides.length - 1
          ? 0
          : currentIndex + 1,
      );
    }, []);

  /* ====================================================
     AUTOPLAY
  ==================================================== */

  useEffect(() => {
    if (
      heroSlides.length <= 1 ||
      reduceMotion
    ) {
      return;
    }

    const sliderTimer =
      window.setTimeout(() => {
        showNextSlide();
      }, AUTOPLAY_DURATION);

    return () => {
      window.clearTimeout(sliderTimer);
    };
  }, [
    activeIndex,
    timerKey,
    reduceMotion,
    showNextSlide,
  ]);

  /* ====================================================
     MANUAL NAVIGATION
  ==================================================== */

  const goToSlide = (
    index: number,
  ) => {
    if (index === activeIndex) {
      return;
    }

    setActiveIndex(index);

    /*
     * Restart autoplay timing after
     * manually selecting a slide.
     */
    setTimerKey(
      (currentKey) => currentKey + 1,
    );
  };

  return (
    <section
      id="home"
      className="
        relative
        h-[100svh]
        min-h-[560px]
        max-h-[960px]
        w-full
        overflow-hidden
        bg-[#24180f]

        sm:min-h-[620px]

        lg:min-h-[680px]
      "
    >
      {/* ================================================
          BACKGROUND SLIDER
      ================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-y-8
          inset-x-0
          z-0
        "
      >
        <AnimatePresence
          initial={false}
          mode="sync"
        >
          <motion.div
            key={activeSlide.id}
            variants={backgroundVariants}
            initial={
              reduceMotion
                ? false
                : "enter"
            }
            animate="center"
            exit="exit"
            transition={{
              duration: reduceMotion
                ? 0
                : SLIDE_TRANSITION_DURATION,
              ease,
            }}
            style={{
              y: backgroundY,
              willChange:
                "transform, opacity",
            }}
            className="
              absolute inset-0
            "
          >
            {/* Mobile image */}
            <div
              className="
                absolute inset-0
                sm:hidden
              "
            >
              <Image
                src={
                  activeSlide.mobileImage ??
                  activeSlide.image
                }
                alt={activeSlide.imageAlt}
                fill
                priority={
                  activeIndex === 0
                }
                sizes="100vw"
                draggable={false}
                style={{
                  objectPosition:
                    activeSlide.mobileObjectPosition ??
                    "center center",
                }}
                className="
                  select-none
                  object-cover
                "
              />
            </div>

            {/* Tablet, laptop and desktop image */}
            <div
              className="
                absolute inset-0
                hidden
                sm:block
              "
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.imageAlt}
                fill
                priority={
                  activeIndex === 0
                }
                sizes="100vw"
                draggable={false}
                style={{
                  objectPosition:
                    activeSlide.objectPosition ??
                    "center center",
                }}
                className="
                  select-none
                  object-cover
                "
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ================================================
          OVERLAYS
      ================================================ */}

      {/* Main overlay for text readability */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          z-[1]

          bg-gradient-to-b
          from-black/35
          via-black/[0.05]
          to-black/35
        "
      />

      {/* Central soft text contrast */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          z-[2]

          bg-[radial-gradient(circle_at_50%_25%,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.06)_32%,transparent_62%)]
        "
      />

      {/* Side vignette */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          z-[3]

          bg-[linear-gradient(90deg,rgba(0,0,0,0.25)_0%,transparent_23%,transparent_77%,rgba(0,0,0,0.27)_100%)]
        "
      />

      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          z-[4]

          bg-gradient-to-b
          from-black/35
          via-black/[0.04]
          to-black/45

          sm:hidden
        "
      />

      {/* ================================================
          SLIDE CONTENT
      ================================================ */}

      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="
          absolute
          inset-x-0
          top-[23%]
          z-20

          flex
          flex-col
          items-center

          px-4
          text-center

          sm:top-[20%]

          md:top-[16%]

          lg:top-[15%]

          xl:top-[18%]
        "
      >
        <AnimatePresence
          initial={false}
          mode="wait"
        >
          <motion.div
            key={activeSlide.id}
            variants={contentVariants}
            initial={
              reduceMotion
                ? false
                : "enter"
            }
            animate="center"
            exit="exit"
            transition={{
              duration: reduceMotion
                ? 0
                : 0.65,
              ease,
            }}
            className="
              flex
              w-full
              flex-col
              items-center
            "
          >
            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              initial={
                reduceMotion
                  ? false
                  : "hidden"
              }
              animate="visible"
              style={{
                color:
                  activeSlide.taglineColor ??
                  "#FFFFFF",
              }}
              className="
                max-w-[310px]

                font-secondary
                text-[11px]
                font-semibold
                leading-5
                tracking-[0.02em]

                drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]

                sm:max-w-none
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
              initial={
                reduceMotion
                  ? false
                  : "hidden"
              }
              animate="visible"
              style={{
                color:
                  activeSlide.titleColor ??
                  "#FFFFFF",
              }}
              className={`
                mt-3
                max-w-[94vw]
                select-none

                font-primary
                text-[clamp(42px,12vw,62px)]
                font-bold
                leading-[0.96]
                tracking-[-0.055em]

                drop-shadow-[0_5px_18px_rgba(0,0,0,0.72)]

                sm:mt-4
                sm:text-[clamp(62px,10vw,86px)]

                md:text-[clamp(72px,9vw,98px)]

                lg:text-[clamp(80px,8vw,108px)]

                xl:text-[clamp(86px,7vw,116px)]

                ${
                  activeSlide.nowrapTitle
                    ? "whitespace-nowrap"
                    : "text-balance"
                }
              `}
            >
              {activeSlide.title}
            </motion.h1>

            {/* CTA button */}
            <motion.a
              href={
                activeSlide.buttonLink
              }
              variants={buttonVariants}
              initial={
                reduceMotion
                  ? false
                  : "hidden"
              }
              animate="visible"
              whileHover={{
                y: -3,
                scale: 1.04,
                backgroundColor:
                  "#FFFFFF",
                color: "#7A5428",
              }}
              whileTap={{
                scale: 0.96,
              }}
              transition={{
                duration: 0.25,
                ease,
              }}
              className="
                mt-5
                inline-flex
                min-h-[42px]
                items-center
                justify-center
                rounded-full

                border
                border-[#d4ad71]
                bg-[#B88D48]

                px-6 py-2.5

                font-primary
                text-[11px]
                font-semibold
                text-white
                no-underline

                shadow-[0_12px_32px_rgba(0,0,0,0.24)]

                sm:mt-6
                sm:min-h-[46px]
                sm:px-7
                sm:text-[12px]

                md:px-8
                md:text-[13px]

                lg:mt-7
                lg:min-h-[50px]
                lg:px-9
                lg:text-[14px]
              "
            >
              {activeSlide.buttonText}
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ================================================
          BOTTOM CONTROLS
      ================================================ */}

      <motion.div
        style={{
          opacity:
            bottomControlsOpacity,
        }}
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease,
        }}
        className="
          absolute
          bottom-4
          left-1/2
          z-30

          flex
          -translate-x-1/2
          flex-col
          items-center

          sm:bottom-6

          lg:bottom-7
        "
      >
        {/* Scroll indicator */}
        {/* <a
          href="#projects"
          aria-label="Scroll to projects"
          className="
            flex
            flex-col
            items-center
            no-underline
          "
        >
          <div
            className="
              relative
              mb-1.5
              h-7
              w-px
              overflow-hidden
              bg-white/45

              sm:h-9
            "
          >
            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [
                        "-100%",
                        "160%",
                      ],
                    }
              }
              transition={{
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-0
                top-0
                h-1/2
                w-full
                bg-white
              "
            />
          </div>

          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [
                      0.6,
                      1,
                      0.6,
                    ],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              font-secondary
              text-[9px]
              font-medium
              tracking-[0.03em]
              text-white

              drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]

              sm:text-[10px]

              lg:text-[11px]
            "
          >
            Scroll
          </motion.span>
        </a> */}

        {/* Slider indicators */}
        {heroSlides.length > 1 && (
          <div
            aria-label="Hero slider navigation"
            className="
              mt-3
              flex
              items-center
              gap-2
            "
          >
            {heroSlides.map(
              (slide, index) => {
                const isActive =
                  index === activeIndex;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() =>
                      goToSlide(index)
                    }
                    aria-label={`Go to slide ${
                      index + 1
                    }`}
                    aria-current={
                      isActive
                        ? "true"
                        : undefined
                    }
                    className={`
                      relative
                      h-[7px]
                      overflow-hidden
                      rounded-full
                      border
                      border-white/30

                      transition-[width,background-color,opacity]
                      duration-500
                      ease-out

                      ${
                        isActive
                          ? "bg-white/35"
                          : "bg-white/60 hover:bg-white/90"
                      }
                    `}
                    style={{
                      width: isActive
                        ? 42
                        : 9,
                    }}
                  >
                    {isActive && (
                      <motion.span
                        key={`${activeSlide.id}-${timerKey}-progress`}
                        initial={{
                          scaleX: 0,
                        }}
                        animate={{
                          scaleX: 1,
                        }}
                        transition={{
                          duration:
                            reduceMotion
                              ? 0
                              : AUTOPLAY_DURATION /
                                1000,
                          ease: "linear",
                        }}
                        className="
                          absolute
                          inset-0
                          origin-left
                          rounded-full
                          bg-[#D8AE6A]
                        "
                      />
                    )}
                  </button>
                );
              },
            )}
          </div>
        )}
      </motion.div>

      {/* Bottom image darkening */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          h-[28%]

          bg-gradient-to-t
          from-black/50
          via-black/10
          to-transparent
        "
      />
    </section>
  );
}