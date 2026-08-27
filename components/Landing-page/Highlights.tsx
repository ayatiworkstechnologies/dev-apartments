"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Armchair,
  BatteryCharging,
  BedDouble,
  Gamepad2,
  Leaf,
  Map,
  ShieldCheck,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

type HighlightItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

const highlights: HighlightItem[] = [
  {
    id: 1,
    title: "Enhanced Security",
    description:
      "24/7 surveillance and controlled access for a safe and secure living environment.",
    image: "/images/security.png",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Timeless Architecture",
    description:
      "Traditional design elements thoughtfully blended with contemporary comfort.",
    image: "/images/architecture.png",
    icon: Armchair,
  },
  {
    id: 3,
    title: "Green Surroundings",
    description:
      "Landscaped spaces and eco-conscious features for healthier everyday living.",
    image: "/images/green-surroundings.png",
    icon: Leaf,
  },
  {
    id: 4,
    title: "Smart Living Spaces",
    description:
      "Open interiors designed for natural light, ventilation and everyday comfort.",
    image: "/images/smart-living.png",
    icon: Waypoints,
  },
  {
    id: 5,
    title: "Spacious Bedrooms",
    description:
      "Comfortable private spaces with thoughtful planning and generous proportions.",
    image: "/images/bedroom.png",
    icon: BedDouble,
  },
  {
    id: 6,
    title: "Exclusive Land Ownership",
    description:
      "Complete ownership of your villa and the land on which it stands.",
    image: "/images/land-ownership.png",
    icon: Map,
  },
  {
    id: 7,
    title: "Kids Play Area",
    description:
      "A safe and engaging environment where children can play, learn and grow.",
    image: "/images/kids-play-area.png",
    icon: Gamepad2,
  },
  {
    id: 8,
    title: "EV Charging Ready",
    description:
      "Dedicated EV charging provision for a convenient future-ready lifestyle.",
    image: "/images/ev-charging.png",
    icon: BatteryCharging,
  },
];

