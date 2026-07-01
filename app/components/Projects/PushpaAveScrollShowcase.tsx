"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MapPin } from "lucide-react";

type RevealType =
  | "left"
  | "top"
  | "circle"
  | "bottom"
  | "diagonal";

type GalleryImage = {
  id: number;
  image: string;
  alt: string;
  reveal: RevealType;
};

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    image: "/images/pushpa-1.png",
    alt: "Pushpa Avenue villa exterior",
    reveal: "left",
  },
  {
    id: 2,
    image: "/images/pushpa-2.png",
    alt: "Pushpa Avenue contemporary architecture",
    reveal: "top",
  },
  {
    id: 3,
    image: "/images/pushpa-3.png",
    alt: "Pushpa Avenue premium interior",
    reveal: "circle",
  },
  {
    id: 4,
    image: "/images/pushpa-4.png",
    alt: "Pushpa Avenue luxury bedroom",
    reveal: "bottom",
  },
  {
    id: 5,
    image: "/images/pushpa-5.png",
    alt: "Pushpa Avenue residential lifestyle",
    reveal: "diagonal",
  },
];

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const SECTION_BACKGROUND = "#f5f1e9";
const IMAGE_PLACEHOLDER = "#e8e0d4";

function getRevealClipPaths(
  reveal: RevealType,
) {
  switch (reveal) {
    case "top":
      return {
        closed: "inset(0% 0% 100% 0%)",
        teaser: "inset(0% 0% 72% 0%)",
        open: "inset(0% 0% 0% 0%)",
      };

    case "circle":
      return {
        closed: "circle(0% at 50% 50%)",
        teaser: "circle(24% at 50% 50%)",
        open: "circle(150% at 50% 50%)",
      };

    case "bottom":
      return {
        closed: "inset(100% 0% 0% 0%)",
        teaser: "inset(72% 0% 0% 0%)",
        open: "inset(0% 0% 0% 0%)",
      };

    case "diagonal":
      return {
        closed:
          "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        teaser:
          "polygon(0% 0%, 32% 0%, 14% 100%, 0% 100%)",
        open:
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };

    case "left":
    default:
      return {
        closed: "inset(0% 100% 0% 0%)",
        teaser: "inset(0% 72% 0% 0%)",
        open: "inset(0% 0% 0% 0%)",
      };
  }
}

function getImageStartPosition(
  reveal: RevealType,
) {
  switch (reveal) {
    case "top":
      return {
        x: 0,
        y: -45,
        scale: 1.08,
        rotate: 0,
      };

    case "circle":
      return {
        x: 0,
        y: 0,
        scale: 1.14,
        rotate: 0,
      };

    case "bottom":
      return {
        x: 0,
        y: 45,
        scale: 1.08,
        rotate: 0,
      };

    case "diagonal":
      return {
        x: -34,
        y: 24,
        scale: 1.1,
        rotate: -1.2,
      };

    case "left":
    default:
      return {
        x: -45,
        y: 0,
        scale: 1.08,
        rotate: 0,
      };
  }
}

type AnimatedImageProps = {
  item: GalleryImage;
  index: number;
  activeIndex: number;
  priority?: boolean;
  sizes: string;
};

