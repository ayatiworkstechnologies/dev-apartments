"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

/* Center image comes first */
const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.25,
      ease: smoothEase,
    },
  },
};

/* Vision card travels from left and attaches */
const visionPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -340,
    scaleX: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scaleX: 1,
    transition: {
      duration: 1.6,
      delay: 0.85,
      ease: smoothEase,
    },
  },
};

/* Mission card travels from right after Vision */
const missionPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 340,
    scaleX: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scaleX: 1,
    transition: {
      duration: 1.6,
      delay: 1.2,
      ease: smoothEase,
    },
  },
};

/* Vision content appears after attaching */
const visionContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: 2.05,
      ease: smoothEase,
    },
  },
};

/* Mission content appears after attaching */
const missionContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: 2.4,
      ease: smoothEase,
    },
  },
};

export default function VisionMission() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.22,
        margin: "0px 0px -70px 0px",
      }}
      className="overflow-hidden bg-white"
    >
      <div
        className="
          mx-auto w-full max-w-[1440px]
          px-5 py-16
          sm:px-6 sm:py-20
          lg:px-8 lg:py-24
          xl:py-28
        "
      >
        <div
          className="
            relative flex flex-col gap-6
            lg:block
            lg:min-h-[430px]
          "
        >
          {/* Center image */}
          <motion.div
            variants={imageVariants}
            className="
              relative z-30
              mx-auto w-full max-w-[350px]

              lg:absolute
              lg:left-1/2
              lg:top-0
              lg:-translate-x-1/2
            "
          >
            <div
              className="
                relative aspect-[350/400]
                w-full overflow-hidden
                rounded-[10px]
                bg-[#FAF8F2]
                shadow-[0_22px_55px_rgba(43,33,22,0.14)]
              "
            >
              <Image
                src="/images/vision-mission.png"
                alt="Dev Appartments interior living space"
                fill
                priority
                sizes="
                  (max-width: 639px) 90vw,
                  (max-width: 1023px) 350px,
                  350px
                "
                className="object-cover"
              />

              <div
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/[0.04]
                  via-transparent
                  to-white/[0.03]
                "
              />
            </div>
          </motion.div>

          {/* Vision and Mission attached background */}
          <div
            className="
              grid grid-cols-1 gap-5

              lg:absolute
              lg:inset-x-0
              lg:top-[70px]
              lg:z-10
              lg:grid-cols-2
              lg:gap-0
            "
          >
            {/* Vision panel */}
            <motion.article
              variants={visionPanelVariants}
              style={{
                transformOrigin: "right center",
                willChange: "transform, opacity",
              }}
              className="
                order-2
                flex min-h-[260px]
                items-center

                rounded-[16px]
                border border-[#E8E1D6]
                bg-[#FAF8F2]

                px-6 py-9

                shadow-[0_22px_42px_rgba(32,25,18,0.14)]

                sm:px-8

                lg:order-1
                lg:min-h-[280px]
                lg:rounded-l-[18px]
                lg:rounded-r-none
                lg:border-r-0
                lg:pl-10
                lg:pr-[205px]

                xl:pl-12
                xl:pr-[225px]
              "
            >
              <motion.div
                variants={visionContentVariants}
                className="max-w-[500px]"
              >
                <h2
                  className="
                    text-[20px] font-semibold
                    leading-tight text-[#111111]

                    sm:text-[22px]
                    lg:text-[20px]
                    xl:text-[22px]
                  "
                >
                  Our Vision
                </h2>

                <p
                  className="
                    mt-5 text-[14px]
                    font-normal leading-[1.7]
                    text-[#858585]

                    sm:text-[15px]
                    lg:text-[13px]
                    xl:text-[14px]
                  "
                >
                  We, at Dev Appartments aim to be the pillar of
                  success and are unparalleled when it comes to the
                  Real Estate business. Our goal is to succeed,
                  enabling our diverse team of valued employees to
                  hold great accountability towards our prized
                  customers. Dev Appartments aims with integrity,
                  diversification, consistency, high standards,
                  principles, and outstanding customer service.
                </p>
              </motion.div>
            </motion.article>

            {/* Mission panel */}
            <motion.article
              variants={missionPanelVariants}
              style={{
                transformOrigin: "left center",
                willChange: "transform, opacity",
              }}
              className="
                order-3
                flex min-h-[220px]
                items-center

                rounded-[16px]
                border border-[#E8E1D6]
                bg-[#FAF8F2]

                px-6 py-9

                shadow-[0_22px_42px_rgba(32,25,18,0.14)]

                sm:px-8

                lg:min-h-[280px]
                lg:rounded-l-none
                lg:rounded-r-[18px]
                lg:border-l-0
                lg:pl-[205px]
                lg:pr-10

                xl:pl-[225px]
                xl:pr-12
              "
            >
              <motion.div
                variants={missionContentVariants}
                className="max-w-[430px]"
              >
                <h2
                  className="
                    text-[20px] font-semibold
                    leading-tight text-[#111111]

                    sm:text-[22px]
                    lg:text-[20px]
                    xl:text-[22px]
                  "
                >
                  Our Mission
                </h2>

                <p
                  className="
                    mt-5 text-[14px]
                    font-normal leading-[1.7]
                    text-[#858585]

                    sm:text-[15px]
                    lg:text-[13px]
                    xl:text-[14px]
                  "
                >
                  We strive to inspire a positive and lasting impact.
                </p>
              </motion.div>
            </motion.article>
          </div>
        </div>
      </div>
    </motion.section>
  );
}