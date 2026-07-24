"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

type FloorPlan = {
  id: number;
  line1: string;
  line2?: string;
  area?: string;
  image: string;
  imagePosition?: string;
};

const floorPlans: FloorPlan[] = [
  {
    id: 1,
    line1: "SCHEME 03 - Plot 01",
    line2: "TYPE A - Plot 01 to Plot 04",
    area: "Total Area = 2281 sqft",
    image: "/images/floor-plans/floor-plan-01.png",
  },
  {
    id: 2,
    line1: "SCHEME 03 - Plot 01",
    line2: "TYPE A - Plot 01 to Plot 04",
    image: "/images/floor-plans/floor-plan-02.png",
  },
  {
    id: 3,
    line1: "SCHEME 03 - Plot 01",
    line2: "TYPE A - Plot 01 to Plot 04",
    image: "/images/floor-plans/floor-plan-03.png",
  },
  {
    id: 4,
    line1: "SCHEME 03 - PLOT 05",
    image: "/images/floor-plans/floor-plan-04.png",
  },
  {
    id: 5,
    line1: "SCHEME 03",
    line2: "TYPE B - Plot 05",
    area: "Total Area = 2202 sqft",
    image: "/images/floor-plans/floor-plan-05.png",
  },
  {
    id: 6,
    line1: "SCHEME 03",
    line2: "TYPE C - Plot 06 TO Plot 09",
    area: "Total Area = 1849 sqft",
    image: "/images/floor-plans/floor-plan-06.png",
  },
  {
    id: 7,
    line1: "SCHEME 03 - PLOT 05",
    image: "/images/floor-plans/floor-plan-07.png",
  },
  {
    id: 8,
    line1: "SCHEME 03 - PLOT 09",
    image: "/images/floor-plans/floor-plan-08.png",
  },
  {
    id: 9,
    line1: "SCHEME 03 - PLOT 09",
    image: "/images/floor-plans/floor-plan-09.png",
  },
  {
    id: 10,
    line1: "SCHEME 03",
    line2: "TYPE D - Plot 10",
    area: "Total Area = 1898 sqft",
    image: "/images/floor-plans/floor-plan-10.png",
  },
  {
    id: 11,
    line1: "SCHEME 03 - PLOT 10",
    image: "/images/floor-plans/floor-plan-11.png",
  },
  {
    id: 12,
    line1: "SCHEME 03 - PLOT 10",
    image: "/images/floor-plans/floor-plan-12.png",
  },
  {
    id: 13,
    line1: "SCHEME 01",
    line2: "TYPE 06 - Plot 12",
    image: "/images/floor-plans/floor-plan-13.png",
  },
  {
    id: 14,
    line1: "SCHEME 01",
    line2: "TYPE F - Plot 12",
    image: "/images/floor-plans/floor-plan-14.png",
  },
  {
    id: 15,
    line1: "SCHEME 01",
    line2: "TYPE 06 - Plot 12",
    area: "Total Area = 3166 sqft",
    image: "/images/floor-plans/floor-plan-15.png",
  },
  {
    id: 16,
    line1: "SCHEME 01",
    line2: "TYPE E - Plot 11",
    image: "/images/floor-plans/floor-plan-16.png",
  },
  {
    id: 17,
    line1: "SCHEME 01",
    line2: "TYPE E - Plot 11",
    image: "/images/floor-plans/floor-plan-17.png",
  },
  {
    id: 18,
    line1: "SCHEME 01",
    line2: "TYPE E - Plot 11",
    area: "Total Area = 3360 sqft",
    image: "/images/floor-plans/floor-plan-18.png",
  },
];

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;
const AUTO_PLAY_DELAY = 3500;

const getItemsPerView = () => {
  if (typeof window === "undefined") {
    return 1;
  }

  if (window.innerWidth >= 1280) {
    return 3;
  }

  if (window.innerWidth >= 768) {
    return 2;
  }

  return 1;
};

