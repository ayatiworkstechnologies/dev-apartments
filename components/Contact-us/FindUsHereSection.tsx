"use client";

import { motion, type Variants } from "framer-motion";

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const sectionVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.14,
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
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

const highlightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
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

const mapVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 1,
      ease: smoothEase,
    },
  },
};

interface FindUsHereSectionProps {
  mapUrl?: string;
  mapTitle?: string;
}

export default function FindUsHereSection({
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25908.822089435347!2d80.2299377535103!3d13.007509636536266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e062999005%3A0xd986fb71dc835b1d!2sDev%20apartment!5e0!3m2!1sen!2sin!4v1782985424149!5m2!1sen!2sin",
  mapTitle = "Dev Apartment Location",
}: FindUsHereSectionProps) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
        margin: "0px 0px -60px 0px",
      }}
      className="
        w-full overflow-hidden
        bg-white
        px-4 py-14

        sm:px-6 sm:py-16
        md:py-20
        lg:px-8 lg:py-24
      "
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Heading */}
        <motion.h2
          variants={headingVariants}
          className="
            text-center
            text-[30px] font-semibold
            leading-[1.15]
            tracking-[-0.035em]
            text-[#050505]

            sm:text-[34px]
            md:text-[38px]
            lg:text-[40px]
          "
        >
          Find Us{" "}

          <motion.span
            variants={highlightVariants}
            className="inline-block text-[#B5894D]"
          >
            Here
          </motion.span>
        </motion.h2>

        {/* Map */}
        <motion.div
          variants={mapVariants}
          whileHover={{
            y: -5,
            boxShadow:
              "0 28px 65px rgba(20, 20, 20, 0.14)",
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 24,
          }}
          className="
            relative mx-auto
            mt-12 w-full
            overflow-hidden
            rounded-[18px]
            border border-black/[0.08]
            bg-[#F5F5F5]
            shadow-[0_18px_50px_rgba(20,20,20,0.12)]

            sm:mt-14
            md:w-[94%]
            lg:mt-16
            lg:w-[88%]
            xl:w-[85%]
          "
        >
          {/* Map container */}
          <div
            className="
              relative w-full
              aspect-[4/3]

              sm:aspect-[16/9]
              md:aspect-[2.4/1]
              lg:aspect-[2.9/1]
            "
          >
            <iframe
              src={mapUrl}
              title={mapTitle}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="
                absolute inset-0
                h-full w-full
                border-0
              "
            />
          </div>

          {/* Soft highlight */}
          <div
            className="
              pointer-events-none
              absolute inset-x-0 top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/80
              to-transparent
            "
          />
        </motion.div>
      </div>
    </motion.section>
  );
}