"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type SpecificationItem = {
  number: string;
  title: string;
  image: string;
  points: string[];
};

const specifications: SpecificationItem[] = [
  {
    number: "01",
    title: "Structure",
    image: "/images/structure.png",
    points: [
      "RCC Framed structure with Isolated foundations - (Seismic zone III Compliant)",
    ],
  },
  {
    number: "02",
    title: "Tiling",
    image: "/images/tiling.png",
    points: [
      "Branded high-end Traditional Floor tiles with skirting.",
      "Toilets Branded Glazed tiles upto 7'-6\" ht from Finished floor level.",
      "Anti skid flooring for toilets.",
      "All weather proof tiles for terrace.",
      "Granite flooring for Staircase.",
      "Car parking and side setbacks - paver flooring",
    ],
  },
  {
    number: "03",
    title: "Doors",
    image: "/images/doors.png",
    points: [
      "Main Door - Solid Teak wood premium finish",
      "Internal door - Flush door",
      "Toilet Door Flush door",
    ],
  },
  {
    number: "04",
    title: "Windows",
    image: "/images/windows.png",
    points: [
      "Windows –UPVC",
      "Ventilators – UPVC",
      "Staircase and Balcony railing - Galvanized iron to prevent for rusting.",
    ],
  },
  {
    number: "05",
    title: "Plumbing and Sanitary Fixtures",
    image: "/images/plumbing.png",
    points: [
      "Inner pipe lines",
      "Sanitary Fixtures : Parryware / equivalent",
      "CP Fittings : Parryware / equivalent",
    ],
  },
  {
    number: "06",
    title: "Electrical Fixtures /Fittings",
    image: "/images/electrical.png",
    points: [
      "Supply - 3phase power supply will be provided",
      "Cables and wires",
      "Switches and sockets",
      "MCB /ELCB and DB",
    ],
  },
  {
    number: "07",
    title: "Landscaping",
    image: "/images/landscaping.png",
    points: [
      "External hard and soft landscape with Native species of trees and plants.",
    ],
  },
  {
    number: "08",
    title: "Other features",
    image: "/images/other-features.png",
    points: [
      "Underground sump with Metro water connection in future.",
      "Septic tank - Soak pit connection to sewage system for future.",
      "Individual bore well for water supply for each villa.",
    ],
  },
];

/* Entire card enters smoothly from below */
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 90,
    scale: 0.965,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* Image enters from its corresponding side */
const imageVariants: Variants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 90,
    scale: 1.1,
    clipPath: "inset(8% 8% 8% 8%)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 1.2,
      delay: 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* Content enters from the opposite side */
const contentVariants: Variants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 65,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      delay: 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* Content appears one by one */
const contentContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.28,
      staggerChildren: 0.1,
    },
  },
};

const contentItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* Bullet points enter one by one */
const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.55,
      staggerChildren: 0.08,
    },
  },
};