export default function FloorPlans() {
  const reduceMotion = useReducedMotion();

  const sliderRef = useRef<HTMLDivElement>(null);

  const [selectedPlan, setSelectedPlan] =
    useState<FloorPlan | null>(null);

  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [activeIndex, setActiveIndex] = useState(0);

  const [
    canScrollPrevious,
    setCanScrollPrevious,
  ] = useState(false);

  const [canScrollNext, setCanScrollNext] =
    useState(true);

  const [isSliderPaused, setIsSliderPaused] =
    useState(false);

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
        Number(
          (currentZoom + ZOOM_STEP).toFixed(2),
        ),
        MAX_ZOOM,
      ),
    );
  };

  const zoomOut = () => {
    setZoom((currentZoom) =>
      Math.max(
        Number(
          (currentZoom - ZOOM_STEP).toFixed(2),
        ),
        MIN_ZOOM,
      ),
    );
  };

  const resetZoom = () => {
    setZoom(MIN_ZOOM);
  };

  const scrollToIndex = useCallback(
    (requestedIndex: number) => {
      const slider = sliderRef.current;

      if (!slider) {
        return;
      }

      const cards = Array.from(
        slider.children,
      ) as HTMLElement[];

      if (!cards.length) {
        return;
      }

      const visibleItems = getItemsPerView();

      const maximumIndex = Math.max(
        0,
        floorPlans.length - visibleItems,
      );

      const safeIndex = Math.max(
        0,
        Math.min(requestedIndex, maximumIndex),
      );

      const selectedCard = cards[safeIndex];

      if (!selectedCard) {
        return;
      }

      slider.scrollTo({
        left: selectedCard.offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion],
  );

  const goToPreviousSlide = useCallback(() => {
    const visibleItems = getItemsPerView();

    scrollToIndex(
      activeIndex - visibleItems,
    );
  }, [activeIndex, scrollToIndex]);

  const goToNextSlide = useCallback(() => {
    const visibleItems = getItemsPerView();

    scrollToIndex(
      activeIndex + visibleItems,
    );
  }, [activeIndex, scrollToIndex]);

  const updateSliderState = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const cards = Array.from(
      slider.children,
    ) as HTMLElement[];

    if (!cards.length) {
      return;
    }

    const visibleItems = getItemsPerView();

    const maximumFirstIndex = Math.max(
      0,
      floorPlans.length - visibleItems,
    );

    let nearestIndex = 0;
    let nearestDistance =
      Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.offsetLeft - slider.scrollLeft,
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    const safeActiveIndex = Math.min(
      nearestIndex,
      maximumFirstIndex,
    );

    const maximumScroll =
      slider.scrollWidth - slider.clientWidth;

    setActiveIndex(safeActiveIndex);

    setCanScrollPrevious(
      slider.scrollLeft > 4,
    );

    setCanScrollNext(
      slider.scrollLeft < maximumScroll - 4,
    );
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    let animationFrame = 0;

    const handleSliderScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(
        updateSliderState,
      );
    };

    const resizeObserver = new ResizeObserver(
      () => {
        updateSliderState();
      },
    );

    slider.addEventListener(
      "scroll",
      handleSliderScroll,
      {
        passive: true,
      },
    );

    resizeObserver.observe(slider);

    updateSliderState();

    return () => {
      cancelAnimationFrame(animationFrame);

      slider.removeEventListener(
        "scroll",
        handleSliderScroll,
      );

      resizeObserver.disconnect();
    };
  }, [updateSliderState]);

  useEffect(() => {
    if (
      reduceMotion ||
      isSliderPaused ||
      selectedPlan
    ) {
      return;
    }

    const autoplayTimer = window.setInterval(
      () => {
        if (canScrollNext) {
          const visibleItems =
            getItemsPerView();

          scrollToIndex(
            activeIndex + visibleItems,
          );
        } else {
          scrollToIndex(0);
        }
      },
      AUTO_PLAY_DELAY,
    );

    return () => {
      window.clearInterval(autoplayTimer);
    };
  }, [
    activeIndex,
    canScrollNext,
    isSliderPaused,
    reduceMotion,
    scrollToIndex,
    selectedPlan,
  ]);

  useEffect(() => {
    if (!selectedPlan) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setSelectedPlan(null);
        setZoom(MIN_ZOOM);
      }

      if (
        event.key === "+" ||
        event.key === "="
      ) {
        setZoom((currentZoom) =>
          Math.min(
            Number(
              (
                currentZoom + ZOOM_STEP
              ).toFixed(2),
            ),
            MAX_ZOOM,
          ),
        );
      }

      if (event.key === "-") {
        setZoom((currentZoom) =>
          Math.max(
            Number(
              (
                currentZoom - ZOOM_STEP
              ).toFixed(2),
            ),
            MIN_ZOOM,
          ),
        );
      }

      if (event.key === "0") {
        setZoom(MIN_ZOOM);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
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
            pointer-events-none absolute
            -left-40 top-20
            h-[360px] w-[360px]
            rounded-full
            bg-[#c39858]/[0.05]
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-40 bottom-0
            h-[420px] w-[420px]
            rounded-full
            bg-[#c39858]/[0.05]
            blur-3xl
          "
        />

        <div
          className="
            relative z-10
            mx-auto w-full
            max-w-[1450px]
          "
        >
          {/* Heading and navigation */}
          <div
            className="
              flex flex-col gap-8
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
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
                duration: reduceMotion
                  ? 0
                  : 0.8,
                ease,
              }}
              className="max-w-[720px]"
            >
              <h2
                className="
                  font-serif
                  text-[32px]
                  font-semibold
                  leading-[1.1]
                  tracking-[-0.035em]
                  text-[#1d2945]
                  sm:text-[40px]
                  md:text-[48px]
                  lg:text-[54px]
                "
              >
                Thoughtfully Designed Layouts
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
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0
                    : 0.65,
                  delay: reduceMotion
                    ? 0
                    : 0.18,
                  ease,
                }}
                className="
                  mt-3 max-w-[600px]
                  font-sans
                  text-[11px]
                  leading-[1.7]
                  text-[#a5a29d]
                  sm:text-[12px]
                  md:text-[13px]
                "
              >
                Spacious villa plans crafted to
                maximize comfort, privacy, and
                everyday functionality
              </motion.p>

              <motion.span
                initial={{
                  scaleX: reduceMotion ? 1 : 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0
                    : 0.7,
                  delay: reduceMotion
                    ? 0
                    : 0.3,
                  ease,
                }}
                className="
                  mt-4 block h-[2px]
                  w-[52px] origin-left
                  bg-[#bf8c48]
                  sm:w-[64px]
                "
              />
            </motion.div>

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 30,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.7,
                delay: reduceMotion
                  ? 0
                  : 0.25,
                ease,
              }}
              className="
                flex items-center
                justify-between gap-5
                md:justify-end
              "
            >
              <div
                aria-live="polite"
                className="
                  min-w-[74px]
                  font-sans
                  text-[11px]
                  font-semibold
                  tracking-[0.12em]
                  text-[#817d77]
                "
              >
                {String(
                  activeIndex + 1,
                ).padStart(2, "0")}

                <span
                  className="
                    mx-2 text-[#c8c2b9]
                  "
                >
                  /
                </span>

                {String(
                  floorPlans.length,
                ).padStart(2, "0")}
              </div>

              <div
                className="
                  flex items-center gap-2
                "
              >
                <button
                  type="button"
                  onClick={goToPreviousSlide}
                  disabled={!canScrollPrevious}
                  aria-label="View previous floor plans"
                  className="
                    inline-flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    border border-[#ded9d0]
                    bg-white
                    text-[#1d2945]
                    shadow-[0_8px_25px_rgba(40,35,28,0.06)]
                    transition duration-300
                    hover:border-[#bf8c48]
                    hover:bg-[#bf8c48]
                    hover:text-white
                    active:scale-90
                    disabled:cursor-not-allowed
                    disabled:opacity-35
                    sm:h-12 sm:w-12
                  "
                >
                  <ChevronLeft
                    size={19}
                    strokeWidth={1.8}
                  />
                </button>

                <button
                  type="button"
                  onClick={goToNextSlide}
                  disabled={!canScrollNext}
                  aria-label="View next floor plans"
                  className="
                    inline-flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    border border-[#1d2945]
                    bg-[#1d2945]
                    text-white
                    shadow-[0_10px_30px_rgba(29,41,69,0.18)]
                    transition duration-300
                    hover:border-[#bf8c48]
                    hover:bg-[#bf8c48]
                    active:scale-90
                    disabled:cursor-not-allowed
                    disabled:opacity-35
                    sm:h-12 sm:w-12
                  "
                >
                  <ChevronRight
                    size={19}
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Slider */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 45,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: reduceMotion
                ? 0
                : 0.8,
              delay: reduceMotion
                ? 0
                : 0.2,
              ease,
            }}
            className="
              mt-12
              sm:mt-14
              lg:mt-16
            "
          >
            <div
              ref={sliderRef}
              onMouseEnter={() =>
                setIsSliderPaused(true)
              }
              onMouseLeave={() =>
                setIsSliderPaused(false)
              }
              onTouchStart={() =>
                setIsSliderPaused(true)
              }
              onTouchEnd={() =>
                setIsSliderPaused(false)
              }
              onTouchCancel={() =>
                setIsSliderPaused(false)
              }
              className="
                relative flex items-stretch
                snap-x snap-mandatory
                gap-5 overflow-x-auto
                scroll-smooth pb-6
                touch-pan-x
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
                md:gap-6
                xl:gap-8
              "
            >
              {floorPlans.map(
                (plan, index) => (
                  <motion.article
                    key={plan.id}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 50,
                            scale: 0.97,
                            filter:
                              "blur(7px)",
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
                      amount: 0.25,
                    }}
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : 0.75,
                      delay: reduceMotion
                        ? 0
                        : (index % 3) *
                          0.08,
                      ease,
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -8,
                            boxShadow:
                              "0 28px 70px rgba(48,40,30,0.13)",
                          }
                    }
                    className="
                      group relative flex
                      self-stretch
                      shrink-0 snap-start
                      basis-[92%]
                      flex-col overflow-hidden
                      rounded-[22px]
                      border border-[#ebe8e2]
                      bg-white
                      shadow-[0_12px_40px_rgba(50,45,38,0.06)]
                      sm:rounded-[24px]
                      md:basis-[calc((100%_-_24px)/2)]
                      xl:basis-[calc((100%_-_64px)/3)]
                    "
                  >
                    {/* Hover line */}
                    <span
                      aria-hidden="true"
                      className="
                        absolute left-0 top-0
                        z-20 h-[3px] w-0
                        bg-[#c08b48]
                        transition-all
                        duration-500
                        group-hover:w-full
                      "
                    />

                    {/* Image */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${plan.line1} floor plan`}
                      onClick={() =>
                        openPlanPopup(plan)
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key ===
                            "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();

                          openPlanPopup(plan);
                        }
                      }}
                      className="
                        relative h-[300px]
                        w-full shrink-0
                        cursor-zoom-in
                        overflow-hidden
                        bg-white outline-none
                        focus-visible:ring-2
                        focus-visible:ring-inset
                        focus-visible:ring-[#c08b48]
                        sm:h-[320px]
                        xl:h-[340px]
                      "
                    >
                      <motion.div
                        className="
                          absolute inset-0
                        "
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                scale: 1.045,
                              }
                        }
                        transition={{
                          duration: 0.75,
                          ease,
                        }}
                      >
                        <Image
                          src={plan.image}
                          alt={`${plan.line1} floor plan`}
                          fill
                          priority={index < 3}
                          sizes="
                            (max-width: 767px) 92vw,
                            (max-width: 1279px) 50vw,
                            33vw
                          "
                          className="
                            select-none
                            object-contain
                            object-center p-5
                            sm:p-7
                            lg:p-8
                          "
                          style={{
                            objectPosition:
                              plan.imagePosition ??
                              "center",
                          }}
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
                          to-[#f8f5ef]/35
                        "
                      />

                      {/* Plan number */}
                      <span
                        className="
                          absolute left-4 top-4
                          z-10 inline-flex
                          h-9 min-w-9
                          items-center justify-center
                          rounded-full
                          border border-[#c08b48]/20
                          bg-white/90 px-2
                          font-sans
                          text-[10px]
                          font-semibold
                          text-[#c08b48]
                          shadow-sm
                          backdrop-blur-sm
                        "
                      >
                        {String(
                          plan.id,
                        ).padStart(2, "0")}
                      </span>

                      {/* View plan label */}
                      <span
                        className="
                          absolute bottom-4
                          right-4 z-10
                          rounded-full
                          border border-white/60
                          bg-[#1d2945]/90
                          px-3 py-1.5
                          font-sans
                          text-[9px]
                          font-semibold
                          tracking-[0.08em]
                          text-white
                          opacity-0
                          backdrop-blur-md
                          transition-all
                          duration-300
                          group-hover:opacity-100
                        "
                      >
                        VIEW PLAN
                      </span>
                    </div>

                    {/* Equal-height card content */}
                    <div
                      className="
                        relative flex flex-1
                        flex-col
                        px-5 pb-6 pt-5
                        sm:px-6 sm:pb-7
                        lg:px-7 lg:pb-8
                      "
                    >
                      {/* Fixed title slot */}
                      <h3
                        className="
                          min-h-[29px]
                          font-serif
                          text-[19px]
                          font-semibold
                          leading-[1.25]
                          tracking                          leading-[1.25]
                          tracking-[-0.025em]
                          text-[#252525]
                          sm:min-h-[32px]
                          sm:text-[21px]
                          lg:min-h-[35px]
                          lg:text-[23px]
                        "
                      >
                        {plan.line1}
                      </h3>

                      {/* Fixed subtitle slot */}
                      <div
                        className="
                          mt-1 min-h-[42px]
                          sm:min-h-[44px]
                        "
                      >
                        {plan.line2 && (
                          <p
                            className="
                              mt-1 font-sans
                              text-[11px]
                              font-medium
                              leading-[1.55]
                              text-[#66625f]
                              sm:text-[12px]
                              lg:text-[13px]
                            "
                          >
                            {plan.line2}
                          </p>
                        )}
                      </div>

                      {/* Fixed area slot */}
                      <div
                        className="
                          min-h-[32px]
                        "
                      >
                        {plan.area && (
                          <span
                            className="
                              inline-flex
                              rounded-full
                              bg-[#fbf5e9]
                              px-3 py-1.5
                              font-sans
                              text-[9px]
                              font-medium
                              text-[#c4924f]
                              sm:text-[10px]
                              lg:text-[11px]
                            "
                          >
                            {plan.area}
                          </span>
                        )}
                      </div>

                      {/* Bottom-aligned button */}
                      <button
                        type="button"
                        onClick={() =>
                          openPlanPopup(plan)
                        }
                        aria-label={`View ${plan.line1} layout details`}
                        className="
                          mt-4 inline-flex
                          w-fit items-center
                          gap-2
                          font-sans
                          text-[10px]
                          font-semibold
                          text-[#ff6a28]
                          transition-colors
                          duration-300
                          hover:text-[#d84c10]
                          sm:text-[11px]
                        "
                      >
                        <span>
                          View Layout Details
                        </span>

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

                    {/* Hover decoration */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute -bottom-20
                        -right-20 h-40 w-40
                        scale-0 rounded-full
                        bg-[#c08b48]/[0.07]
                        transition-transform
                        duration-500
                        group-hover:scale-100
                      "
                    />
                  </motion.article>
                ),
              )}
            </div>
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
              duration: reduceMotion
                ? 0
                : 0.25,
            }}
            onClick={closePlanPopup}
            className="
              fixed inset-0 z-[9999]
              flex items-center
              justify-center
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
                duration: reduceMotion
                  ? 0
                  : 0.35,
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
                  flex shrink-0
                  items-center
                  justify-between gap-4
                  border-b
                  border-[#ebe8e2]
                  bg-white px-4 py-3
                  sm:px-6 sm:py-4
                "
              >
                <div className="min-w-0">
                  <h3
                    id="floor-plan-popup-title"
                    className="
                      font-serif
                      text-[16px]
                      font-semibold
                      leading-tight
                      text-[#252525]
                      sm:text-[21px]
                    "
                  >
                    {selectedPlan.line1}
                  </h3>

                  {selectedPlan.line2 && (
                    <p
                      className="
                        mt-1 font-sans
                        text-[10px]
                        font-medium
                        text-[#66625f]
                        sm:text-[12px]
                      "
                    >
                      {selectedPlan.line2}
                    </p>
                  )}

                  {selectedPlan.area && (
                    <p
                      className="
                        mt-1 font-sans
                        text-[10px]
                        font-medium
                        text-[#c4924f]
                        sm:text-[11px]
                      "
                    >
                      {selectedPlan.area}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={closePlanPopup}
                  aria-label="Close floor plan popup"
                  className="
                    inline-flex h-10 w-10
                    shrink-0 items-center
                    justify-center
                    rounded-full
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
                  <X
                    size={19}
                    strokeWidth={2}
                  />
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
                    flex min-h-full
                    min-w-full
                    items-center
                    justify-center
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
                      duration: reduceMotion
                        ? 0
                        : 0.25,
                      ease,
                    }}
                    style={{
                      transformOrigin:
                        "center center",
                    }}
                    className="
                      relative h-[65vh]
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
                      alt={`${selectedPlan.line1} enlarged floor plan`}
                      fill
                      priority
                      sizes="100vw"
                      className="
                        select-none
                        object-contain
                        object-center
                      "
                      style={{
                        objectPosition:
                          selectedPlan.imagePosition ??
                          "center",
                      }}
                      draggable={false}
                    />
                  </motion.div>
                </div>

                {/* Zoom controls */}
                <div
                  className="
                    sticky bottom-3 z-40
                    ml-auto mr-3
                    flex w-fit
                    items-center
                    overflow-hidden
                    rounded-full
                    border border-white/70
                    bg-[#1d2945]/95
                    p-1 text-white
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
                    disabled={
                      zoom <= MIN_ZOOM
                    }
                    aria-label="Zoom out"
                    className="
                      flex h-9 w-9
                      items-center
                      justify-center
                      rounded-full
                      transition
                      duration-200
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
                      flex h-9
                      min-w-[58px]
                      items-center
                      justify-center gap-1
                      rounded-full px-2
                      font-sans
                      text-[10px]
                      font-semibold
                      transition
                      duration-200
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

                    {Math.round(
                      zoom * 100,
                    )}
                    %
                  </button>

                  <button
                    type="button"
                    onClick={zoomIn}
                    disabled={
                      zoom >= MAX_ZOOM
                    }
                    aria-label="Zoom in"
                    className="
                      flex h-9 w-9
                      items-center
                      justify-center
                      rounded-full
                      transition
                      duration-200
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