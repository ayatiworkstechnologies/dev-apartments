"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

/* ======================================================
   TYPES
====================================================== */

export interface BannerTitleSegment {
  text: string;
  highlight?: boolean;
}

export interface BannerBreadcrumb {
  label: string;
  href?: string;
}

interface DynamicInnerBannerProps {
  eyebrow: string;
  titleLines: BannerTitleSegment[][];
  description: string;

  image: string;
  imageAlt: string;

  breadcrumbs: BannerBreadcrumb[];

  imagePosition?: "left" | "right";
  imageObjectPosition?: string;
  priority?: boolean;

  className?: string;
}

/* ======================================================
   ANIMATION SETTINGS
====================================================== */

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const contentContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
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
      ease: smoothEase,
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
      ease: smoothEase,
    },
  },
};

const descriptionAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: "blur(5px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

const breadcrumbContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const breadcrumbItem: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.94,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
};

/* ======================================================
   COMPONENT
====================================================== */

export default function DynamicInnerBanner({
  eyebrow,
  titleLines,
  description,
  image,
  imageAlt,
  breadcrumbs,
  imagePosition = "left",
  imageObjectPosition = "center",
  priority = true,
  className = "",
}: DynamicInnerBannerProps) {
  const imageOrder =
    imagePosition === "right"
      ? "lg:order-2"
      : "lg:order-1";

  const contentOrder =
    imagePosition === "right"
      ? "lg:order-1"
      : "lg:order-2";

  const desktopGrid =
    imagePosition === "right"
      ? "xl:grid-cols-[minmax(0,1fr)_650px]"
      : "xl:grid-cols-[650px_minmax(0,1fr)]";

  const imageEntryX =
    imagePosition === "right" ? 70 : -70;

  return (
    <section
      className={`
        pt-[95px]
        sm:pt-[100px]
        lg:pt-[105px]
        ${className}
      `}
    >
      <div className="overflow-hidden bg-white">
        <div
          className={`
            mx-auto grid w-full max-w-[1440px]
            grid-cols-1 items-center
            gap-8 px-4 py-5
            sm:px-6 sm:py-7
            lg:grid-cols-2 lg:gap-10 lg:px-8
            ${desktopGrid}
            xl:gap-14
          `}
        >
          {/* Dynamic image */}
          <motion.div
            initial={{
              opacity: 0,
              x: imageEntryX,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.95,
              ease: smoothEase,
            }}
            className={`
              ${imageOrder}
              relative aspect-[650/320]
              w-full overflow-hidden
              rounded-[12px]
            `}
          >
            {/* Image zoom */}
            <motion.div
              initial={{
                scale: 1.12,
              }}
              whileInView={{
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 1.35,
                ease: smoothEase,
              }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority={priority}
                sizes="
                  (max-width: 1023px) 100vw,
                  (max-width: 1279px) 50vw,
                  650px
                "
                style={{
                  objectPosition: imageObjectPosition,
                }}
                className="object-cover"
              />
            </motion.div>

            {/* Gold image reveal */}
            <motion.div
              initial={{
                x:
                  imagePosition === "right"
                    ? "-105%"
                    : "0%",
              }}
              whileInView={{
                x:
                  imagePosition === "right"
                    ? "0%"
                    : "105%",
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 1,
                ease: smoothEase,
              }}
              className={`
                pointer-events-none
                absolute inset-0 z-10
                bg-[#AE8348]
                ${
                  imagePosition === "right"
                    ? "translate-x-full"
                    : ""
                }
              `}
            />

            {/* Soft overlay */}
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
              }}
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-tr
                from-black/10
                via-transparent
                to-white/5
              "
            />
          </motion.div>

          {/* Dynamic content */}
          <motion.div
            variants={contentContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className={`
              ${contentOrder}
              flex h-full flex-col
              justify-center py-2
              sm:py-4
              lg:py-5
            `}
          >
            {/* Eyebrow */}
            <motion.div
              variants={eyebrowAnimation}
              className="mb-4 flex items-center gap-2"
            >
              <motion.span
                initial={{
                  scaleY: 0,
                }}
                whileInView={{
                  scaleY: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.55,
                  ease: smoothEase,
                }}
                className="
                  h-6 w-[2px]
                  origin-bottom
                  bg-[#AE8348]
                "
              />

              <span
                className="
                  text-[12px] font-medium
                  tracking-[0.02em]
                  text-[#AE8348]
                "
              >
                {eyebrow}
              </span>
            </motion.div>

            {/* Dynamic heading */}
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
              {titleLines.map((line, lineIndex) => (
                <span
                  key={`title-line-${lineIndex}`}
                  className="block overflow-hidden"
                >
                  <motion.span
                    variants={headingLineAnimation}
                    className="block origin-bottom"
                  >
                    {line.map((segment, segmentIndex) => (
                      <span
                        key={`segment-${lineIndex}-${segmentIndex}`}
                        className={
                          segment.highlight
                            ? "text-[#AE8348]"
                            : undefined
                        }
                      >
                        {segment.text}
                      </span>
                    ))}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Dynamic description */}
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
              {description}
            </motion.p>

            {/* Dynamic breadcrumbs */}
            <motion.nav
              variants={breadcrumbContainer}
              aria-label="Breadcrumb"
              className="
                mt-8 flex flex-wrap
                items-center gap-3
                sm:mt-9
                lg:mt-10
              "
            >
              {breadcrumbs.map((item, index) => {
                const isCurrent =
                  !item.href ||
                  index === breadcrumbs.length - 1;

                return (
                  <Fragment
                    key={`${item.label}-${index}`}
                  >
                    {index > 0 && (
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
                        className="
                          flex items-center
                          justify-center
                        "
                      >
                        <ChevronRight
                          size={19}
                          strokeWidth={1.7}
                          className="text-[#AE8348]"
                          aria-hidden="true"
                        />
                      </motion.div>
                    )}

                    <motion.div
                      variants={breadcrumbItem}
                      whileHover={{
                        y: -3,
                        scale: 1.04,
                      }}
                      whileTap={
                        item.href
                          ? {
                              scale: 0.96,
                            }
                          : undefined
                      }
                    >
                      {item.href && !isCurrent ? (
                        <Link
                          href={item.href}
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
                          {item.label}
                        </Link>
                      ) : (
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
                          {item.label}
                        </span>
                      )}
                    </motion.div>
                  </Fragment>
                );
              })}
            </motion.nav>
          </motion.div>
        </div>
      </div>
    </section>
  );
}