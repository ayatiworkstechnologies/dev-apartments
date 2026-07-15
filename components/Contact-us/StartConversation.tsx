"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

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
    x: 22,
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

const descriptionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(5px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

interface StartConversationProps {
  titleStart?: string;
  titleHighlight?: string;
  description?: string;
}

export default function StartConversation({
  titleStart = "Talk to ",
  titleHighlight = "Our Experts",
  description = "Have questions about our projects or need assistance in finding your dream home? Our team is here to help. Your perfect home is closer than you think. Reach out to Dev Appartments for project information, pricing, site visit bookings or our dedicated team is ready to assist . We will help you take the next step toward a home you love.",
}: StartConversationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      variants={sectionVariants}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.35,
        margin: "0px 0px -60px 0px",
      }}
      className="
        flex min-h-[245px]
        w-full items-center
        overflow-hidden
        bg-[#F8F5EE]

        sm:min-h-[255px]
        md:min-h-[265px]
        lg:min-h-[275px]
      "
    >
      <div
        className="
          mx-auto flex w-full
          max-w-[1440px]
          flex-col items-center
          justify-center
          px-5 py-12
          text-center

          sm:px-8 sm:py-14
          md:px-10
          lg:px-12 lg:py-16
        "
      >
        {/* Heading */}
        <motion.h2
          variants={headingVariants}
          className="
            text-[27px] font-semibold
            leading-[1.15]
            tracking-[-0.035em]
            text-[#050505]

            sm:text-[30px]
            md:text-[32px]
            lg:text-[34px]
          "
        >
          <span>{titleStart}</span>{" "}

          <motion.span
            variants={highlightVariants}
            className="
              inline-block
              text-[#B48A50]
            "
          >
            {titleHighlight}
          </motion.span>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={descriptionVariants}
          className="
            mt-10 max-w-[790px]
            text-[11px] font-normal
            leading-[1.55]
            text-[#999999]

            sm:mt-11
            sm:max-w-[810px]
            sm:text-[12px]
            sm:leading-[1.55]

            md:max-w-[820px]
            md:text-[12.5px]

            lg:mt-12
            lg:max-w-[825px]
            lg:text-[13px]
            lg:leading-[1.55]
          "
        >
          {description}
        </motion.p>
      </div>
    </motion.section>
  );
}