const AUTO_PLAY_DELAY = 3500;

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(7px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

export default function Highlights() {
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);

  const desktopContainerRef =
    useRef<HTMLDivElement | null>(null);

  const mobileContainerRef =
    useRef<HTMLDivElement | null>(null);

  const desktopItemRefs = useRef<
    Array<HTMLButtonElement | null>
  >([]);

  const mobileItemRefs = useRef<
    Array<HTMLButtonElement | null>
  >([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isSectionVisible, setIsSectionVisible] =
    useState(false);
  const [isDocumentVisible, setIsDocumentVisible] =
    useState(true);

  const activeHighlight = highlights[activeIndex];

  /*
   * Scroll only the internal menu containers.
   * This prevents the entire webpage from jumping.
   */
  const scrollActiveItemInsideContainer = useCallback(
    (index: number) => {
      const desktopContainer =
        desktopContainerRef.current;

      const desktopItem =
        desktopItemRefs.current[index];

      if (desktopContainer && desktopItem) {
        const itemTop = desktopItem.offsetTop;
        const itemHeight = desktopItem.offsetHeight;
        const containerHeight =
          desktopContainer.clientHeight;

        const targetTop =
          itemTop -
          containerHeight / 2 +
          itemHeight / 2;

        desktopContainer.scrollTo({
          top: Math.max(0, targetTop),
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }

      const mobileContainer =
        mobileContainerRef.current;

      const mobileItem =
        mobileItemRefs.current[index];

      if (mobileContainer && mobileItem) {
        const itemLeft = mobileItem.offsetLeft;
        const itemWidth = mobileItem.offsetWidth;
        const containerWidth =
          mobileContainer.clientWidth;

        const targetLeft =
          itemLeft -
          containerWidth / 2 +
          itemWidth / 2;

        mobileContainer.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    },
    [reduceMotion],
  );

  const changeHighlight = useCallback(
    (nextIndex: number) => {
      if (
        nextIndex < 0 ||
        nextIndex >= highlights.length ||
        nextIndex === activeIndex
      ) {
        return;
      }

      const isForward =
        nextIndex > activeIndex ||
        (activeIndex === highlights.length - 1 &&
          nextIndex === 0);

      setDirection(isForward ? 1 : -1);
      setActiveIndex(nextIndex);
    },
    [activeIndex],
  );

  /*
   * Observe whether the section is actually visible.
   * Autoplay stops when the user scrolls to another section.
   */
  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(
          entry.isIntersecting &&
            entry.intersectionRatio >= 0.25,
        );
      },
      {
        threshold: [0, 0.25, 0.5, 0.75],
      },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Pause autoplay when the user changes browser tabs.
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(
        document.visibilityState === "visible",
      );
    };

    handleVisibilityChange();

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  /*
   * Keep only the internal menu aligned with the active item.
   * No window/page scrolling is performed.
   */
  useEffect(() => {
    scrollActiveItemInsideContainer(activeIndex);
  }, [
    activeIndex,
    scrollActiveItemInsideContainer,
  ]);

  /*
   * Autoplay runs only when:
   * 1. Reduced motion is disabled.
   * 2. The section is visible.
   * 3. The browser tab is visible.
   * 4. The user is not hovering over the component.
   */
  useEffect(() => {
    if (
      reduceMotion ||
      isPaused ||
      !isSectionVisible ||
      !isDocumentVisible
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setDirection(1);

      setActiveIndex((currentIndex) =>
        currentIndex === highlights.length - 1
          ? 0
          : currentIndex + 1,
      );
    }, AUTO_PLAY_DELAY);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    isDocumentVisible,
    isPaused,
    isSectionVisible,
    reduceMotion,
  ]);

  return (
    <section
      ref={sectionRef}
      id="project-highlights"
      className="relative overflow-hidden bg-[#f7f4ef] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[380px] w-[380px] rounded-full bg-[#b78949]/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#d8c4a8]/20 blur-[130px]"
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative mx-auto max-w-[1450px]"
      >
        {/* Section heading */}
        <motion.div
          variants={fadeUpVariants}
          className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#b78949]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9f733b] sm:text-[11px]">
                Project Highlights
              </p>
            </div>

            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.045em] text-[#382d22] sm:text-4xl lg:text-5xl">
              Designed for a better way of living.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#7f776e]">
            Explore the thoughtful features that make
            Divya Desam distinctive, comfortable and
            future-ready.
          </p>
        </motion.div>

        {/* Main layout */}
        <motion.div
          variants={fadeUpVariants}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            const nextFocusedElement =
              event.relatedTarget as Node | null;

            if (
              !nextFocusedElement ||
              !event.currentTarget.contains(
                nextFocusedElement,
              )
            ) {
              setIsPaused(false);
            }
          }}
          className="overflow-hidden rounded-[26px] border border-[#b78949]/15 bg-white p-2 shadow-[0_28px_85px_rgba(110,82,48,0.12)] sm:p-3 lg:p-4"
        >
          <div className="grid gap-3 lg:grid-cols-[0.82fr_1.18fr] lg:gap-4">
            {/* Left menu */}
            <div className="order-2 min-w-0 lg:order-1">
              {/* Desktop vertical menu */}
              <div
                ref={desktopContainerRef}
                className="
                  hidden h-[488px] overflow-y-auto
                  overscroll-contain scroll-smooth pr-1
                  lg:block
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                <div className="space-y-3">
                  {highlights.map((item, index) => {
                    const Icon = item.icon;
                    const isActive =
                      activeIndex === index;

                    return (
                      <motion.button
                        key={item.id}
                        ref={(element) => {
                          desktopItemRefs.current[index] =
                            element;
                        }}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() =>
                          changeHighlight(index)
                        }
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                x: 4,
                              }
                        }
                        whileTap={{
                          scale: 0.99,
                        }}
                        className={`group relative flex h-[113px] w-full shrink-0 items-center overflow-hidden rounded-[20px] border px-5 py-4 text-left transition-all duration-500 ${
                          isActive
                            ? "border-[#b78949] bg-[#b78949] shadow-[0_18px_45px_rgba(183,137,73,0.28)]"
                            : "border-[#b78949]/15 bg-[#fbfaf7] hover:border-[#b78949]/45 hover:bg-white hover:shadow-[0_12px_30px_rgba(110,82,48,0.09)]"
                        }`}
                      >
                        {/* Active progress */}
                        {isActive &&
                          !isPaused &&
                          isSectionVisible &&
                          isDocumentVisible &&
                          !reduceMotion && (
                            <motion.span
                              key={`desktop-progress-${activeIndex}`}
                              initial={{
                                scaleX: 0,
                              }}
                              animate={{
                                scaleX: 1,
                              }}
                              transition={{
                                duration:
                                  AUTO_PLAY_DELAY / 1000,
                                ease: "linear",
                              }}
                              className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-white/80"
                            />
                          )}

                        {isActive && (
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10"
                          />
                        )}

                        <div className="relative z-10 flex w-full items-center gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] transition-all duration-500 ${
                              isActive
                                ? "bg-white/15 text-white"
                                : "bg-[#b78949]/10 text-[#b78949] group-hover:bg-[#b78949] group-hover:text-white"
                            }`}
                          >
                            <Icon
                              size={20}
                              strokeWidth={1.8}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3
                              className={`text-[15px] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-300 xl:text-[16px] ${
                                isActive
                                  ? "text-white"
                                  : "text-[#3d3329]"
                              }`}
                            >
                              {item.title}
                            </h3>

                            <p
                              className={`mt-1.5 line-clamp-2 text-[10px] leading-[1.55] transition-colors duration-300 xl:text-[11px] ${
                                isActive
                                  ? "text-white/70"
                                  : "text-[#918980]"
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>

                          <motion.span
                            animate={{
                              rotate: isActive ? 45 : 0,
                            }}
                            transition={{
                              duration: 0.35,
                              ease,
                            }}
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                              isActive
                                ? "bg-white text-[#b78949]"
                                : "bg-[#b78949]/10 text-[#b78949]"
                            }`}
                          >
                            <ArrowUpRight size={16} />
                          </motion.span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile horizontal menu */}
              <div
                ref={mobileContainerRef}
                className="
                  flex snap-x snap-mandatory gap-2
                  overflow-x-auto overscroll-x-contain
                  scroll-smooth pb-2 lg:hidden
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  const isActive =
                    activeIndex === index;

                  return (
                    <button
                      key={item.id}
                      ref={(element) => {
                        mobileItemRefs.current[index] =
                          element;
                      }}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() =>
                        changeHighlight(index)
                      }
                      className={`flex min-w-[180px] snap-center items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#b78949] bg-[#b78949] text-white shadow-[0_12px_28px_rgba(183,137,73,0.25)]"
                          : "border-[#b78949]/15 bg-[#fbfaf7] text-[#3d3329]"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isActive
                            ? "bg-white/15 text-white"
                            : "bg-[#b78949]/10 text-[#b78949]"
                        }`}
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.8}
                        />
                      </div>

                      <span className="text-[11px] font-semibold leading-4">
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right active image */}
            <div className="order-1 min-w-0 lg:order-2">
              <div className="relative h-[330px] overflow-hidden rounded-[22px] bg-[#eee8df] sm:h-[430px] lg:h-[488px]">
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  <motion.div
                    key={activeHighlight.id}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      x:
                        direction > 0
                          ? 65
                          : -65,
                      scale: 1.04,
                      filter: "blur(8px)",
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      x:
                        direction > 0
                          ? -65
                          : 65,
                      scale: 0.985,
                      filter: "blur(7px)",
                    }}
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : 0.75,
                      ease,
                    }}
                    className="absolute inset-0"
                  >
                    <motion.div
                      initial={{
                        scale: reduceMotion
                          ? 1
                          : 1.07,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 1.3,
                        ease,
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeHighlight.image}
                        alt={activeHighlight.title}
                        fill
                        priority={activeIndex === 0}
                        unoptimized
                        draggable={false}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center"
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#6f5234]/50 via-[#8d6a43]/10 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 18,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.18,
                          duration: 0.55,
                          ease,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f1d7ad]">
                            Project Highlight
                          </span>

                          <span className="h-px w-10 bg-[#f1d7ad]/70" />

                          <span className="text-[10px] font-semibold text-white/70">
                            {String(
                              activeIndex + 1,
                            ).padStart(2, "0")}
                            /
                            {String(
                              highlights.length,
                            ).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
                          {activeHighlight.title}
                        </h3>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Image pagination */}
                <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-white/30 bg-[#8a6742]/45 px-3 py-2 backdrop-blur-md sm:right-6 sm:top-6">
                  {highlights.map((item, index) => {
                    const isActive =
                      activeIndex === index;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`View ${item.title}`}
                        aria-current={
                          isActive
                            ? "true"
                            : undefined
                        }
                        onClick={() =>
                          changeHighlight(index)
                        }
                        className="relative h-3 min-w-3 overflow-hidden rounded-full"
                      >
                        <motion.span
                          animate={{
                            width: isActive
                              ? 24
                              : 6,
                            backgroundColor:
                              isActive
                                ? "#ffffff"
                                : "rgba(255,255,255,0.5)",
                          }}
                          transition={{
                            duration: 0.35,
                            ease,
                          }}
                          className="mx-auto block h-1.5 rounded-full"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}