"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* ======================================================
   TYPES
====================================================== */

export interface DynamicTextPart {
  text: string;
  highlight?: boolean;
}

export interface DynamicProjectsHeader {
  titleLines: DynamicTextPart[][];
  description: string;
}

export interface DynamicProjectDetail {
  label: string;
  value: string;
}

export interface DynamicProjectTag {
  label: string;
}

export interface DynamicProjectButton {
  label: string;
  href: string;
  variant?: "primary" | "outline";
  showArrow?: boolean;
}

export interface DynamicProjectImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface DynamicProjectItem {
  id: string | number;
  title: DynamicTextPart[];
  description: string;
  details?: DynamicProjectDetail[];
  tags?: DynamicProjectTag[];
  buttons?: DynamicProjectButton[];
  images?: DynamicProjectImage[];
}

export interface DynamicProjectsSectionProps {
  header: DynamicProjectsHeader;
  projects: DynamicProjectItem[];
  accentColor?: string;
  backgroundColor?: string;
  cardColor?: string;
  sectionClassName?: string;
}

/* ======================================================
   ANIMATION SETTINGS
====================================================== */

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

/* ======================================================
   SECTION HEADING ANIMATION
====================================================== */

const headingContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const headingLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

const headingDescriptionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

/* ======================================================
   PROJECT CARD ANIMATION
====================================================== */

const cardVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -50 : 50,
    y: 36,
    scale: 0.985,
  }),

  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,

    transition: {
      duration: 1,
      ease: smoothEase,

      // Children begin while the card is entering.
      staggerChildren: 0.08,
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -38,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

const buttonsVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 38,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

const detailsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: smoothEase,
      staggerChildren: 0.08,
    },
  },
};

const detailRowVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -22,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.75,
      ease: smoothEase,
    },
  },
};

const tagsContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -26,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: smoothEase,
      staggerChildren: 0.055,
    },
  },
};

const tagVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -14,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

const imagesContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const imageVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -44 : 44,
    y: 26,
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
   SECTION HEADING
====================================================== */

