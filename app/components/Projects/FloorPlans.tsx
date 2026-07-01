"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
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

  return (
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
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
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
              variants={reduceMotion ? undefined : cardVariants}
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

              {/* Floor plan image */}
              <div
                className="
                  relative
                  h-[260px] w-full
                  overflow-hidden
                  bg-white

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

                {/* Subtle image background */}
                <div
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
                {/* Title and area */}
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

                {/* View details link */}
                <a
                  href={plan.href}
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
                </a>
              </div>

              {/* Hover background effect */}
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
  );
}