"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Building2,
  ChevronRight,
  Download,
  MapPin,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

type HighlightItem = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

const highlights: HighlightItem[] = [
  {
    id: 1,
    title: "Premium Amenities",
    description:
      "Equipped with high-speed elevators, terrace gardens, and a modern gym.",
    icon: Building2,
  },
  {
    id: 2,
    title: "Prime Location",
    description:
      "Located within 10 minutes of the coastline and major IT hubs.",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Safety First",
    description:
      "24/7 CCTV surveillance with an integrated video door phone system.",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Power Backup",
    description:
      "Full DG power backup for common areas and 500W per apartment.",
    icon: Zap,
  },
];

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.12,
    },
  },
};

function getCardVariants(index: number): Variants {
  const animations = [
    {
      opacity: 0,
      x: -45,
      y: 12,
      rotate: -1.5,
      scale: 0.94,
      filter: "blur(9px)",
    },
    {
      opacity: 0,
      y: 50,
      scale: 0.92,
      filter: "blur(9px)",
    },
    {
      opacity: 0,
      y: -45,
      scale: 0.94,
      filter: "blur(9px)",
    },
    {
      opacity: 0,
      x: 45,
      y: 12,
      rotate: 1.5,
      scale: 0.94,
      filter: "blur(9px)",
    },
  ];

  return {
    hidden: animations[index],
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 105,
        damping: 15,
        mass: 0.85,
      },
    },
  };
}

