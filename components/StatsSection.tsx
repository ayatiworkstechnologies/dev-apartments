"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Building2,
} from "lucide-react";

/* =========================================================
   COUNT-UP
========================================================= */

type CountUpProps = {
  target: number;
  duration?: number;
};

function CountUp({
  target,
  duration = 1600,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.4,
  });

  useEffect(() => {
    if (!isInView) return;

    let animationFrame = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1,
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      setCount(
        Math.round(target * easedProgress),
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
    </span>
  );
}

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const numberVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -45,
    scale: 0.97,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 45,
    y: 22,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      delay: 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const projectVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function StatsSection() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 80,
    damping: 24,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 80,
    damping: 24,
  });

  const numberX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-8, 8],
  );

  const numberY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-5, 5],
  );

  const glowX = useTransform(
    smoothX,
    [-0.5, 0.5],
    ["20%", "80%"],
  );

  const glowY = useTransform(
    smoothY,
    [-0.5, 0.5],
    ["20%", "80%"],
  );

  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const section = sectionRef.current;

    if (!section) return;

    const rect =
      section.getBoundingClientRect();

    pointerX.set(
      (event.clientX - rect.left) /
        rect.width -
        0.5,
    );

    pointerY.set(
      (event.clientY - rect.top) /
        rect.height -
        0.5,
    );
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f6f3ec] py-10 sm:py-14 lg:py-16"
    >
      {/* Background lines */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-px bg-black/[0.04]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-0 h-full w-px bg-black/[0.04]"
      />

      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.14,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Pointer glow */}

        <motion.div
          aria-hidden="true"
          style={{
            left: glowX,
            top: glowY,
          }}
          className="pointer-events-none absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b08c1c]/10 blur-[95px]"
        />

        <div className="relative lg:min-h-[500px]">
          {/* =====================================================
              LEFT YELLOW PANEL
          ====================================================== */}

          <motion.div
            variants={numberVariants}
            style={{
              x: numberX,
              y: numberY,
            }}
            className="
              relative overflow-hidden
              rounded-[24px]
              bg-[#e3c96b]
              px-5 py-7
              sm:rounded-[28px]
              sm:px-8 sm:py-8
              lg:absolute
              lg:inset-y-0
              lg:left-0
              lg:w-[63%]
              lg:px-12
              lg:py-10
            "
          >
            {/* Grid pattern */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.09]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
                backgroundSize: "46px 46px",
              }}
            />

            {/* Decorative circles */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full border-[52px] border-black/[0.035]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/20 blur-[60px]"
            />

            <div className="relative z-10 min-h-[340px] sm:min-h-[340px] lg:min-h-0">
              {/* Top label */}

              <motion.div variants={fadeUpVariants}>
                <div className="inline-flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#171717]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/55 sm:text-[11px]">
                    Satisfied Clients
                  </p>
                </div>
              </motion.div>

              {/* Main statistics */}

              <div
                className="
                  mt-12
                  sm:mt-14
                  md:mt-14
                  lg:mt-16
                  lg:max-w-[72%]
                  xl:mt-14
                "
              >
                {/* 10,000+ */}

                <motion.div variants={fadeUpVariants}>
                  <div className="flex items-end gap-2">
                    <h2
                      className="
                        whitespace-nowrap
                        text-[50px]
                        font-black
                        leading-[0.88]
                        tracking-[-0.085em]
                        text-[#171717]
                        min-[380px]:text-[58px]
                        sm:text-[78px]
                        md:text-[86px]
                        lg:text-[92px]
                        xl:text-[102px]
                      "
                    >
                      <CountUp target={10000} />
                    </h2>

                    <span
                      className="
                        mb-0.5
                        text-3xl
                        font-semibold
                        leading-none
                        text-[#171717]
                        sm:mb-1
                        sm:text-5xl
                        lg:text-6xl
                      "
                    >
                      +
                    </span>
                  </div>

                  {/* Trusted clients */}

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-6">
                    <p className="text-xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-2xl lg:text-[28px]">
                      Trusted clients
                    </p>

                    <span className="hidden h-px w-10 bg-black/30 sm:block lg:w-14" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45 sm:text-[10px]">
                      Since 1985
                    </span>
                  </div>
                </motion.div>

                {/* 200+ completed projects */}

                <motion.div
                  variants={projectVariants}
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 20,
                  }}
                  className="
                    relative
                    mt-6
                    w-full
                    max-w-[330px]
                    overflow-hidden
                    rounded-[20px]
                    border border-white/20
                    bg-[#171717]
                    px-5 py-4
                    text-white
                    shadow-[0_18px_45px_rgba(0,0,0,0.18)]
                    sm:mt-7
                    sm:max-w-[360px]
                    sm:px-6
                    sm:py-5
                  "
                >
                  {/* Decorative elements */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full border border-white/10"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-[#e3c96b]/10 blur-2xl"
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#e3c96b] sm:h-12 sm:w-12">
                      <Building2
                        size={19}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-end gap-1">
                        <p className="text-4xl font-black leading-none tracking-[-0.055em] sm:text-[44px]">
                          <CountUp
                            target={200}
                            duration={1300}
                          />
                        </p>

                        <span className="mb-1 text-xl font-semibold text-[#e3c96b] sm:text-2xl">
                          +
                        </span>
                      </div>

                      <p className="mt-1.5 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.16em] text-white/55 min-[380px]:text-[10px] sm:text-[11px] sm:tracking-[0.18em]">
                        Completed Projects
                      </p>
                    </div>

                    <div className="hidden h-px min-w-6 flex-1 bg-white/10 sm:block" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT WHITE CONTENT PANEL
          ====================================================== */}

          <motion.div
            variants={cardVariants}
            className="
              relative
              mt-5
              overflow-hidden
              rounded-[24px]
              border border-black/[0.07]
              bg-white
              p-5
              shadow-[0_30px_80px_rgba(30,25,15,0.13)]
              sm:rounded-[26px]
              sm:p-8
              lg:absolute
              lg:right-0
              lg:top-1/2
              lg:mt-0
              lg:w-[52%]
              lg:-translate-y-1/2
              lg:p-10
            "
          >
            {/* Rotating decoration */}

            <motion.div
              aria-hidden="true"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 34,
                repeat: Infinity,
                ease: "linear",
              }}
              className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full border border-[#b08c1c]/10"
            >
              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#b08c1c]" />
            </motion.div>

            <div className="relative z-10">
              {/* Eyebrow */}

              <motion.div
                variants={fadeUpVariants}
                className="flex items-center gap-3"
              >
                <motion.span
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: 34,
                  }}
                  viewport={{
                    once: false,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-px shrink-0 bg-[#b08c1c]"
                />

                <p className="text-[9px] font-bold uppercase leading-5 tracking-[0.17em] text-[#97730f] sm:text-[11px] sm:tracking-[0.19em]">
                  Designing Spaces, Creating Experiences
                </p>
              </motion.div>

              {/* Description */}

              <motion.p
                variants={fadeUpVariants}
                className="mt-5 text-sm leading-7 text-gray-600 sm:mt-6 sm:text-[15px] sm:leading-8"
              >
                Dev Appartments was founded in 1985 under
                the stewardship of CEO and Managing
                Director, Mr. P.V. Devakumar, with the
                guidance of Chairman, Mr. P.G. Venugopal,
                a leading light of the real estate industry
                in Chennai. Since its inception, Dev
                Appartments has set the highest standards
                for itself amidst great challenges and
                struggles.
              </motion.p>

              {/* CTA */}

              <motion.div
                variants={fadeUpVariants}
                className="mt-6 border-t border-black/[0.08] pt-5 sm:mt-7 sm:pt-6"
              >
                <motion.a
                  href="/about-us"
                  whileHover="hover"
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group inline-flex items-center gap-4"
                >
                  <span className="text-sm font-semibold text-[#171717]">
                    Get Started
                  </span>

                  <motion.span
                    variants={{
                      hover: {
                        rotate: 45,
                        scale: 1.08,
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 17,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-white transition-colors duration-300 group-hover:bg-[#b08c1c]"
                  >
                    <ArrowUpRight size={16} />
                  </motion.span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}