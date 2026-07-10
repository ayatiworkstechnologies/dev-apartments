"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const smoothEase: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

/* ======================================================
   TITLE ANIMATIONS
====================================================== */

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

const subtitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

/* ======================================================
   CARD ANIMATION
====================================================== */

const cardVariants: Variants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction === -1 ? -70 : 70,
    y: 30,
    scale: 0.97,
  }),

  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: smoothEase,
    },
  },
};

/* ======================================================
   CONTENT ANIMATIONS
====================================================== */

const roleVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.75,
      ease: smoothEase,
    },
  },
};

const nameVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: smoothEase,
    },
  },
};

const descriptionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

/* ======================================================
   FOUNDER DATA
====================================================== */

const founders = [
  {
    role: "MD",
    name: "P.V. Devakumar",
    description:
      "We build every single house to our customers with no compromise in quality as a respect to one's hard earned money and sacrifice.",
    image: "/images/pv-devakumar.png",
    alt: "P.V. Devakumar, Managing Director",
    direction: -1,
  },
  {
    role: "Chairman",
    name: "P.G. Venugopal",
    description: "Providing Value for money is our ultimate goal.",
    image: "/images/pg-venugopal.png",
    alt: "P.G. Venugopal, Chairman",
    direction: 1,
  },
];

export default function FoundersDesk() {
  return (
    <section className="overflow-hidden bg-white">
      <div
        className="
          mx-auto w-full max-w-[1440px]
          px-5 py-14
          sm:px-6 sm:py-16
          lg:px-8 lg:py-20
          xl:py-24
        "
      >
        {/* Heading */}
        <div className="max-w-[650px]">
          <motion.h2
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="
              text-[30px] font-bold
              leading-[1.12]
              tracking-[-0.035em]
              text-[#111111]
              sm:text-[36px]
              lg:text-[40px]
            "
          >
            From the{" "}
            <span className="text-[#AE8348]">
              Founder&apos;s Desk
            </span>
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="
              mt-4 max-w-[560px]
              text-[13px] font-normal
              leading-[1.65]
              text-[#858585]
              sm:text-[14px]
            "
          >
            We build every single house to our customers with no
            compromise in quality as a respect to one&apos;s hard
            earned money and sacrifice.
          </motion.p>
        </div>

        {/* Cards */}
        <div
          className="
            mt-10 grid grid-cols-1
            gap-6
            sm:mt-12
            lg:grid-cols-2
            lg:gap-7
            xl:gap-8
          "
        >
          {founders.map((founder) => (
            <motion.article
              key={founder.name}
              custom={founder.direction}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
                margin: "0px 0px -30px 0px",
              }}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 26px 55px rgba(35, 28, 20, 0.16)",
                transition: {
                  type: "spring",
                  stiffness: 180,
                  damping: 24,
                },
              }}
              className="
                group relative
                min-h-[410px]
                overflow-hidden
                rounded-[12px]
                border border-black/[0.08]
                bg-white
                shadow-[0_16px_34px_rgba(35,28,20,0.13)]
                sm:min-h-[300px]
              "
            >
              {/* Background glow */}
              <div
                className="
                  pointer-events-none
                  absolute -bottom-24 -right-20
                  h-64 w-64
                  rounded-full
                  bg-[#AE8348]/[0.08]
                  blur-3xl
                  transition-transform
                  duration-700
                  group-hover:scale-125
                "
              />

              {/* Top highlight */}
              <div
                className="
                  pointer-events-none
                  absolute inset-x-0 top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#AE8348]/40
                  to-transparent
                "
              />

              {/* Text content */}
              <div
                className="
                  relative z-20
                  max-w-full
                  px-6 py-8
                  sm:max-w-[59%]
                  sm:px-7 sm:py-9
                  xl:px-8 xl:py-10
                "
              >
                <motion.div
                  variants={roleVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                >
                  <span
                    className="
                      inline-flex items-center
                      text-[13px] font-semibold
                      text-[#151515]
                    "
                  >
                    {founder.role}
                  </span>

                  <motion.span
                    variants={lineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    className="
                      mt-2 block
                      h-px w-8
                      origin-left
                      bg-[#AE8348]
                    "
                  />
                </motion.div>

                <motion.h3
                  variants={nameVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  className="
                    mt-4
                    text-[16px]
                    font-semibold
                    leading-tight
                    text-[#171717]
                    sm:text-[17px]
                  "
                >
                  {founder.name}
                </motion.h3>

                <motion.p
                  variants={descriptionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  className="
                    mt-5
                    text-[12px]
                    font-normal
                    leading-[1.65]
                    text-[#838383]
                    sm:text-[13px]
                  "
                >
                  {founder.description}
                </motion.p>
              </div>

              {/* Person image */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: founder.direction === -1 ? -45 : 45,
                  y: 20,
                  scale: 0.94,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.1,
                }}
                transition={{
                  duration: 1,
                  ease: smoothEase,
                }}
                whileHover={{
                  x: -5,
                  scale: 1.03,
                  transition: {
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                  },
                }}
                className="
                  absolute bottom-0 right-0
                  z-10
                  h-[55%] w-[58%]
                  sm:h-[96%]
                  sm:w-[43%]
                  lg:w-[42%]
                  xl:max-w-[226px]
                "
              >
                <Image
                  src={founder.image}
                  alt={founder.alt}
                  fill
                  priority
                  sizes="
                    (max-width: 639px) 58vw,
                    (max-width: 1023px) 38vw,
                    226px
                  "
                  className="
                    select-none
                    object-contain
                    object-bottom
                  "
                />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}