export default function ProjectHighlightsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="project-highlights"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* Highlights section */}
      <div
        className="
          relative px-4 py-16
          sm:px-6 sm:py-20
          md:px-8
          lg:px-12 lg:py-24
          xl:px-16 xl:py-28
        "
      >
        {/* Soft background decorations */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -left-32 top-10
            h-[330px] w-[330px]
            rounded-full bg-[#b88d48]/[0.035]
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-32 bottom-0
            h-[330px] w-[330px]
            rounded-full bg-[#b88d48]/[0.035]
            blur-3xl
          "
        />

        <div className="relative z-10 mx-auto w-full max-w-[1500px]">
          {/* Heading */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 35,
                    scale: 0.94,
                    filter: "blur(10px)",
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
              amount: 0.45,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease,
            }}
            className="text-center"
          >
            <h2
              className="
                font-primary font-semibold
                leading-[1.1] tracking-[-0.035em]
                text-[#17213b]

                text-[30px]
                sm:text-[38px]
                md:text-[44px]
                lg:text-[50px]
              "
            >
              Key Project Highlights
            </h2>

            <motion.div
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
                duration: reduceMotion ? 0 : 0.85,
                delay: reduceMotion ? 0 : 0.25,
                ease,
              }}
              className="
                mx-auto mt-4 h-[2px]
                w-[48px] origin-center
                bg-[#b88d48]

                sm:mt-5 sm:w-[58px]
              "
            />
          </motion.div>

          {/* Highlight cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.16,
            }}
            className="
              mt-12 grid grid-cols-1
              gap-5

              sm:mt-14
              sm:grid-cols-2
              sm:gap-6

              lg:mt-16
              lg:grid-cols-4
              lg:gap-7

              xl:gap-8
            "
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.id}
                  variants={
                    reduceMotion
                      ? undefined
                      : getCardVariants(index)
                  }
                  initial={
                    reduceMotion ? false : undefined
                  }
                  whileHover={{
                    y: -10,
                    scale: 1.015,
                    boxShadow:
                      "0 25px 65px rgba(74, 51, 27, 0.12)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 19,
                  }}
                  className="
                    group relative overflow-hidden
                    rounded-[22px]
                    border border-[#f3efe9]
                    bg-white

                    min-h-[190px]
                    px-5 py-6

                    shadow-[0_12px_40px_rgba(67,48,29,0.055)]

                    sm:min-h-[205px]
                    sm:px-6 sm:py-7

                    lg:min-h-[215px]
                    lg:px-7 lg:py-8
                  "
                >
                  {/* Hover gradient */}
                  <div
                    className="
                      pointer-events-none absolute
                      inset-0 opacity-0

                      bg-gradient-to-br
                      from-[#b88d48]/[0.08]
                      via-transparent
                      to-transparent

                      transition-opacity duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* Hover top line */}
                  <span
                    className="
                      absolute left-0 top-0
                      h-[3px] w-0
                      bg-[#b88d48]

                      transition-all duration-500
                      group-hover:w-full
                    "
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        rotate: [0, -8, 8, 0],
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-[14px]

                        bg-[#faf7f1]
                        text-[#b88d48]

                        transition-all duration-500

                        group-hover:scale-110
                        group-hover:bg-[#b88d48]
                        group-hover:text-white
                        group-hover:shadow-[0_10px_24px_rgba(184,141,72,0.28)]

                        sm:h-13 sm:w-13
                      "
                    >
                      <Icon
                        size={21}
                        strokeWidth={1.8}
                      />
                    </motion.div>

                    <div
                      className="
                        mt-6 flex items-start
                        justify-between gap-4
                      "
                    >
                      <div>
                        <h3
                          className="
                            font-primary
                            text-[14px] font-semibold
                            leading-tight
                            text-[#171717]

                            sm:text-[15px]
                            lg:text-[16px]
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-2 max-w-[260px]
                            font-secondary
                            text-[11px] leading-[1.6]
                            text-[#a09b95]

                            sm:text-[12px]
                            lg:text-[13px]
                          "
                        >
                          {item.description}
                        </p>
                      </div>

                      <motion.span
                        className="
                          mt-0.5 flex h-8 w-8
                          shrink-0 items-center
                          justify-center rounded-full

                          border border-transparent
                          text-[#b88d48]

                          opacity-0
                          transition-all duration-400

                          group-hover:translate-x-1
                          group-hover:border-[#b88d48]/20
                          group-hover:bg-[#b88d48]/10
                          group-hover:opacity-100
                        "
                      >
                        <ChevronRight
                          size={15}
                          strokeWidth={2}
                        />
                      </motion.span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Master Site Plan */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 65,
                filter: "blur(8px)",
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.22,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.85,
          ease,
        }}
        className="
          relative overflow-hidden
          bg-[#b78949]

          px-4 py-12
          sm:px-6 sm:py-14
          md:px-8
          lg:px-12 lg:py-16
          xl:px-16
        "
      >
        {/* Gold background decoration */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 30, 0],
                  y: [0, -18, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none absolute
            -right-20 -top-36
            h-[380px] w-[380px]
            rounded-full
            bg-white/[0.055]
            blur-2xl
          "
        />

        <div
          className="
            relative z-10 mx-auto
            flex w-full max-w-[1500px]
            flex-col gap-8

            sm:gap-10

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* Site plan content */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -40,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              delay: reduceMotion ? 0 : 0.1,
              ease,
            }}
          >
            <h2
              className="
                font-primary font-semibold
                leading-tight text-white

                text-[28px]
                sm:text-[34px]
                lg:text-[39px]
              "
            >
              Master Site Plan
            </h2>

            <p
              className="
                mt-3 max-w-[570px]
                font-secondary
                text-[11px] leading-[1.65]
                text-white/75

                sm:text-[12px]
                md:text-[13px]
              "
            >
              Discover a beautifully completed community
              reflecting superior construction and excellence.
            </p>
          </motion.div>

          {/* Download button */}
          <motion.a
            href="/documents/master-site-plan.pdf"
            download
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 40,
                    scale: 0.9,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              type: "spring",
              stiffness: 135,
              damping: 15,
              delay: reduceMotion ? 0 : 0.18,
            }}
            whileHover={{
              y: -4,
              scale: 1.035,
              backgroundColor: "#ffffff",
              color: "#9f7134",
              boxShadow:
                "0 16px 35px rgba(78,49,19,0.18)",
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              group inline-flex w-fit
              items-center justify-center
              gap-2.5 rounded-[8px]

              border border-white/85
              bg-transparent
              px-5 py-3

              font-primary
              text-[11px] font-semibold
              text-white

              transition-colors duration-300

              sm:px-6
              sm:text-[12px]

              md:shrink-0

              lg:px-8
              lg:py-3.5
              lg:text-[13px]
            "
          >
            <Download
              size={15}
              strokeWidth={1.9}
              className="
                transition-transform duration-300
                group-hover:-translate-y-0.5
              "
            />

            Download PDF Plan
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}