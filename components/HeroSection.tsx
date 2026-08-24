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
import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Download, FileText, X } from "lucide-react";

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

type BrochureFormData = {
  name: string;
  email: string;
  phone: string;
};

type SubmissionStatus = "idle" | "success" | "error";

type ApiResponse = {
  success?: boolean;
  message?: string;
};

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
      "Where timeless spiritual heritage meets serene, sophisticated living at the beautiful shores of ECR, Thiruvidanthai",

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
      "More than a home, it is a peaceful sanctuary where heritage, harmony and modern living come together to create a truly divine lifestyle at ECR",

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
      "Experience the rare harmony of divine surroundings, peaceful living and modern elegance in one of ECR’s most promising destinations",

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
      "Come home to a thoughtfully crafted lifestyle where divine grace, natural serenity and contemporary comforts meet at Thiruvidanthai, ECR",

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

/* Brochure PDF served from the public folder */
const BROCHURE_FILE_URL = "/pdf/brochure.pdf";
const BROCHURE_FILE_NAME = "Divya-Desam-Brochure.pdf";

const initialFormData: BrochureFormData = {
  name: "",
  email: "",
  phone: "",
};

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

const secondaryButtonVariants: Variants = {
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
      delay: 0.26,
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
     DOWNLOAD BROCHURE MODAL STATE
  ==================================================== */

  const [isBrochureOpen, setIsBrochureOpen] =
    useState(false);

  const [formData, setFormData] =
    useState<BrochureFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");

  const [statusMessage, setStatusMessage] =
    useState("");

  const openBrochureForm = () => {
    setIsBrochureOpen(true);

    setSubmissionStatus("idle");
    setStatusMessage("");
  };

  const closeBrochureForm = () => {
    if (isSubmitting) return;

    setIsBrochureOpen(false);

    setSubmissionStatus("idle");
    setStatusMessage("");
  };

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (submissionStatus !== "idle") {
      setSubmissionStatus("idle");
      setStatusMessage("");
    }
  };

  const triggerBrochureDownload = () => {
    const link = document.createElement("a");

    link.href = BROCHURE_FILE_URL;
    link.download = BROCHURE_FILE_NAME;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBrochureSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    const cleanedFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    if (
      !cleanedFormData.name ||
      !cleanedFormData.email ||
      !cleanedFormData.phone
    ) {
      setSubmissionStatus("error");

      setStatusMessage(
        "Please fill in all required fields.",
      );

      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(cleanedFormData.email)
    ) {
      setSubmissionStatus("error");

      setStatusMessage(
        "Please enter a valid email address.",
      );

      return;
    }

    const phonePattern = /^[0-9+\-\s()]{7,20}$/;

    if (
      !phonePattern.test(cleanedFormData.phone)
    ) {
      setSubmissionStatus("error");

      setStatusMessage(
        "Please enter a valid phone number.",
      );

      return;
    }

    setIsSubmitting(true);

    setSubmissionStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch(
        "/api/download-brochure",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify(
            cleanedFormData,
          ),
        },
      );

      const result =
        (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to submit your request.",
        );
      }

      if (result.success === false) {
        throw new Error(
          result.message ||
            "Unable to submit your request.",
        );
      }

      setSubmissionStatus("success");

      setStatusMessage(
        result.message ||
          "Thank you! Your brochure is downloading now.",
      );

      triggerBrochureDownload();

      setFormData(initialFormData);
    } catch (error: unknown) {
      console.error(
        "Brochure download submission error:",
        error,
      );

      setSubmissionStatus("error");

      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isBrochureOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape" &&
        !isSubmitting
      ) {
        setIsBrochureOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [isBrochureOpen, isSubmitting]);

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
          top-[20%]
          z-20

          flex
          flex-col
          items-center

          px-4
          text-center

          sm:top-[18%]
          md:top-[16%]
          lg:top-[15%]
          xl:top-[17%]
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
              max-w-[1440px]
              flex-col
              items-center
            "
          >
            {/* Launching eyebrow */}
            <motion.div
              variants={taglineVariants}
              initial={
                reduceMotion
                  ? false
                  : "hidden"
              }
              animate="visible"
              className="
                mb-3
                inline-flex
                items-center
                justify-center
                gap-3

                rounded-full
                border
                border-white/25
                bg-black/10

                px-4
                py-2

                shadow-[0_10px_30px_rgba(0,0,0,0.16)]
                backdrop-blur-md

                sm:mb-4
                sm:px-5
                sm:py-2.5
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-5
                  bg-gradient-to-r
                  from-transparent
                  to-[#D8AE6A]
                  sm:w-8
                "
              />

              <span
                className="
                  font-secondary
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.30em]
                  text-white
                  drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]

                  sm:text-[10px]
                  md:text-[11px]
                  lg:text-[12px]
                "
              >
                Launching
              </span>

              <span
                aria-hidden="true"
                className="
                  h-px
                  w-5
                  bg-gradient-to-l
                  from-transparent
                  to-[#D8AE6A]
                  sm:w-8
                "
              />
            </motion.div>

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
                max-w-[96vw]
                select-none

                font-primary
                text-[clamp(44px,12vw,64px)]
                font-bold
                leading-[0.90]
                tracking-[-0.055em]

                drop-shadow-[0_6px_24px_rgba(0,0,0,0.48)]

                sm:text-[clamp(64px,10vw,88px)]
                md:text-[clamp(76px,9vw,102px)]
                lg:text-[clamp(84px,8vw,112px)]
                xl:text-[clamp(90px,7vw,120px)]

                ${
                  activeSlide.nowrapTitle
                    ? "whitespace-nowrap"
                    : "text-balance"
                }
              `}
            >
              {activeSlide.title}
            </motion.h1>

            {/* Premium divider */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scaleX: 0,
                    }
              }
              animate={{
                opacity: 1,
                scaleX: 1,
              }}
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.7,
                delay: reduceMotion
                  ? 0
                  : 0.22,
                ease,
              }}
              className="
                mt-4
                flex
                origin-center
                items-center
                gap-2

                sm:mt-5
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-gradient-to-r
                  from-transparent
                  to-white/55

                  sm:w-12
                "
              />

              <span
                className="
                  h-[5px]
                  w-[5px]
                  rotate-45
                  bg-[#D8AE6A]
                  shadow-[0_0_12px_rgba(216,174,106,0.65)]
                "
              />

              <span
                className="
                  h-px
                  w-8
                  bg-gradient-to-l
                  from-transparent
                  to-white/55

                  sm:w-12
                "
              />
            </motion.div>

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
                mt-4
                max-w-[330px]

                font-secondary
                text-[11px]
                font-medium
                leading-[1.65]
                tracking-[0.005em]

                drop-shadow-[0_2px_10px_rgba(0,0,0,0.72)]

                sm:max-w-[700px]
                sm:text-[13px]

                md:max-w-[900px]
                md:text-[14px]

                lg:max-w-[1120px]
                lg:text-[15px]
                lg:leading-[1.7]

                xl:max-w-[1220px]
                xl:text-[17px]
              "
            >
              {activeSlide.tagline}
            </motion.p>

            {/* CTA buttons */}
            <div
              className="
                mt-6
                flex
                flex-col
                items-center
                gap-3

                sm:mt-7
                sm:flex-row
                sm:justify-center
                sm:gap-4

                lg:mt-8
              "
            >
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
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.25,
                  ease,
                }}
                className="
                  group
                  inline-flex
                  min-h-[44px]
                  min-w-[170px]
                  items-center
                  justify-center
                  rounded-full

                  border
                  border-[#D8AE6A]
                  bg-[#C79643]

                  px-7
                  py-3

                  font-primary
                  text-[11px]
                  font-semibold
                  text-white
                  no-underline

                  shadow-[0_14px_38px_rgba(0,0,0,0.24)]

                  transition-all
                  duration-300

                  hover:border-white
                  hover:bg-white
                  hover:text-[#835D2B]

                  sm:min-h-[48px]
                  sm:min-w-[190px]
                  sm:text-[12px]

                  md:px-8
                  md:text-[13px]

                  lg:min-h-[52px]
                  lg:min-w-[205px]
                  lg:px-9
                  lg:text-[14px]
                "
              >
                {activeSlide.buttonText}
              </motion.a>

              {/* Download brochure button */}
              <motion.button
                type="button"
                onClick={openBrochureForm}
                variants={
                  secondaryButtonVariants
                }
                initial={
                  reduceMotion
                    ? false
                    : "hidden"
                }
                animate="visible"
                whileHover={{
                  y: -3,
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.25,
                  ease,
                }}
                className="
                  group
                  inline-flex
                  min-h-[44px]
                  min-w-[215px]
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full

                  border
                  border-white/90
                  bg-white

                  px-7
                  py-3

                  font-primary
                  text-[11px]
                  font-semibold
                  text-[#B48742]

                  shadow-[0_14px_38px_rgba(0,0,0,0.20)]

                  transition-all
                  duration-300

                  hover:border-[#C79643]
                  hover:bg-[#C79643]
                  hover:text-white

                  sm:min-h-[48px]
                  sm:min-w-[230px]
                  sm:text-[12px]

                  md:px-8
                  md:text-[13px]

                  lg:min-h-[52px]
                  lg:min-w-[245px]
                  lg:px-9
                  lg:text-[14px]
                "
              >
                <Download
                  size={16}
                  strokeWidth={1.9}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-y-[2px]
                  "
                />

                Download Brochure
              </motion.button>
            </div>
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

      {/* ================================================
          DOWNLOAD BROCHURE MODAL
      ================================================ */}

      {isBrochureOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hero-brochure-title"
          onClick={closeBrochureForm}
          className="
            fixed
            inset-0

            z-[99999]

            flex
            items-center
            justify-center

            overflow-y-auto

            bg-black/60

            px-4
            py-6

            backdrop-blur-sm
          "
        >
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 25,
                    scale: 0.94,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
              ease,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative

              my-auto

              w-full
              max-w-[500px]

              rounded-[22px]

              bg-white

              p-5

              shadow-[0_30px_90px_rgba(0,0,0,0.30)]

              sm:p-7
              md:p-8
            "
          >
            {/* Close */}

            <button
              type="button"
              aria-label="Close download brochure form"
              onClick={closeBrochureForm}
              disabled={isSubmitting}
              className="
                absolute
                right-4
                top-4

                flex
                h-10
                w-10

                items-center
                justify-center

                rounded-full

                bg-[#f7f5f2]

                text-[#444]

                transition-all
                duration-300

                hover:rotate-90
                hover:bg-[#b78949]
                hover:text-white

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={19} />
            </button>

            {/* Modal heading */}

            <div className="pr-12">
              <div
                className="
                  mb-4

                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-[14px]

                  bg-[#faf7f1]

                  text-[#b78949]
                "
              >
                <FileText
                  size={22}
                  strokeWidth={1.8}
                />
              </div>

              <p
                className="
                  mb-2

                  font-secondary

                  text-[10px]
                  font-semibold

                  uppercase

                  tracking-[0.18em]

                  text-[#b78949]
                "
              >
                Project Brochure
              </p>

              <h2
                id="hero-brochure-title"
                className="
                  font-primary

                  text-[24px]
                  font-semibold

                  text-[#17213b]

                  sm:text-[28px]
                "
              >
                Download Brochure
              </h2>

              <p
                className="
                  mt-2

                  max-w-[390px]

                  font-secondary

                  text-[12px]
                  leading-6

                  text-[#777]
                "
              >
                Enter your details below and the
                brochure will download instantly.
              </p>
            </div>

            {/* Form */}

            <form
              onSubmit={handleBrochureSubmit}
              className="mt-6 space-y-4"
            >
              {/* Name */}

              <div>
                <label
                  htmlFor="hero-brochure-name"
                  className="
                    mb-1.5
                    block

                    text-[12px]
                    font-medium

                    text-[#444]
                  "
                >
                  Name
                </label>

                <input
                  id="hero-brochure-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={
                    handleFormChange
                  }
                  placeholder="Enter your name"
                  className="
                    h-12
                    w-full

                    rounded-[10px]

                    border
                    border-[#e7e3dc]

                    bg-white

                    px-4

                    text-[13px]

                    text-[#222]

                    outline-none

                    transition-all

                    placeholder:text-[#aaa]

                    focus:border-[#b78949]
                    focus:ring-4
                    focus:ring-[#b78949]/10
                  "
                />
              </div>

              {/* Phone */}

              <div>
                <label
                  htmlFor="hero-brochure-phone"
                  className="
                    mb-1.5
                    block

                    text-[12px]
                    font-medium

                    text-[#444]
                  "
                >
                  Phone Number
                </label>

                <input
                  id="hero-brochure-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  disabled={isSubmitting}
                  value={formData.phone}
                  onChange={
                    handleFormChange
                  }
                  placeholder="Enter your phone number"
                  className="
                    h-12
                    w-full

                    rounded-[10px]

                    border
                    border-[#e7e3dc]

                    px-4

                    text-[13px]

                    text-[#222]

                    outline-none

                    transition-all

                    placeholder:text-[#aaa]

                    focus:border-[#b78949]
                    focus:ring-4
                    focus:ring-[#b78949]/10
                  "
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="hero-brochure-email"
                  className="
                    mb-1.5
                    block

                    text-[12px]
                    font-medium

                    text-[#444]
                  "
                >
                  Email Address
                </label>

                <input
                  id="hero-brochure-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={
                    handleFormChange
                  }
                  placeholder="Enter your email address"
                  className="
                    h-12
                    w-full

                    rounded-[10px]

                    border
                    border-[#e7e3dc]

                    px-4

                    text-[13px]

                    text-[#222]

                    outline-none

                    transition-all

                    placeholder:text-[#aaa]

                    focus:border-[#b78949]
                    focus:ring-4
                    focus:ring-[#b78949]/10
                  "
                />
              </div>

              {/* Status */}

              {statusMessage && (
                <div
                  role={
                    submissionStatus ===
                    "error"
                      ? "alert"
                      : "status"
                  }
                  className={`
                    rounded-[10px]
                    border

                    px-4
                    py-3

                    text-[12px]
                    leading-5

                    ${
                      submissionStatus ===
                      "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }
                  `}
                >
                  {statusMessage}
                </div>
              )}

              {/* Submit */}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{
                  scale: isSubmitting
                    ? 1
                    : 0.98,
                }}
                className="
                  flex
                  h-12
                  w-full

                  items-center
                  justify-center

                  gap-2

                  rounded-[10px]

                  bg-[#b78949]

                  px-5

                  font-primary

                  text-[13px]
                  font-semibold

                  text-white

                  transition-all
                  duration-300

                  hover:bg-[#9f7134]

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4

                        animate-spin

                        rounded-full

                        border-2
                        border-white/30

                        border-t-white
                      "
                    />

                    Submitting...
                  </>
                ) : (
                  <>
                    <Download
                      size={16}
                      strokeWidth={1.8}
                    />

                    Download Brochure
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}