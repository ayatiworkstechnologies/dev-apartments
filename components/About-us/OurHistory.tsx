"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const headingAnimation: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

const paragraphOneAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay: 0.18,
      ease: smoothEase,
    },
  },
};

const paragraphTwoAnimation: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: 0.32,
      ease: smoothEase,
    },
  },
};

const paragraphThreeAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.95,
      delay: 0.46,
      ease: smoothEase,
    },
  },
};

export default function OurHistory() {
  return (
    <section className="overflow-hidden bg-[#F8F5EF]">
      <div
        className="
          mx-auto grid w-full max-w-[1440px]
          grid-cols-1 items-center
          gap-10 px-5 py-14

          sm:gap-12 sm:px-6 sm:py-16

          lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]
          lg:gap-14 lg:px-8 lg:py-20

          xl:grid-cols-[minmax(0,1fr)_522px]
          xl:gap-20 xl:py-24
        "
      >
        {/* Left content */}
        <div className="max-w-[630px]">
          {/* Heading */}
          <motion.div
            variants={headingAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.4,
            }}
          >
            <h2
              className="
                text-[34px] font-bold
                leading-[1.05]
                tracking-[-0.035em]
                text-[#090909]

                sm:text-[40px]
                lg:text-[44px]
              "
            >
              Our{" "}
              <span className="text-[#AE8348]">
                History
              </span>
            </h2>

            {/* Underline */}
            {/* <motion.span
              initial={{
                width: 0,
                opacity: 0,
              }}
              whileInView={{
                width: 56,
                opacity: 1,
              }}
              viewport={{
                once: true,
                amount: 0.6,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: smoothEase,
              }}
              className="
                mt-4 block h-[2px]
                bg-[#AE8348]
              "
            /> */}
          </motion.div>

          {/* Paragraphs */}
          <div
            className="
              mt-9 space-y-5
              text-[14px]
              font-normal
              leading-[1.6]
              text-[#858585]

              sm:text-[15px]
              sm:leading-[1.65]

              lg:mt-10
              lg:space-y-6
            "
          >
            <motion.p
              variants={paragraphOneAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.5,
              }}
            >
              ‘Dev Appartments’ was founded in 1981 under the
              stewardship of CEO and Managing Director, Mr. P.V.
              Devakumar with the guidance of Chairman, Mr. P.G.
              Venugopal, a leading light of the real estate industry
              in Chennai. Since its inception, ‘Dev Appartments’ has
              set the highest standards for itself amidst great
              challenges and struggles.
            </motion.p>

            <motion.p
              variants={paragraphTwoAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.5,
              }}
            >
              Through the years, it has grown into one of the most
              reliable and reputed real estate firms in the city
              acclaimed for its transparent business practices,
              novel innovations and excellence.
            </motion.p>

            <motion.p
              variants={paragraphThreeAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.45,
              }}
            >
              The journey over the last four decades has seen the
              company excel both in residential and commercial
              domains by building more than 150 notable and
              impressive projects inclusive of independent houses,
              apartments, schools in Chennai, meeting up to the
              obvious needs of the changing generation and lifestyle
              thereby earning innumerable delighted and satisfied
              customers.
            </motion.p>
          </div>
        </div>

        {/* Right image */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.975,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 1.15,
            delay: 0.12,
            ease: smoothEase,
          }}
          className="
            relative mx-auto
            aspect-[522/420]
            w-full max-w-[522px]
            overflow-hidden
            rounded-[24px]

            shadow-[0_20px_55px_rgba(55,38,20,0.09)]

            lg:mx-0
            lg:justify-self-end
          "
        >
          <Image
            src="/images/our-history-1.png"
            alt="Dev Appartments residential community"
            fill
            sizes="
              (max-width: 639px) 100vw,
              (max-width: 1023px) 85vw,
              (max-width: 1279px) 45vw,
              522px
            "
            className="object-cover"
          />

          {/* Very subtle image shade */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-t
              from-black/[0.05]
              via-transparent
              to-white/[0.03]
            "
          />
        </motion.div>
      </div>
    </section>
  );
}