function AnimatedImage({
  item,
  index,
  activeIndex,
  priority = false,
  sizes,
}: AnimatedImageProps) {
  const reduceMotion = useReducedMotion();

  const clipPaths = getRevealClipPaths(
    item.reveal,
  );

  const startPosition =
    getImageStartPosition(item.reveal);

  const isOpened = index <= activeIndex;
  const isNext = index === activeIndex + 1;

  const clipPath = reduceMotion
    ? clipPaths.open
    : isOpened
      ? clipPaths.open
      : isNext
        ? clipPaths.teaser
        : clipPaths.closed;

  const movementAmount = isOpened
    ? 0
    : isNext
      ? 0.45
      : 1;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              clipPath: clipPaths.closed,
              opacity: 0.55,
            }
      }
      animate={{
        clipPath,
        opacity:
          isOpened || isNext ? 1 : 0.55,
      }}
      transition={{
        clipPath: {
          duration: 1.15,
          ease,
        },
        opacity: {
          duration: 0.55,
          ease,
        },
      }}
      className="
        absolute inset-0 overflow-hidden
        bg-[#e8e0d4]
      "
    >
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                x: startPosition.x,
                y: startPosition.y,
                scale: startPosition.scale,
                rotate: startPosition.rotate,
              }
        }
        animate={{
          x:
            startPosition.x *
            movementAmount,
          y:
            startPosition.y *
            movementAmount,
          scale: isOpened
            ? 1
            : isNext
              ? 1.035
              : startPosition.scale,
          rotate: isOpened
            ? 0
            : startPosition.rotate *
              movementAmount,
        }}
        transition={{
          duration: 1.45,
          ease,
        }}
        className="absolute inset-0"
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          priority={priority}
          sizes={sizes}
          draggable={false}
          className="
            select-none object-cover
          "
        />
      </motion.div>

      {/* Warm soft overlay */}
      <div
        className="
          pointer-events-none
          absolute inset-0

          bg-gradient-to-t
          from-[#50361f]/10
          via-transparent
          to-[#fff8ed]/5
        "
      />
    </motion.div>
  );
}

type ImagePanelProps = {
  item: GalleryImage;
  index: number;
  activeIndex: number;
  setPanelRef: (
    index: number,
    node: HTMLElement | null,
  ) => void;
};