function ProjectsSectionHeading({
  header,
  accentColor,
  reduceMotion,
}: {
  header: DynamicProjectsHeader;
  accentColor: string;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      variants={headingContainerVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
        margin: "0px 0px -30px 0px",
      }}
      className="
        mx-auto w-full
        max-w-[680px]
        text-center
      "
    >
      <h2
        className="
          text-[28px] font-semibold
          leading-[1.05]
          tracking-[-0.035em]
          text-[#050505]

          sm:text-[32px]
          md:text-[36px]
          lg:text-[40px]
        "
      >
        {header.titleLines.map((line, lineIndex) => (
          <span
            key={`header-line-${lineIndex}`}
            className="block overflow-hidden"
          >
            <motion.span
              variants={headingLineVariants}
              className="block"
              style={{
                willChange: "transform, opacity",
              }}
            >
              {line.map((part, partIndex) => (
                <span
                  key={`header-part-${lineIndex}-${partIndex}`}
                  style={{
                    color: part.highlight
                      ? accentColor
                      : undefined,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.p
        variants={headingDescriptionVariants}
        className="
          mx-auto mt-5
          max-w-[590px]
          text-[11px] font-normal
          leading-[1.6]
          text-[#929292]

          sm:text-[12px]
          md:text-[13px]
        "
      >
        {header.description}
      </motion.p>
    </motion.div>
  );
}

/* ======================================================
   MAIN COMPONENT
====================================================== */

export default function DynamicProjectsSection({
  header,
  projects,
  accentColor = "#B98A49",
  backgroundColor = "#F8F8F8",
  cardColor = "#FFFFFF",
  sectionClassName = "",
}: DynamicProjectsSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={`
        w-full overflow-hidden
        ${sectionClassName}
      `}
      style={{
        backgroundColor,
      }}
    >
      <div
        className="
          mx-auto w-full max-w-[1440px]
          px-4 py-14

          sm:px-6 sm:py-16
          md:py-20
          lg:px-8 lg:py-24
        "
      >
        {/* Section heading */}
        <ProjectsSectionHeading
          header={header}
          accentColor={accentColor}
          reduceMotion={reduceMotion}
        />

        {/* Project cards */}
        <div
          className="
            mt-12 space-y-8

            sm:mt-14
            md:mt-16
            lg:mt-20
            lg:space-y-12
          "
        >
          {projects.map((project, projectIndex) => {
            const details = project.details ?? [];
            const tags = project.tags ?? [];
            const buttons = project.buttons ?? [];
            const images = project.images ?? [];

            return (
              <motion.article
                key={project.id}
                custom={projectIndex}
                variants={cardVariants}
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.12,
                  margin: "0px 0px -30px 0px",
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -6,
                        boxShadow:
                          "0 30px 78px rgba(20,20,20,0.13)",
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 24,
                  mass: 0.9,
                }}
                style={{
                  backgroundColor: cardColor,
                  willChange: "transform, opacity",
                }}
                className="
                  group relative
                  mx-auto w-full
                  max-w-[1240px]
                  overflow-hidden
                  rounded-[20px]
                  border border-black/[0.03]
                  px-5 py-7
                  shadow-[0_18px_55px_rgba(20,20,20,0.10)]

                  sm:px-7 sm:py-8
                  md:px-8 md:py-9
                  lg:px-10 lg:py-10
                "
              >
                {/* Background glow */}
                <div
                  className="
                    pointer-events-none
                    absolute -right-24 -top-24
                    h-60 w-60
                    rounded-full
                    bg-[#B98A49]/[0.04]
                    blur-3xl
                    transition-transform
                    duration-700
                    group-hover:scale-125
                  "
                />

                {/* ==================================================
                    TITLE AND BUTTONS
                ================================================== */}

                <div
                  className="
                    relative z-10
                    grid grid-cols-1 gap-6

                    lg:grid-cols-[minmax(0,1fr)_auto]
                    lg:items-start
                    lg:gap-8
                  "
                >
                  {/* Project title */}
                  <motion.div variants={titleVariants}>
                    <h3
                      className="
                        text-[24px] font-semibold
                        leading-[1.15]
                        tracking-[-0.03em]
                        text-[#050505]

                        sm:text-[27px]
                        md:text-[30px]
                        lg:text-[33px]
                      "
                    >
                      {project.title.map((part, index) => (
                        <span
                          key={`${project.id}-title-${index}`}
                          style={{
                            color: part.highlight
                              ? accentColor
                              : undefined,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </h3>

                    <p
                      className="
                        mt-4 max-w-[560px]
                        text-[12px] font-normal
                        leading-[1.6]
                        text-[#8B8B8B]

                        sm:text-[13px]
                        md:text-[14px]
                      "
                    >
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Project buttons */}
                  {buttons.length > 0 && (
                    <motion.div
                      variants={buttonsVariants}
                      className="
                        flex flex-wrap
                        items-center gap-3
                        lg:justify-end
                      "
                    >
                      {buttons.map((button) => {
                        const isPrimary =
                          button.variant === "primary";

                        return (
                          <motion.div
                            key={`${project.id}-${button.label}`}
                            whileHover={
                              reduceMotion
                                ? undefined
                                : {
                                    y: -3,
                                    scale: 1.035,
                                  }
                            }
                            whileTap={{
                              scale: 0.96,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                            }}
                          >
                            <Link
                              href={button.href}
                              className="
                                inline-flex min-h-[40px]
                                items-center justify-center
                                gap-2 rounded-full
                                border px-5
                                text-[11px] font-semibold
                                transition-colors duration-300

                                sm:min-h-[42px]
                                sm:px-6
                                sm:text-[12px]
                              "
                              style={{
                                backgroundColor: isPrimary
                                  ? accentColor
                                  : "#FFFFFF",

                                borderColor: accentColor,

                                color: isPrimary
                                  ? "#FFFFFF"
                                  : "#171717",

                                boxShadow: isPrimary
                                  ? "0 10px 24px rgba(185,138,73,0.22)"
                                  : undefined,
                              }}
                            >
                              {button.label}

                              {button.showArrow && (
                                <motion.span
                                  animate={
                                    reduceMotion
                                      ? undefined
                                      : {
                                          x: [0, 3, 0],
                                        }
                                  }
                                  transition={{
                                    duration: 1.6,
                                    repeat: Infinity,
                                    repeatDelay: 1.2,
                                    ease: "easeInOut",
                                  }}
                                  className="inline-flex"
                                >
                                  <ArrowRight
                                    size={16}
                                    strokeWidth={2}
                                  />
                                </motion.span>
                              )}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>

                {/* ==================================================
                    DETAILS AND TAGS
                ================================================== */}

                {(details.length > 0 ||
                  tags.length > 0) && (
                  <div
                    className="
                      relative z-10
                      mt-7 grid grid-cols-1
                      gap-7

                      md:mt-8
                      lg:grid-cols-[0.9fr_1.1fr]
                      lg:items-start
                      lg:gap-12
                    "
                  >
                    {/* Project details */}
                    {details.length > 0 && (
                      <motion.div
                        variants={detailsVariants}
                        className="w-full"
                      >
                        {details.map(
                          (detail, detailIndex) => (
                            <motion.div
                              key={`${project.id}-${detail.label}`}
                              variants={detailRowVariants}
                              className={`
                                grid grid-cols-[auto_1fr]
                                items-center gap-5
                                py-3

                                sm:grid-cols-[180px_1fr]
                                sm:gap-8

                                ${
                                  detailIndex !==
                                  details.length - 1
                                    ? "border-b border-black/[0.12]"
                                    : ""
                                }
                              `}
                            >
                              <span
                                className="
                                  text-[13px] font-semibold
                                  text-[#161616]

                                  sm:text-[14px]
                                  md:text-[15px]
                                "
                              >
                                {detail.label}
                              </span>

                              <span
                                className="
                                  text-right
                                  text-[12px] font-medium
                                  text-[#686868]

                                  sm:text-[13px]
                                  md:text-[14px]
                                "
                              >
                                {detail.value}
                              </span>
                            </motion.div>
                          ),
                        )}
                      </motion.div>
                    )}

                    {/* Project tags */}
                    {tags.length > 0 && (
                      <motion.div
                        variants={tagsContainerVariants}
                        className="
                          flex flex-wrap gap-2.5
                          lg:justify-end
                        "
                      >
                        {tags.map((tag) => (
                          <motion.span
                            key={`${project.id}-${tag.label}`}
                            variants={tagVariants}
                            whileHover={
                              reduceMotion
                                ? undefined
                                : {
                                    y: -3,
                                    scale: 1.04,
                                    backgroundColor:
                                      "rgba(185,138,73,0.09)",
                                  }
                            }
                            transition={{
                              type: "spring",
                              stiffness: 250,
                              damping: 20,
                            }}
                            className="
                              inline-flex min-h-[32px]
                              items-center justify-center
                              rounded-full border
                              bg-white px-4
                              text-center
                              text-[9px] font-medium
                              text-[#505050]

                              sm:px-5
                              sm:text-[10px]
                            "
                            style={{
                              borderColor: `${accentColor}99`,
                            }}
                          >
                            {tag.label}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* ==================================================
                    PROJECT IMAGES
                ================================================== */}

                {images.length > 0 && (
                  <motion.div
                    variants={imagesContainerVariants}
                    className={`
                      relative z-10
                      mt-7 grid gap-4

                      md:mt-8

                      ${
                        images.length === 1
                          ? "grid-cols-1"
                          : "grid-cols-1 md:grid-cols-2"
                      }
                    `}
                  >
                    {images.map((image, imageIndex) => (
                      <motion.div
                        key={`${project.id}-image-${imageIndex}`}
                        custom={imageIndex}
                        variants={imageVariants}
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                y: -4,
                                scale: 1.008,
                              }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 190,
                          damping: 23,
                        }}
                        style={{
                          willChange:
                            "transform, opacity",
                        }}
                        className="
                          group/image relative
                          aspect-[16/8.4]
                          w-full overflow-hidden
                          rounded-[12px]
                          bg-[#F1F1F1]
                        "
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="
                            (max-width: 767px) 100vw,
                            (max-width: 1439px) 50vw,
                            580px
                          "
                          style={{
                            objectPosition:
                              image.objectPosition ??
                              "center",
                          }}
                          className="
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover/image:scale-[1.045]
                          "
                        />

                        <div
                          className="
                            pointer-events-none
                            absolute inset-0
                            bg-gradient-to-t
                            from-black/[0.07]
                            via-transparent
                            to-white/[0.03]
                          "
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}