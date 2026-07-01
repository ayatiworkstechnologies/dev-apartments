"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
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
  icon: LucideIcon;
};

const IMAGE_PATH = "/images/project-highlights-banner.png";

const highlights: HighlightItem[] = [
  {
    id: 1,
    title: "Uncompromising Safety",
    description:
      "24/7 security personnel, gated perimeters, modern CCTV surveillance. Controlled visitor entry ensures no unauthorized access.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Traditional Architectural Style",
    description:
      "Thinnai entrance for receiving guests. Native sloped roof brings life and character to the community.",
    icon: Armchair,
  },
  {
    id: 3,
    title: "Clean & Green Surroundings",
    description:
      "Native landscaped trees and plants along roads, pollution-free environment with eco-friendly rainwater harvesting.",
    icon: Leaf,
  },
  {
    id: 4,
    title: "Well Connected Indoor Spaces",
    description:
      "Thoughtfully designed open layouts that prioritize flow, light, and connectivity between living spaces.",
    icon: Waypoints,
  },
  {
    id: 5,
    title: "Spacious Bedrooms",
    description:
      "Generously sized bedrooms designed for comfort, privacy, and restful living.",
    icon: BedDouble,
  },
  {
    id: 6,
    title: "Exclusive Land Ownership",
    description:
      "No UDS model. Every villa comes with exclusive individual land area — full ownership, full freedom.",
    icon: Map,
  },
  {
    id: 7,
    title: "Kids Play Area",
    description:
      "Dedicated safe and fun play zones designed for children within the community.",
    icon: Gamepad2,
  },
  {
    id: 8,
    title: "EV Charging Ready",
    description:
      "Dedicated EV charging point provided for each villa, future-ready for electric vehicles.",
    icon: BatteryCharging,
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardEntryAnimations = [
  { x: -55, y: 18, rotate: -1.5 },
  { x: 55, y: 18, rotate: 1.5 },
  { x: -35, y: 45, rotate: -1 },
  { x: 35, y: -45, rotate: 1 },
  { x: -60, y: 0, rotate: -1.5 },
  { x: 60, y: 0, rotate: 1.5 },
  { x: 0, y: 55, rotate: -0.8 },
  { x: 0, y: 55, rotate: 0.8 },
];

function createCardVariants(index: number): Variants {
  const animation =
    cardEntryAnimations[index % cardEntryAnimations.length];

  return {
    hidden: {
      opacity: 0,
      x: animation.x,
      y: animation.y,
      rotate: animation.rotate,
      scale: 0.94,
      filter: "blur(8px)",
    },

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
        damping: 16,
        mass: 0.8,
        delay: index * 0.06,
      },
    },
  };
}

export default function Highlights() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="project-highlights"
      className="relative w-full overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24 xl:px-16 xl:py-28"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[20%] h-[380px] w-[380px] rounded-full bg-[#bd9253]/[0.04] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-[10%] h-[420px] w-[420px] rounded-full bg-[#bd9253]/[0.04] blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1450px]">
        {/* Heading */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 35,
                  scale: 0.96,
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
            amount: 0.4,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease,
          }}
          className="text-center"
        >
          <h2 className="font-serif text-[31px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#172039] sm:text-[39px] md:text-[45px] lg:text-[51px]">
            Project Highlights
          </h2>

          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
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
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : 0.18,
              ease,
            }}
            className="mt-2 font-secondary text-[10px] leading-relaxed text-[#aaa6a1] sm:text-[11px] md:text-[12px]"
          >
            What makes Divya Desam truly special
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
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.28,
              ease,
            }}
            className="mx-auto mt-3 block h-[2px] w-[46px] origin-center bg-[#b88d48] sm:w-[58px]"
          />
        </motion.div>

        {/* Main banner image */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 45,
                  scale: 0.97,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            delay: reduceMotion ? 0 : 0.08,
            ease,
          }}
          className="group relative mt-10 h-[210px] w-full overflow-hidden rounded-[16px] bg-[#e9dfd2] shadow-[0_18px_55px_rgba(57,42,26,0.12)] sm:mt-12 sm:h-[280px] sm:rounded-[20px] md:h-[330px] lg:mt-14 lg:h-[360px] lg:rounded-[22px] xl:h-[390px]"
        >
          <motion.div
            initial={{
              scale: reduceMotion ? 1 : 1.08,
            }}
            whileInView={{
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.4,
              ease,
            }}
            className="absolute inset-0"
          >
            <Image
              src={IMAGE_PATH}
              alt="Divya Desam premium villa community"
              fill
              priority
              unoptimized
              draggable={false}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1450px"
              className="select-none object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
            />
          </motion.div>

          {/* Image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/[0.08] via-transparent to-[#e9a242]/[0.08]" />

          {/* Light sweep */}
          <div className="pointer-events-none absolute inset-y-0 -left-[45%] w-[35%] rotate-[10deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-[1100ms] group-hover:left-[115%]" />
        </motion.div>

        {/* Highlight cards */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="mt-9 grid grid-cols-1 gap-5 sm:mt-11 sm:gap-6 md:grid-cols-2 lg:mt-12 lg:gap-x-8 lg:gap-y-9 xl:gap-x-10"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.id}
                variants={
                  reduceMotion ? undefined : createCardVariants(index)
                }
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -9,
                        scale: 1.012,
                        boxShadow:
                          "0 24px 60px rgba(43,38,30,0.11)",
                      }
                }
                className="group relative min-h-[160px] overflow-hidden rounded-[18px] border border-[#eeeae4] bg-white px-5 py-6 shadow-[0_10px_35px_rgba(48,43,36,0.055)] sm:min-h-[170px] sm:px-6 sm:py-7 lg:min-h-[185px] lg:rounded-[20px] lg:px-7 lg:py-8"
              >
                {/* Gold top border */}
                <span className="absolute left-0 top-0 h-[3px] w-0 bg-[#b88d48] transition-all duration-500 group-hover:w-full" />

                {/* Soft hover background */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#b88d48]/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            rotate: [0, -7, 7, 0],
                          }
                    }
                    transition={{
                      duration: 0.5,
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#faf7f1] text-[#b88d48] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#b88d48] group-hover:text-white group-hover:shadow-[0_10px_25px_rgba(184,141,72,0.28)] sm:h-12 sm:w-12 sm:rounded-[14px]"
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </motion.div>

                  {/* Content */}
                  <div className="mt-5">
                    <h3 className="font-primary text-[14px] font-semibold leading-tight tracking-[-0.015em] text-[#172039] sm:text-[15px] lg:text-[17px]">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-[650px] font-secondary text-[10px] leading-[1.6] text-[#9a9894] sm:text-[11px] lg:text-[12px] lg:leading-[1.7]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Decorative corner */}
                <span className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 scale-0 rounded-full bg-[#b88d48]/[0.08] transition-transform duration-500 group-hover:scale-100" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}