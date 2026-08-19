"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

type ImagePanel = {
  id: number;
  image: string;
  direction: "top" | "bottom";
};

const imagePanels: ImagePanel[] = [
  {
    id: 1,
    image: "/images/dd-01.png",
    direction: "top",
  },
  {
    id: 2,
    image: "/images/dd-02.png",
    direction: "bottom",
  },
  {
    id: 3,
    image: "/images/dd-03.png",
    direction: "top",
  },
  {
    id: 4,
    image: "/images/dd-04.png",
    direction: "bottom",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const getPanelVariants = (
  direction: "top" | "bottom",
): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === "top" ? -55 : 55,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 75,
      damping: 16,
      mass: 0.8,
    },
  },
});

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      delay: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function DivyaDesamFeature() {
  return (
    <section
      className="
        relative overflow-hidden
        bg-white
        px-4 py-14
        sm:px-6 sm:py-16
        lg:px-8 lg:py-20
        xl:px-10 xl:py-24
      "
    >
      <div
        className="
          pointer-events-none absolute
          -left-32 top-1/2
          h-[300px] w-[300px]
          -translate-y-1/2
          rounded-full
          bg-[#b88d48]/[0.05]
          blur-3xl
        "
      />

      <div
        className="
          relative mx-auto
          grid w-full max-w-[1360px]
          items-center gap-14
          lg:grid-cols-[1.08fr_0.92fr]
          lg:gap-14
          xl:gap-20
        "
      >
        {/* Image panels */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="
            mx-auto grid w-full
            max-w-[520px]
            grid-cols-4
            items-center
            gap-2.5
            sm:max-w-[600px]
            sm:gap-3.5
            lg:mx-0
            lg:max-w-[640px]
            lg:gap-4
            xl:max-w-[690px]
            xl:gap-5
          "
        >
          {imagePanels.map((panel, index) => {
            const raised =
              index === 0 || index === 2;

            return (
              <motion.div
                key={panel.id}
                variants={getPanelVariants(
                  panel.direction,
                )}
                whileHover={{
                  y: raised ? -16 : 16,
                  scale: 1.018,
                  transition: {
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                  },
                }}
                className={`
                  group relative
                  w-full overflow-hidden
                  rounded-[9px]
                  shadow-[0_16px_36px_rgba(45,32,21,0.14)]
                  sm:rounded-[11px]
                  lg:rounded-[12px]

                  ${raised
                    ? `
                        h-[235px]
                        -translate-y-5
                        sm:h-[310px]
                        sm:-translate-y-7
                        lg:h-[370px]
                        lg:-translate-y-9
                        xl:h-[410px]
                      `
                    : `
                        h-[275px]
                        translate-y-5
                        sm:h-[355px]
                        sm:translate-y-7
                        lg:h-[420px]
                        lg:translate-y-9
                        xl:h-[460px]
                      `
                  }
                `}
              >
                <img
                  src={panel.image}
                  alt={`Divya Desam residence ${panel.id}`}
                  draggable={false}
                  className="
                    h-full w-full
                    object-cover object-center
                    transition-transform
                    duration-[900ms]
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:scale-[1.045]
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/[0.08]
                    via-transparent
                    to-white/[0.03]
                  "
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Content */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            mx-auto w-full
            max-w-[510px]
            text-center
            lg:mx-0
            lg:text-left
          "
        >
          <div className="relative h-[42px] w-[180px] sm:h-[48px] sm:w-[140px]">
            <Image
              src="/icons/divya-desam-icon.svg"
              alt="Divya Desam"
              fill
              sizes="(max-width: 640px) 180px, 140px"
              className="object-contain object-center"
            />
          </div>

          <h2
            className="
              mt-3
              text-[30px] font-semibold
              leading-[1.08]
              tracking-[-0.035em]
              text-[#17130f]
              sm:text-[38px]
              lg:text-[42px]
              xl:text-[47px]
            "
          >
            Begin your family&apos;s next
            <span className="block text-[#ad8142]">
              beautiful chapter
            </span>
          </h2>

          <p
            className="
              mx-auto mt-5
              max-w-[470px]
              text-[13px] leading-6
              text-[#827b75]
              sm:text-[14px]
              sm:leading-7
              lg:mx-0
            "
          >
            Spacious homes, trusted craftsmanship and a
            vibrant community await you at Divya Desam.
          </p>

          <div className="mt-7 flex justify-center lg:justify-start">
            <Link
              href="/divya-desam"
              className="
                group inline-flex
                min-h-[44px]
                items-center justify-center
                rounded-full
                border border-[#d9c4a5]
                bg-white
                px-5
                text-[12px] font-semibold
                text-[#28211c]
                shadow-[0_8px_22px_rgba(55,40,26,0.06)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[#b88d48]
                hover:bg-[#b88d48]
                hover:text-white
                sm:min-h-[46px]
                sm:px-6
                sm:text-[13px]
              "
            >
              Get Started

              <span
                className="
                  ml-2 transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}