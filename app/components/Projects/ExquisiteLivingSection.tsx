"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

type ProjectStat = {
  label: string;
  value: string;
};

const projectStats: ProjectStat[] = [
  {
    label: "Total Units",
    value: "22 Premium Homes",
  },
  {
    label: "Typical Floor Area",
    value: "1,850 - 2,400 sq.ft",
  },
  {
    label: "Structure",
    value: "Stilt + 5 Floors",
  },
  {
    label: "Villa",
    value: "T2",
  },
];

const ease: [
  number,
  number,
  number,
  number,
] = [0.22, 1, 0.36, 1];

export default function ExquisiteLivingSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="
        relative w-full overflow-hidden
        bg-[#fffefa]

        px-4 py-14
        sm:px-6 sm:py-16
        md:px-8
        lg:px-12 lg:py-20
        xl:px-16 xl:py-24
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-40 top-1/2
          h-[400px] w-[400px]
          -translate-y-1/2
          rounded-full
          bg-[#b88d48]/[0.04]
          blur-3xl
        "
      />

      <div
        className="
          relative z-10 mx-auto
          grid w-full max-w-[1500px]
          items-center gap-10

          lg:grid-cols-[0.95fr_1.05fr]
          lg:gap-14

          xl:grid-cols-[0.9fr_1.1fr]
          xl:gap-20
        "
      >
        {/* Left content */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -45,
                  filter: "blur(8px)",
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease,
          }}
          className="
            order-2
            lg:order-1
          "
        >
          {/* Heading */}
          <motion.h2
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
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
              duration: reduceMotion ? 0 : 0.65,
              ease,
            }}
            className="
              font-primary font-bold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#11100e]

              text-[30px]
              sm:text-[38px]
              md:text-[42px]
              lg:text-[44px]
              xl:text-[50px]
            "
          >
            Exquisite Living{" "}
            <span className="text-[#b88d48]">
              Redefined
            </span>
          </motion.h2>

          {/* Intro */}
          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
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
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.1,
              ease,
            }}
            className="
              mt-4 max-w-[690px]
              font-secondary
              text-[12px] leading-[1.65]
              text-[#98938d]

              sm:text-[13px]
              md:text-[14px]
            "
          >
            Dev Appartments presents Divya Desam, a sanctuary
            of peace and modern luxury nestled in Chennai&apos;s
            most sought-after residential corridor.
          </motion.p>

          {/* Underline */}
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
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.2,
              ease,
            }}
            className="
              mt-4 h-[2px] w-[72px]
              origin-left bg-[#b88d48]

              sm:w-[82px]
            "
          />

          {/* Statistics */}
          <div
            className="
              mt-8 grid grid-cols-2
              gap-x-5 gap-y-7

              sm:mt-10
              sm:grid-cols-4
              sm:gap-x-6

              lg:gap-x-5
              xl:gap-x-8
            "
          >
            {projectStats.map(
              (stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 22,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.55,
                    delay: reduceMotion
                      ? 0
                      : 0.2 + index * 0.08,
                    ease,
                  }}
                >
                  <p
                    className="
                      font-primary
                      text-[10px] font-semibold
                      leading-[1.4]
                      text-[#b88d48]

                      sm:text-[11px]
                      lg:text-[12px]
                    "
                  >
                    {stat.label}
                  </p>

                  <p
                    className="
                      mt-2 font-secondary
                      text-[11px] leading-[1.5]
                      text-[#89847e]

                      sm:text-[12px]
                      lg:text-[13px]
                    "
                  >
                    {stat.value}
                  </p>
                </motion.div>
              ),
            )}
          </div>

          {/* Description */}
          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
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
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.38,
              ease,
            }}
            className="
              mt-9 max-w-[720px]
              font-secondary
              text-[12px] leading-[1.7]
              text-[#8e8983]

              sm:mt-11
              sm:text-[13px]
              sm:leading-[1.8]

              lg:text-[14px]
            "
          >
            Divya Desam combines the serenity of traditional
            layouts with the functionality of contemporary
            design. Each residence is crafted to allow maximum
            natural ventilation, with three-side open layouts
            that capture the soothing ECR breeze.
          </motion.p>
        </motion.div>

        {/* Right image section */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 55,
                  scale: 0.96,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease,
          }}
          className="
            group relative order-1
            w-full overflow-hidden

            rounded-[18px]
            bg-[#eee5d8]

            h-[280px]

            shadow-[0_20px_65px_rgba(79,57,34,0.13)]

            sm:h-[380px]
            sm:rounded-[22px]

            md:h-[430px]

            lg:order-2
            lg:h-[500px]
            lg:rounded-[26px]

            xl:h-[550px]
          "
        >
          {/* Image */}
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
              src="/images/desam-about.png"
              alt="Divya Desam premium residential villas"
              fill
              priority
              quality={95}
              sizes="
                (max-width: 639px) 100vw,
                (max-width: 1023px) 100vw,
                55vw
              "
              draggable={false}
              className="
                select-none object-cover
                object-center

                transition-transform
                duration-[1400ms]
                ease-out

                group-hover:scale-[1.025]
              "
            />
          </motion.div>

          {/* Image reveal curtain */}
          {!reduceMotion && (
            <motion.div
              initial={{
                scaleX: 1,
              }}
              whileInView={{
                scaleX: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 1,
                delay: 0.12,
                ease,
              }}
              className="
                pointer-events-none
                absolute inset-0 z-20
                origin-right
                bg-[#eee5d8]
              "
            />
          )}

          {/* Image overlay */}
          <div
            className="
              pointer-events-none
              absolute inset-0 z-10

              bg-gradient-to-t
              from-[#3f2b18]/10
              via-transparent
              to-white/[0.04]
            "
          />

          {/* Bottom gold line */}
          <motion.span
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.75,
              ease,
            }}
            className="
              absolute bottom-0 left-0
              z-30 h-[3px] w-[35%]
              origin-left bg-[#b88d48]
            "
          />
        </motion.div>
      </div>
    </section>
  );
}