function ImagePanel({
  item,
  index,
  activeIndex,
  setPanelRef,
}: ImagePanelProps) {
  const isActive = index === activeIndex;

  return (
    <article
      ref={(node) => {
        setPanelRef(index, node);
      }}
      className="
        relative h-full shrink-0
        bg-[#f5f1e9]

        w-[88vw]

        sm:w-[78vw]

        md:w-[70vw]

        lg:w-[59vw]

        xl:w-[53vw]

        2xl:w-[49vw]
      "
    >
      <div
        className="
          relative h-full

          pb-5 pt-24

          sm:pb-7 sm:pt-28

          lg:pb-8 lg:pt-28
        "
      >
        {/* Image area */}
        <motion.div
          initial={false}
          animate={{
            y: isActive ? 0 : 12,
            scale: isActive ? 1 : 0.985,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="
            relative h-full w-full
            overflow-visible
            bg-[#e8e0d4]

            shadow-[0_22px_65px_rgba(76,54,31,0.11)]
          "
        >
          <AnimatedImage
            item={item}
            index={index}
            activeIndex={activeIndex}
            priority={index < 2}
            sizes="
              (max-width: 639px) 88vw,
              (max-width: 767px) 78vw,
              (max-width: 1023px) 70vw,
              (max-width: 1279px) 59vw,
              53vw
            "
          />

          {/* Decorative attached bubble */}
          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0.4,
              scale: isActive ? 1 : 0.75,
              y: isActive
                ? [0, -7, 0]
                : 0,
            }}
            transition={{
              opacity: {
                duration: 0.45,
              },
              scale: {
                duration: 0.45,
                ease,
              },
              y: {
                duration: 2.6,
                repeat: isActive
                  ? Infinity
                  : 0,
                ease: "easeInOut",
              },
            }}
            className="
              pointer-events-none
              absolute -left-4 top-1/2
              z-20

              h-10 w-10
              -translate-y-1/2
              rounded-full

              border border-white/80
              bg-[#f5f1e9]/70
              backdrop-blur-md

              shadow-[0_12px_28px_rgba(84,57,31,0.13)]

              sm:-left-6
              sm:h-12 sm:w-12

              lg:-left-7
              lg:h-14 lg:w-14
            "
          >
            <span
              className="
                absolute left-full top-1/2
                h-px w-7
                -translate-y-1/2

                bg-[#b88d48]/50

                sm:w-9
              "
            />

            <span
              className="
                absolute -bottom-1
                -right-1

                h-3.5 w-3.5
                rounded-full

                border border-white/80
                bg-[#b88d48]

                sm:h-4 sm:w-4
              "
            />
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}

export default function PushpaAveHorizontalScroll() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const panelRefs = useRef<
    Array<HTMLElement | null>
  >([]);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [travelDistance, setTravelDistance] =
    useState(0);

  const [panelCenters, setPanelCenters] =
    useState<number[]>([]);

  const [sectionHeight, setSectionHeight] =
    useState("500vh");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const setPanelRef = (
    index: number,
    node: HTMLElement | null,
  ) => {
    panelRefs.current[index] = node;
  };

  useEffect(() => {
    const calculateDimensions = () => {
      const track = trackRef.current;

      if (!track) return;

      const viewportWidth =
        window.innerWidth;

      const trackWidth =
        track.scrollWidth;

      const horizontalTravel = Math.max(
        trackWidth - viewportWidth,
        0,
      );

      const centers =
        panelRefs.current.map((panel) => {
          if (!panel) return 0;

          return (
            panel.offsetLeft +
            panel.offsetWidth / 2
          );
        });

      setPanelCenters(centers);
      setTravelDistance(
        horizontalTravel,
      );

      /*
       * Extra vertical distance gives a
       * smoother horizontal scroll.
       */
      setSectionHeight(
        `${
          window.innerHeight +
          horizontalTravel * 1.08
        }px`,
      );
    };

    calculateDimensions();

    const resizeObserver =
      new ResizeObserver(
        calculateDimensions,
      );

    if (trackRef.current) {
      resizeObserver.observe(
        trackRef.current,
      );
    }

    panelRefs.current.forEach((panel) => {
      if (panel) {
        resizeObserver.observe(panel);
      }
    });

    window.addEventListener(
      "resize",
      calculateDimensions,
    );

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        calculateDimensions,
      );
    };
  }, []);

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -travelDistance],
  );

  const smoothX = useSpring(rawX, {
    stiffness: 65,
    damping: 25,
    mass: 0.68,
  });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (progress) => {
      if (!panelCenters.length) return;

      const horizontalPosition =
        progress * travelDistance;

      const viewportCenter =
        horizontalPosition +
        window.innerWidth / 2;

      let nearestIndex = 0;
      let nearestDistance = Infinity;

      panelCenters.forEach(
        (center, index) => {
          const distance = Math.abs(
            center - viewportCenter,
          );

          if (
            distance < nearestDistance
          ) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        },
      );

      setActiveIndex((current) =>
        current === nearestIndex
          ? current
          : nearestIndex,
      );
    },
  );

  return (
    <section
      ref={sectionRef}
      id="pushpa-ave-showcase"
      className="
        relative bg-[#f5f1e9]
      "
      style={{
        height: sectionHeight,
        backgroundColor:
          SECTION_BACKGROUND,
      }}
    >
      {/* Sticky horizontal viewport */}
      <div
        className="
          sticky top-0
          h-[100svh] w-full
          overflow-hidden
          bg-[#f5f1e9]
        "
      >
        <motion.div
          ref={trackRef}
          style={{
            x: smoothX,
          }}
          className="
            flex h-full w-max
            items-stretch

            gap-3

            sm:gap-4

            lg:gap-5
          "
        >
          {/* First panel */}
          <article
            ref={(node) => {
              setPanelRef(0, node);
            }}
            className="
              relative h-full w-screen
              shrink-0 overflow-hidden
              bg-[#f5f1e9]
            "
          >
            {/* Soft warm background */}
            <div
              className="
                pointer-events-none
                absolute -left-40 top-1/2

                h-[460px] w-[460px]
                -translate-y-1/2
                rounded-full

                bg-[#b88d48]/[0.06]
                blur-3xl
              "
            />

            <div
              className="
                relative z-10 mx-auto
                grid h-full w-full
                max-w-[1600px]

                grid-rows-[auto_minmax(0,1fr)]
                gap-4

                px-5 pb-5 pt-24

                sm:gap-6
                sm:px-8
                sm:pb-7
                sm:pt-28

                lg:grid-cols-[0.62fr_1.38fr]
                lg:grid-rows-1
                lg:items-center
                lg:gap-12
                lg:px-14
                lg:pb-8
                lg:pt-28

                xl:grid-cols-[0.65fr_1.35fr]
                xl:gap-16
                xl:px-20
              "
            >
              {/* Left content */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -42,
                  filter: "blur(9px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.8,
                  ease,
                }}
                className="
                  relative z-10
                  flex flex-col justify-center
                "
              >
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 14,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.55,
                    ease,
                  }}
                  className="
                    font-secondary
                    text-[9px] font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#b58c18]

                    sm:text-[10px]

                    lg:text-[11px]
                  "
                >
                  Villa, Divya Desam
                </motion.p>

                <h1
                  className="
                    mt-2 font-primary
                    font-bold leading-[0.98]
                    tracking-[-0.055em]
                    text-[#120e0a]

                    text-[31px]

                    sm:mt-3
                    sm:text-[44px]

                    lg:text-[58px]

                    xl:text-[68px]
                  "
                >
                  Where
                  <br />
                  Elegant
                  <br />

                  <span className="text-[#b78c12]">
                    Living
                    <br />
                    Begins
                  </span>
                </h1>

                <p
                  className="
                    mt-4 max-w-[470px]
                    font-secondary
                    text-[11px]
                    leading-[1.75]
                    text-[#817a73]

                    sm:mt-5
                    sm:text-[13px]

                    lg:mt-8
                    lg:text-[15px]
                    lg:leading-[2]
                  "
                >
                  Discover a thoughtfully designed
                  villa community combining
                  sophisticated architecture,
                  refined interiors and modern
                  residential comfort near
                  Chennai&apos;s ECR coastline.
                </p>

                <div
                  className="
                    mt-4 flex items-center
                    gap-2 text-[#b78c12]

                    sm:mt-5

                    lg:mt-8
                  "
                >
                  <MapPin
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span
                    className="
                      font-secondary
                      text-[11px] font-semibold

                      sm:text-[13px]
                    "
                  >
                    ECR, Chennai
                  </span>
                </div>
              </motion.div>

              {/* First image */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 48,
                  scale: 0.96,
                  filter: "blur(10px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.08,
                  ease,
                }}
                className="
                  relative min-h-0
                  h-full overflow-hidden
                  bg-[#e8e0d4]

                  shadow-[0_22px_65px_rgba(76,54,31,0.10)]

                  lg:h-[72svh]
                "
              >
                <AnimatedImage
                  item={galleryImages[0]}
                  index={0}
                  activeIndex={activeIndex}
                  priority
                  sizes="
                    (max-width: 1023px) 100vw,
                    62vw
                  "
                />
              </motion.div>
            </div>
          </article>

          {/* Remaining image panels */}
          {galleryImages
            .slice(1)
            .map((item, arrayIndex) => {
              const actualIndex =
                arrayIndex + 1;

              return (
                <ImagePanel
                  key={item.id}
                  item={item}
                  index={actualIndex}
                  activeIndex={activeIndex}
                  setPanelRef={setPanelRef}
                />
              );
            })}

          {/* Final breathing space */}
          <div
            aria-hidden="true"
            className="
              h-full w-[7vw]
              shrink-0
              bg-[#f5f1e9]
            "
          />
        </motion.div>

        {/* Animated Scroll pill */}
        <motion.div
          initial={{
            opacity: 0,
            y: 14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.7,
            ease,
          }}
          className="
            pointer-events-none
            absolute bottom-5 left-1/2
            z-50
            -translate-x-1/2

            sm:bottom-6
          "
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.025, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative flex items-center
              justify-center

              rounded-full
              border border-white/60
              bg-[#8b7a6b]/75

              px-5 py-2
              backdrop-blur-md

              shadow-[0_10px_28px_rgba(78,55,33,0.18)]
            "
          >
            <span
              className="
                font-secondary
                text-[9px] font-bold
                uppercase tracking-[0.2em]
                text-white

                sm:text-[10px]
              "
            >
              Scroll
            </span>

            <motion.span
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.45, 0, 0.45],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="
                absolute inset-0
                -z-10 rounded-full

                border border-[#b88d48]/45
              "
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}