const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -18,
    y: 8,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function PremiumSpecifications() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full overflow-x-clip bg-[#FAF8F5]">
      {/* Main section heading */}
      <motion.div
        variants={headingVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.5,
        }}
        className="mx-auto flex min-h-[130px] max-w-8xl items-center px-6 py-9 sm:px-10 lg:px-14"
      >
        <div>
          <motion.span
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-4 block h-[2px] w-12 origin-left bg-[#D4AF37]"
          />

          <h1 className="text-3xl font-black uppercase tracking-[-0.04em] text-[#1A1A1A] sm:text-4xl lg:text-5xl">
            Premium Specifications
          </h1>
        </div>
      </motion.div>

      {/* Stacked specification cards */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        {specifications.map((specification, index) => {
          const imageIsLeft = index % 2 === 0;
          const lightBackground = index % 2 === 0;

          return (
            <article
              key={specification.number}
              className="relative w-full lg:sticky lg:top-0 lg:h-[640px]"
              style={{
                zIndex: index + 1,
              }}
            >
              <motion.div
                variants={cardVariants}
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.22,
                  margin: "0px 0px -8% 0px",
                }}
                className={`grid w-full grid-cols-1 overflow-hidden border-t border-[#8E8E93]/15 shadow-[0_-18px_45px_rgba(0,0,0,0.06)] lg:h-[640px] lg:grid-cols-2 ${
                  lightBackground ? "bg-white" : "bg-[#FAF8F5]"
                }`}
              >
                {/* Responsive image */}
                <motion.div
                  custom={imageIsLeft ? -1 : 1}
                  variants={imageVariants}
                  className={`group relative aspect-[9/8] w-full overflow-hidden sm:aspect-[16/11] lg:h-[640px] lg:aspect-auto ${
                    imageIsLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={specification.image}
                    alt={specification.title}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 1023px) 100vw, 720px"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.025]"
                  />

                  {/* Soft image overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {/* Gold light sweep */}
                  <motion.div
                    initial={reduceMotion ? false : { x: "-130%" }}
                    whileInView={{ x: "150%" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.4,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.div>

                {/* Specification content */}
                <motion.div
                  custom={imageIsLeft ? 1 : -1}
                  variants={contentVariants}
                  className={`relative flex min-h-[400px] items-center overflow-hidden px-6 py-12 sm:min-h-[440px] sm:px-10 sm:py-16 lg:h-[640px] lg:min-h-0 lg:px-14 lg:py-16 xl:px-20 ${
                    imageIsLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* Decorative background number */}
                  <motion.span
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.035, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-4 text-[110px] font-black leading-none text-[#1A1A1A] sm:text-[150px] lg:right-8 lg:top-8 lg:text-[190px]"
                  >
                    {specification.number}
                  </motion.span>

                  <motion.div
                    variants={contentContainerVariants}
                    className="relative z-10 w-full max-w-[560px]"
                  >
                    {/* Number */}
                    <motion.div
                      variants={contentItemVariants}
                      className="mb-2 flex items-center gap-2"
                    >
                      <span className="text-base font-bold tracking-[0.06em] text-[#D4AF37] sm:text-lg">
                        {specification.number}
                      </span>

                      <span className="text-base font-bold text-[#D4AF37]">
                        /
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      variants={contentItemVariants}
                      className="max-w-[520px] text-3xl font-black uppercase leading-[1.08] tracking-[-0.045em] text-[#1A1A1A] sm:text-4xl lg:text-[42px]"
                    >
                      {specification.title}
                    </motion.h2>

                    {/* Gold underline */}
                    <motion.span
                      variants={{
                        hidden: {
                          scaleX: 0,
                          opacity: 0,
                        },
                        visible: {
                          scaleX: 1,
                          opacity: 1,
                          transition: {
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                      className="mt-5 block h-[2px] w-10 origin-left bg-[#D4AF37]"
                    />

                    {/* Points */}
                    <motion.ul
                      variants={listVariants}
                      className="mt-8 space-y-4 sm:mt-10"
                    >
                      {specification.points.map((point) => (
                        <motion.li
                          key={point}
                          variants={listItemVariants}
                          className="grid grid-cols-[7px_1fr] items-start gap-3 text-sm leading-6 text-[#66625F] sm:grid-cols-[8px_1fr] sm:gap-4 sm:text-[15px] sm:leading-7"
                        >
                          <motion.span
                            variants={{
                              hidden: {
                                scale: 0,
                                rotate: -45,
                              },
                              visible: {
                                scale: 1,
                                rotate: 0,
                                transition: {
                                  duration: 0.45,
                                  ease: [0.16, 1, 0.3, 1],
                                },
                              },
                            }}
                            className="mt-[9px] block h-[5px] w-[5px] bg-[#D4AF37]"
                          />

                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </motion.div>
              </motion.div>
            </article>
          );
        })}
      </div>
    </section>
  );
}