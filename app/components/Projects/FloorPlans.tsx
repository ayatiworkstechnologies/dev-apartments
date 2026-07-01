"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type FloorPlan = {
  id: number;
  title: string;
  area: string;
  image: string;
  href: string;
  imagePosition?: string;
};

const floorPlans: FloorPlan[] = [
  {
    id: 1,
    title: "2BHK Variant A",
    area: "1,240 Sq.Ft",
    image: "/images/2bhk-variant-a.png",
    href: "#",
  },
  {
    id: 2,
    title: "3BHK Variant B",
    area: "1,850 Sq.Ft",
    image: "/images/3bhk-variant-b.png",
    href: "#",
  },
  {
    id: 3,
    title: "3BHK Penthouse",
    area: "2,400 Sq.Ft",
    image: "/images/3bhk-penthouse.png",
    href: "#",
  },
];

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

export default function FloorPlans() {
  const reduceMotion = useReducedMotion();

  const [selectedPlan, setSelectedPlan] =
    useState<FloorPlan | null>(null);

  const [zoom, setZoom] = useState(MIN_ZOOM);

  const openPlanPopup = (plan: FloorPlan) => {
    setZoom(MIN_ZOOM);
    setSelectedPlan(plan);
  };

  const closePlanPopup = () => {
    setSelectedPlan(null);
    setZoom(MIN_ZOOM);
  };

  const zoomIn = () => {
    setZoom((currentZoom) =>
      Math.min(
        Number((currentZoom + ZOOM_STEP).toFixed(2)),
        MAX_ZOOM,
      ),
    );
  };

  const zoomOut = () => {
    setZoom((currentZoom) =>
      Math.max(
        Number((currentZoom - ZOOM_STEP).toFixed(2)),
        MIN_ZOOM,
      ),
    );
  };

  const resetZoom = () => {
    setZoom(MIN_ZOOM);
  };

  useEffect(() => {
    if (!selectedPlan) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePlanPopup();
      }

      if (event.key === "+" || event.key === "=") {
        zoomIn();
      }

      if (event.key === "-") {
        zoomOut();
      }

      if (event.key === "0") {
        resetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPlan]);

  return (
    <>
      <section
        id="floor-plans"
        className="
          relative w-full overflow-hidden
          bg-[#f8f5ef]
          px-4 py-16
          sm:px-6 sm:py-20
          md:px-8 md:py-24
          lg:px-12 lg:py-28
          xl:px-16
        "
      >
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-40 top-20
            h-[360px] w-[360px]
            rounded-full bg-[#c39858]/[0.04]
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-40 bottom-0
            h-[420px] w-[420px]
            rounded-full bg-[#c39858]/[0.04]
            blur-3xl
          "
        />

        <div className="relative z-10 mx-auto w-full max-w-[1450px]">
          {/* Section heading */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 35,
                    scale: 0.97,
                    filter: "blur(8px)",
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease,
            }}
            className="mx-auto max-w-[720px] text-center"
          >
            <h2
              className="
                font-serif font-semibold
                leading-[1.1]
                tracking-[-0.035em]
                text-[#1d2945]

                text-[32px]
                sm:text-[40px]
                md:text-[48px]
                lg:text-[54px]
              "
            >
              Spacious Floor Plans
            </h2>

            <motion.p
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 14,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : 0.18,
                ease,
              }}
              className="
                mx-auto mt-3 max-w-[600px]
                font-sans
                text-[11px] leading-[1.7]
                text-[#a5a29d]

                sm:text-[12px]
                md:text-[13px]
              "
            >
              Designed for growing families who value privacy and thoughtful
              distribution of space.
            </motion.p>

            <motion.span
              initial={{
                scaleX: reduceMotion ? 1 : 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : 0.3,
                ease,
              }}
              className="
                mx-auto mt-4 block
                h-[2px] w-[52px]
                origin-center
                bg-[#bf8c48]

                sm:w-[64px]
              "
            />
          </motion.div>

          {/* Floor plan cards */}
          <motion.div
            variants={
              reduceMotion ? undefined : containerVariants
            }
            initial={reduceMotion ? false : "hidden"}
            whileInView={
              reduceMotion ? undefined : "visible"
            }
            viewport={{
              once: true,
              amount: 0.12,
            }}
            className="
              mt-12 grid
              grid-cols-1 gap-6

              sm:mt-14
              md:grid-cols-2

              lg:mt-16
              lg:gap-7

              xl:grid-cols-3
              xl:gap-8
            "
          >
            {floorPlans.map((plan) => (
              <motion.article
                key={plan.id}
                variants={
                  reduceMotion ? undefined : cardVariants
                }
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -10,
                        scale: 1.01,
                        boxShadow:
                          "0 26px 70px rgba(48, 40, 30, 0.13)",
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 22,
                }}
                className="
                  group relative
                  overflow-hidden
                  rounded-[22px]
                  border border-[#ebe8e2]
                  bg-white
                  shadow-[0_12px_40px_rgba(50,45,38,0.055)]

                  sm:rounded-[24px]
                "
              >
                {/* Gold hover line */}
                <span
                  className="
                    absolute left-0 top-0 z-20
                    h-[3px] w-0
                    bg-[#c08b48]
                    transition-all duration-500
                    group-hover:w-full
                  "
                />

                {/* Clickable floor plan image */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${plan.title} floor plan`}
                  onClick={() => openPlanPopup(plan)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      openPlanPopup(plan);
                    }
                  }}
                  className="
                    relative
                    h-[260px] w-full
                    cursor-zoom-in
                    overflow-hidden
                    bg-white
                    outline-none

                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-[#c08b48]

                    sm:h-[290px]
                    md:h-[270px]
                    lg:h-[310px]
                    xl:h-[330px]
                  "
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1.04,
                          }
                    }
                    transition={{
                      duration: 0.7,
                      ease,
                    }}
                  >
                    <Image
                      src={plan.image}
                      alt={`${plan.title} floor plan`}
                      fill
                      sizes="
                        (max-width: 767px) 100vw,
                        (max-width: 1279px) 50vw,
                        33vw
                      "
                      className="
                        select-none
                        object-contain
                        object-center
                        p-5

                        sm:p-7
                        lg:p-8
                      "
                      draggable={false}
                    />
                  </motion.div>

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute inset-0
                      bg-gradient-to-b
                      from-transparent
                      via-transparent
                      to-[#f8f5ef]/20
                    "
                  />
                </div>

                {/* Card content */}
                <div
                  className="
                    relative
                    px-5 pb-6 pt-3

                    sm:px-6
                    sm:pb-7

                    lg:px-7
                    lg:pb-8
                  "
                >
                  <div
                    className="
                      flex items-center
                      justify-between gap-4
                    "
                  >
                    <h3
                      className="
                        min-w-0
                        font-serif font-semibold
                        leading-tight
                        tracking-[-0.025em]
                        text-[#252525]

                        text-[20px]
                        sm:text-[22px]
                        lg:text-[24px]
                      "
                    >
                      {plan.title}
                    </h3>

                    <span
                      className="
                        shrink-0
                        rounded-full
                        bg-[#fbf5e9]
                        px-3 py-1.5
                        font-sans font-medium
                        text-[#c4924f]

                        text-[9px]
                        sm:text-[10px]
                        lg:text-[11px]
                      "
                    >
                      {plan.area}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openPlanPopup(plan)}
                    className="
                      mt-4 inline-flex
                      items-center gap-2
                      font-sans font-semibold
                      text-[#ff6a28]

                      text-[10px]
                      sm:text-[11px]

                      transition-colors
                      duration-300

                      hover:text-[#d84c10]
                    "
                    aria-label={`View ${plan.title} layout details`}
                  >
                    <span>View Layout Details</span>

                    <ArrowRight
                      size={15}
                      strokeWidth={2}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1.5
                      "
                    />
                  </button>
                </div>

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute -bottom-20 -right-20
                    h-40 w-40
                    scale-0 rounded-full
                    bg-[#c08b48]/[0.06]
                    transition-transform
                    duration-500
                    group-hover:scale-100
                  "
                />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Floor plan popup */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="floor-plan-popup-title"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.25,
            }}
            onClick={closePlanPopup}
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              bg-black/75 p-2
              backdrop-blur-sm

              sm:p-5
              lg:p-7
            "
          >
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 28,
                      scale: 0.96,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      y: 20,
                      scale: 0.97,
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                relative flex
                h-[94vh] w-full
                max-w-[1250px]
                flex-col overflow-hidden
                rounded-[16px]
                bg-white
                shadow-[0_30px_100px_rgba(0,0,0,0.4)]

                sm:h-[92vh]
                sm:rounded-[24px]
              "
            >
              {/* Popup header */}
              <div
                className="
                  relative z-30
                  flex shrink-0 items-center
                  justify-between gap-4
                  border-b border-[#ebe8e2]
                  bg-white
                  px-4 py-3

                  sm:px-6 sm:py-4
                "
              >
                <div className="min-w-0">
                  <h3
                    id="floor-plan-popup-title"
                    className="
                      truncate
                      font-serif font-semibold
                      text-[17px]
                      text-[#252525]

                      sm:text-[22px]
                    "
                  >
                    {selectedPlan.title}
                  </h3>

                  <p
                    className="
                      mt-0.5
                      font-sans font-medium
                      text-[10px]
                      text-[#c4924f]

                      sm:text-[11px]
                    "
                  >
                    {selectedPlan.area}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closePlanPopup}
                  aria-label="Close floor plan popup"
                  className="
                    inline-flex h-10 w-10
                    shrink-0 items-center
                    justify-center rounded-full
                    border border-[#ebe8e2]
                    bg-[#f8f5ef]
                    text-[#252525]
                    transition duration-300

                    hover:rotate-90
                    hover:border-[#c08b48]
                    hover:bg-[#c08b48]
                    hover:text-white

                    sm:h-11 sm:w-11
                  "
                >
                  <X size={19} strokeWidth={2} />
                </button>
              </div>

              {/* Zoomable image area */}
              <div
                className="
                  relative flex-1
                  overflow-auto
                  bg-[#f7f5f1]
                  overscroll-contain
                "
              >
                <div
                  className="
                    flex min-h-full min-w-full
                    items-center justify-center
                    p-3

                    sm:p-6
                    lg:p-8
                  "
                >
                  <motion.div
                    animate={{
                      scale: zoom,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.25,
                      ease,
                    }}
                    style={{
                      transformOrigin: "center center",
                    }}
                    className="
                      relative
                      h-[65vh]
                      w-[90vw]
                      max-w-[1050px]
                      shrink-0

                      sm:h-[68vh]
                      sm:w-[82vw]

                      lg:h-[70vh]
                      lg:w-[75vw]
                    "
                  >
                    <Image
                      src={selectedPlan.image}
                      alt={`${selectedPlan.title} enlarged floor plan`}
                      fill
                      priority
                      sizes="100vw"
                      className="
                        select-none
                        object-contain
                        object-center
                      "
                      draggable={false}
                    />
                  </motion.div>
                </div>

                {/* Zoom control */}
                <div
                  className="
                    sticky bottom-3 z-40
                    ml-auto mr-3
                    flex w-fit items-center
                    overflow-hidden
                    rounded-full
                    border border-white/70
                    bg-[#1d2945]/95
                    p-1
                    text-white
                    shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                    backdrop-blur-md

                    sm:bottom-5
                    sm:mr-5
                    sm:p-1.5
                  "
                >
                  <button
                    type="button"
                    onClick={zoomOut}
                    disabled={zoom <= MIN_ZOOM}
                    aria-label="Zoom out"
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      transition duration-200

                      hover:bg-white/15
                      active:scale-90

                      disabled:cursor-not-allowed
                      disabled:opacity-35

                      sm:h-10 sm:w-10
                    "
                  >
                    <Minus
                      size={17}
                      strokeWidth={2.4}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={resetZoom}
                    aria-label="Reset zoom"
                    title="Reset zoom"
                    className="
                      flex h-9 min-w-[58px]
                      items-center justify-center
                      gap-1 rounded-full
                      px-2
                      font-sans text-[10px]
                      font-semibold
                      transition duration-200

                      hover:bg-white/15
                      active:scale-95

                      sm:h-10
                      sm:min-w-[72px]
                      sm:text-[11px]
                    "
                  >
                    <RotateCcw
                      size={13}
                      strokeWidth={2}
                      className="
                        hidden sm:block
                      "
                    />

                    {Math.round(zoom * 100)}%
                  </button>

                  <button
                    type="button"
                    onClick={zoomIn}
                    disabled={zoom >= MAX_ZOOM}
                    aria-label="Zoom in"
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      transition duration-200

                      hover:bg-white/15
                      active:scale-90

                      disabled:cursor-not-allowed
                      disabled:opacity-35

                      sm:h-10 sm:w-10
                    "
                  >
                    <Plus
                      size={17}
                      strokeWidth={2.4}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}