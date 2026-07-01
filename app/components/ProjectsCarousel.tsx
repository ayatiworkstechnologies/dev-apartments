"use client";

import {
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  location: string;
  year: string;
  img: string;
};

type CarouselLayout = {
  cardWidth: number;
  gap: number;
  fullVisibleCards: number;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Villa, Pea Cock Enclave-4",
    location: "Chennai",
    year: "2026",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Villa, Pushpa Ave",
    location: "Chennai",
    year: "2026",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Dev Pristine Villa",
    location: "Chennai",
    year: "2026",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Villa, Pushpa Ave",
    location: "Chennai",
    year: "2026",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Dev Heritage Homes",
    location: "Chennai",
    year: "2026",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Green Valley Villas",
    location: "Chennai",
    year: "2026",
    img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Pearl Residences",
    location: "Chennai",
    year: "2026",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Dev Signature Villa",
    location: "Chennai",
    year: "2026",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Modern Courtyard Home",
    location: "Chennai",
    year: "2026",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Luxury Garden Villa",
    location: "Chennai",
    year: "2026",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=90&auto=format&fit=crop",
  },
];

const INITIAL_FIRST_FULL_INDEX = 1;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export default function ProjectsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(
    INITIAL_FIRST_FULL_INDEX,
  );

  const [isReady, setIsReady] = useState(false);

  const [layout, setLayout] = useState<CarouselLayout>({
    cardWidth: 0,
    gap: 16,
    fullVisibleCards: 3,
  });

  /**
   * The last possible index where all final cards
   * remain completely visible.
   */
  const getMaximumIndex = useCallback(
    (fullVisibleCards: number) => {
      return Math.max(
        0,
        projects.length - fullVisibleCards,
      );
    },
    [],
  );

  /**
   * Responsive layout:
   *
   * Desktop:
   * ½ previous + 3 full + ½ next
   *
   * Tablet:
   * ½ previous + 2 full + ½ next
   *
   * Mobile:
   * ½ previous + 1 full + ½ next
   */
  const calculateLayout = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const viewportWidth = viewport.clientWidth;

    let fullVisibleCards = 1;
    let gap = 10;

    if (viewportWidth >= 1024) {
      fullVisibleCards = 3;
      gap = 16;
    } else if (viewportWidth >= 640) {
      fullVisibleCards = 2;
      gap = 14;
    }

    /*
     * Desktop calculation:
     *
     * ½ + 3 + ½ = 4 total card widths
     * There are 4 gaps inside the visible arrangement.
     */
    const visibleCardUnits = fullVisibleCards + 1;

    const cardWidth =
      viewportWidth / visibleCardUnits - gap;

    const maximumIndex =
      getMaximumIndex(fullVisibleCards);

    setLayout({
      cardWidth,
      gap,
      fullVisibleCards,
    });

    setActiveIndex((currentIndex) =>
      clamp(currentIndex, 0, maximumIndex),
    );

    setIsReady(true);
  }, [getMaximumIndex]);

  useEffect(() => {
    calculateLayout();

    const viewport = viewportRef.current;

    if (!viewport) return;

    const resizeObserver = new ResizeObserver(() => {
      calculateLayout();
    });

    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateLayout]);

  const maximumIndex = getMaximumIndex(
    layout.fullVisibleCards,
  );

  const trackWidth =
    projects.length * layout.cardWidth +
    Math.max(projects.length - 1, 0) * layout.gap;

  const viewportWidth =
    viewportRef.current?.clientWidth ?? 0;

  const maximumTranslate = Math.max(
    trackWidth - viewportWidth,
    0,
  );

  /**
   * Middle position:
   *
   * Half of previous card remains on left.
   * Half of next card remains on right.
   */
  const middleTrackX =
    layout.cardWidth / 2 +
    layout.gap -
    activeIndex *
      (layout.cardWidth + layout.gap);

  /**
   * Boundary handling:
   *
   * First position:
   * First image is fully visible.
   *
   * Last position:
   * Last image is fully visible.
   */
  const trackX =
    activeIndex === 0
      ? 0
      : activeIndex === maximumIndex
        ? -maximumTranslate
        : clamp(
            middleTrackX,
            -maximumTranslate,
            0,
          );

  const handlePrevious = useCallback(() => {
    setActiveIndex((currentIndex) =>
      clamp(
        currentIndex - 1,
        0,
        maximumIndex,
      ),
    );
  }, [maximumIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((currentIndex) =>
      clamp(
        currentIndex + 1,
        0,
        maximumIndex,
      ),
    );
  }, [maximumIndex]);

  /**
   * Clicking the faded left or right card
   * moves it into the fully visible area.
   */
  const handleCardClick = (index: number) => {
    const leftPartialIndex = activeIndex - 1;

    const rightPartialIndex =
      activeIndex + layout.fullVisibleCards;

    if (index === leftPartialIndex) {
      handlePrevious();
      return;
    }

    if (index === rightPartialIndex) {
      handleNext();
    }
  };

  const handleTouchStart = (
    event: TouchEvent<HTMLDivElement>,
  ) => {
    touchStartXRef.current =
      event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (
    event: TouchEvent<HTMLDivElement>,
  ) => {
    if (touchStartXRef.current === null) return;

    const touchEndX =
      event.changedTouches[0]?.clientX;

    if (touchEndX === undefined) return;

    const difference =
      touchStartXRef.current - touchEndX;

    if (Math.abs(difference) >= 45) {
      if (difference > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    touchStartXRef.current = null;
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
    >
      {/* Decorative animated bubbles */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
          x: -30,
          y: 20,
        }}
        whileInView={{
          opacity: 0.16,
          scale: 1,
          x: 0,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 130,
          damping: 11,
          delay: 0.1,
        }}
        className="pointer-events-none absolute left-[8%] top-12 hidden h-24 w-24 rounded-full border border-[#b88d48] lg:block"
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
          x: 25,
          y: -15,
        }}
        whileInView={{
          opacity: 0.12,
          scale: 1,
          x: 0,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 130,
          damping: 10,
          delay: 0.2,
        }}
        className="pointer-events-none absolute right-[10%] top-32 hidden h-16 w-16 rounded-full bg-[#b88d48] lg:block"
      />

      {/* Heading */}
      <motion.div
        initial={{
          opacity: 0,
          y: 55,
          scale: 0.82,
          filter: "blur(12px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.35,
        }}
        transition={{
          type: "spring",
          stiffness: 115,
          damping: 13,
          mass: 0.8,
        }}
        className="relative z-10 mx-auto max-w-[650px] px-5 text-center"
      >
        <motion.h2
          initial={{
            scale: 0.75,
          }}
          whileInView={{
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 12,
            delay: 0.08,
          }}
          className="font-primary text-[30px] font-bold leading-[1.07] tracking-[-0.04em] text-[#111111] sm:text-[40px] lg:text-[48px]"
        >
          Creative{" "}
          <span className="text-[#b88d48]">
            Projects That
          </span>

          <br />

          <span className="text-[#b88d48]">
            Define
          </span>{" "}
          Our Style
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-secondary mx-auto mt-4 max-w-[500px] text-[12px] leading-6 text-[#9f9f9f] sm:text-[14px]"
        >
          Our diverse portfolio represents decades of
          construction experience backed by a passion for
          quality, outstanding client service.
        </motion.p>
      </motion.div>

      {/* Carousel viewport */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 0.55,
          delay: 0.1,
        }}
        className={`
          mt-10 w-full overflow-hidden
          transition-opacity duration-300
          sm:mt-14
          ${isReady ? "opacity-100" : "opacity-0"}
        `}
      >
        <div
          ref={viewportRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="w-full overflow-hidden touch-pan-y"
        >
          <motion.div
            animate={{
              x: trackX,
            }}
            transition={{
              type: "spring",
              stiffness: 115,
              damping: 20,
              mass: 0.9,
            }}
            className="flex w-max items-start pb-8"
            style={{
              columnGap: `${layout.gap}px`,
            }}
          >
            {projects.map((project, index) => {
              const leftPartialIndex =
                activeIndex - 1;

              const rightPartialIndex =
                activeIndex +
                layout.fullVisibleCards;

              const isLeftPartial =
                index === leftPartialIndex;

              const isRightPartial =
                index === rightPartialIndex;

              const isPartial =
                isLeftPartial || isRightPartial;

              const isFullyVisible =
                index >= activeIndex &&
                index <
                  activeIndex +
                    layout.fullVisibleCards;

              const isLowerCard =
                index % 2 !== 0;

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  aria-label={`View ${project.title}`}
                  onClick={() =>
                    handleCardClick(index)
                  }
                  animate={{
                    opacity: isFullyVisible
                      ? 1
                      : isPartial
                        ? 0.42
                        : 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    group shrink-0 border-0
                    bg-transparent p-0 text-left
                    outline-none
                    ${
                      isPartial
                        ? "cursor-pointer"
                        : "cursor-default"
                    }
                    ${
                      isLowerCard
                        ? "mt-5 sm:mt-6 lg:mt-7"
                        : "mt-0"
                    }
                  `}
                  style={{
                    width: `${layout.cardWidth}px`,
                  }}
                >
                  {/* Bubble bounce card entry */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 85,
                      scale: 0.58,
                      rotate: index % 2 === 0 ? -3 : 3,
                      borderRadius: "50%",
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotate: 0,
                      borderRadius: "10px",
                    }}
                    viewport={{
                      once: true,
                      amount: 0.08,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 145,
                      damping: 13,
                      mass: 0.72,
                      delay: Math.min(
                        index * 0.055,
                        0.35,
                      ),
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[30px] bg-[#eeeeee]">
                      <motion.img
                        src={project.img}
                        alt={project.title}
                        loading="lazy"
                        draggable={false}
                        whileHover={{
                          scale: 1.045,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full w-full select-none object-cover"
                      />

                      {/* Hover overlay */}
                      <div
                        className="
                          absolute inset-0 flex items-center
                          justify-center bg-black/5 opacity-0
                          transition-opacity duration-300
                          group-hover:opacity-100
                        "
                      >
                        <motion.span
                          initial={{
                            scale: 0.5,
                            opacity: 0,
                          }}
                          whileHover={{
                            scale: 1.08,
                          }}
                          className="
                            translate-y-3 rounded-full bg-white
                            px-5 py-2 text-[11px] font-semibold
                            text-[#111111] opacity-0
                            shadow-[0_8px_24px_rgba(0,0,0,0.16)]
                            transition-all duration-300
                            group-hover:translate-y-0
                            group-hover:scale-100
                            group-hover:opacity-100
                          "
                        >
                          View
                        </motion.span>
                      </div>
                    </div>

                    {/* Project details */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay:
                          0.18 +
                          Math.min(
                            index * 0.04,
                            0.28,
                          ),
                      }}
                      className="pt-3"
                    >
                      <h3 className="font-primary line-clamp-1 text-[14px] font-semibold leading-[1.3] text-[#161616] sm:text-[15px] lg:text-[16px]">
                        {project.title}
                      </h3>

                      <div className="font-secondary mt-1 text-[10px] leading-[1.35] text-[#a4a4a4] sm:text-[11px]">
                        <p>{project.location}</p>
                        <p>{project.year}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom-center navigation */}
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.65,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 155,
          damping: 12,
          delay: 0.25,
        }}
        className="mt-1 flex items-center justify-center gap-3 sm:mt-3"
      >
        <motion.button
          type="button"
          onClick={handlePrevious}
          disabled={activeIndex === 0}
          aria-label="Previous projects"
          whileHover={
            activeIndex === 0
              ? undefined
              : {
                  y: -4,
                  scale: 1.08,
                }
          }
          whileTap={
            activeIndex === 0
              ? undefined
              : {
                  scale: 0.88,
                }
          }
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 15,
          }}
          className="
            group flex h-11 w-11 items-center
            justify-center rounded-full
            border border-[#dddddd] bg-white
            text-[#171717]
            shadow-[0_8px_24px_rgba(0,0,0,0.07)]
            transition-colors duration-300

            hover:border-[#b88d48]
            hover:bg-[#b88d48]
            hover:text-white

            disabled:pointer-events-none
            disabled:opacity-30

            sm:h-12 sm:w-12
          "
        >
          <ChevronLeft
            size={20}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </motion.button>

        {/* Current slide indicator */}
        <motion.div
          key={activeIndex}
          initial={{
            scale: 0.55,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 12,
          }}
          className="font-secondary min-w-[58px] text-center text-[11px] tracking-[0.12em] text-[#a4a4a4]"
        >
          <span className="font-semibold text-[#b88d48]">
            {String(activeIndex + 1).padStart(
              2,
              "0",
            )}
          </span>

          <span className="mx-1.5 text-[#d0d0d0]">
            /
          </span>

          <span>
            {String(maximumIndex + 1).padStart(
              2,
              "0",
            )}
          </span>
        </motion.div>

        <motion.button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === maximumIndex}
          aria-label="Next projects"
          whileHover={
            activeIndex === maximumIndex
              ? undefined
              : {
                  y: -4,
                  scale: 1.08,
                }
          }
          whileTap={
            activeIndex === maximumIndex
              ? undefined
              : {
                  scale: 0.88,
                }
          }
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 15,
          }}
          className="
            group flex h-11 w-11 items-center
            justify-center rounded-full
            border border-[#dddddd] bg-white
            text-[#171717]
            shadow-[0_8px_24px_rgba(0,0,0,0.07)]
            transition-colors duration-300

            hover:border-[#b88d48]
            hover:bg-[#b88d48]
            hover:text-white

            disabled:pointer-events-none
            disabled:opacity-30

            sm:h-12 sm:w-12
          "
        >
          <ChevronRight
            size={20}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </motion.button>
      </motion.div>
    </section>
  );
}