"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const contentContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.14,
    },
  },
};

const eyebrowAnimation: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease,
    },
  },
};

const headingLineAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    rotateX: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const descriptionAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: "blur(6px)",
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

const breadcrumbContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const breadcrumbItem: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

export default function AboutBanner() {
  return (
    <section className="pt-[95px] sm:pt-[100px] lg:pt-[105px]">
      <div className="overflow-hidden bg-white">
        <div
          className="
            mx-auto grid w-full max-w-[1440px]
            grid-cols-1 items-center
            gap-8 px-4 py-5
            sm:px-6 sm:py-7
            lg:grid-cols-2 lg:gap-10 lg:px-8
            xl:grid-cols-[650px_minmax(0,1fr)]
            xl:gap-14
          "
        >
          {/* Left image */}
          <motion.div
            initial={{
              opacity: 0,
              x: -70,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.9,
              ease,
            }}
            className="
              relative aspect-[650/320]
              w-full overflow-hidden
              rounded-[12px]
            "
          >
            {/* Image zoom animation */}
            <motion.div
              initial={{
                scale: 1.14,
              }}
              whileInView={{
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 1.4,
                ease,
              }}
              className="absolute inset-0"
            >
              <Image
                src="/images/about-banner.png"
                alt="Modern Dev Appartments residential community"
                fill
                priority
                sizes="
                  (max-width: 1023px) 100vw,
                  (max-width: 1279px) 50vw,
                  650px
                "
                className="object-cover"
              />
            </motion.div>

            {/* Image reveal layer */}
            <motion.div
              initial={{
                x: "0%",
              }}
              whileInView={{
                x: "105%",
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease,
              }}
              className="
                pointer-events-none
                absolute inset-0 z-10
                bg-[#AE8348]
              "
            />

            {/* Soft image gradient */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.65,
              }}
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-tr
                from-black/10 via-transparent
                to-white/5
              "
            />
          </motion.div>

          {/* Right content */}
          <motion.div
            variants={contentContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="
              flex h-full flex-col
              justify-center py-2
              sm:py-4
              lg:py-5
            "
          >
            {/* Small title */}
            <motion.div
              variants={eyebrowAnimation}
              className="mb-4 flex items-center gap-2"
            >
              <motion.span
                initial={{
                  height: 0,
                }}
                whileInView={{
                  height: 24,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.55,
                  delay: 0.25,
                  ease,
                }}
                className="w-[2px] bg-[#AE8348]"
              />

              <motion.span
                initial={{
                  letterSpacing: "0.18em",
                }}
                whileInView={{
                  letterSpacing: "0.02em",
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  ease,
                }}
                className="
                  text-[12px] font-medium
                  text-[#AE8348]
                "
              >
                About
              </motion.span>
            </motion.div>

            {/* Heading */}
            <h1
              className="
                max-w-[570px]
                text-[30px] font-semibold
                leading-[1.06]
                tracking-[-0.03em]
                text-[#111111]
                sm:text-[38px]
                lg:text-[42px]
                xl:text-[46px]
              "
              style={{
                perspective: "800px",
              }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  variants={headingLineAnimation}
                  className="block origin-bottom"
                >
                  Where{" "}
                  <span className="text-[#AE8348]">
                    Comfort Meets
                  </span>
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span
                  variants={headingLineAnimation}
                  className="block origin-bottom"
                >
                  <span className="text-[#AE8348]">
                    Contemporary
                  </span>{" "}
                  Living.
                </motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              variants={descriptionAnimation}
              className="
                mt-5 text-[14px]
                font-medium leading-6
                text-[#222222]
                sm:text-[15px]
                lg:mt-6
              "
            >
              Comfort. Style. Space. Life. Elevated.
            </motion.p>

            {/* Breadcrumb */}
            <motion.nav
              variants={breadcrumbContainer}
              aria-label="Breadcrumb"
              className="
                mt-8 flex items-center gap-3
                sm:mt-9
                lg:mt-10
              "
            >
              <motion.div
                variants={breadcrumbItem}
                whileHover={{
                  y: -3,
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <Link
                  href="/"
                  className="
                    inline-flex min-h-[38px]
                    items-center justify-center
                    rounded-full
                    border border-[#AE8348]/70
                    px-5
                    text-[13px] font-medium
                    text-[#1a1a1a]
                    transition-all duration-300
                    hover:border-[#AE8348]
                    hover:bg-[#AE8348]
                    hover:text-white
                    hover:shadow-[0_8px_22px_rgba(174,131,72,0.22)]
                  "
                >
                  Home
                </Link>
              </motion.div>

              <motion.div
                variants={breadcrumbItem}
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center"
              >
                <ChevronRight
                  size={19}
                  strokeWidth={1.7}
                  className="text-[#AE8348]"
                  aria-hidden="true"
                />
              </motion.div>

              <motion.div
                variants={breadcrumbItem}
                whileHover={{
                  y: -3,
                  scale: 1.04,
                }}
              >
                <span
                  aria-current="page"
                  className="
                    inline-flex min-h-[38px]
                    items-center justify-center
                    rounded-full
                    border border-[#AE8348]/70
                    bg-white px-5
                    text-[13px] font-medium
                    text-[#1a1a1a]
                    transition-all duration-300
                    hover:border-[#AE8348]
                    hover:bg-[#AE8348]/10
                    hover:shadow-[0_8px_22px_rgba(174,131,72,0.14)]
                  "
                >
                  About
                </span>
              </motion.div>
            </motion.nav>
          </motion.div>
        </div>
      </div>
    </section>
  );
}