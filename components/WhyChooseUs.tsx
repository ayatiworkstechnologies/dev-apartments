"use client";

import { motion, type Variants } from "framer-motion";

const features = [
  {
    title: "Innovative",
    subtitle: "Design",
    description:
      "Smart layouts inspired by modern family lifestyles.",
  },
  {
    title: "Exceptional",
    subtitle: "Service",
    description:
      "Personalized support from inquiry to possession.",
  },
  {
    title: "Quality",
    subtitle: "Craftsmanship",
    description:
      "Precision-built homes with lasting structural excellence.",
  },
  {
    title: "Timely",
    subtitle: "Delivery",
    description:
      "Delivering homes on schedule without compromising quality.",
  },
  {
    title: "Assured",
    subtitle: "Handover",
    description:
      "A smooth and transparent journey from booking to possession.",
  },
];

const panelVariants: Variants = {
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
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -22,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 95,
      damping: 17,
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section
      className="
        relative
        isolate
        flex
        w-full
        items-center
        overflow-hidden
        bg-[#b78b4a]
        bg-[url('/images/why-choose-bg.png')]
        bg-[length:100%_100%]
        bg-center
        bg-no-repeat
        px-4
        py-10
        sm:px-6
        sm:py-11
        lg:min-h-[260px]
        lg:px-[5%]
        lg:py-[42px]
        xl:min-h-[360px]
        xl:px-[5.5%]
        xl:py-[58px]
      "
    >
      <motion.div
        variants={panelVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1380px]
          flex-col
          rounded-[14px]
          bg-white
          px-6
          py-8
          shadow-[0_14px_38px_rgba(64,40,12,0.17)]
          sm:px-8
          lg:min-h-[175px]
          lg:flex-row
          lg:items-center
          lg:gap-8
          lg:px-8
          lg:py-7
          xl:min-h-[235px]
          xl:rounded-[18px]
          xl:px-11
          xl:py-9
        "
      >
        {/* Left heading */}
        <motion.div
          variants={headingVariants}
          className="
            mb-8
            shrink-0
            lg:mb-0
            lg:w-[28%]
            xl:w-[29%]
          "
        >
          <h2
            className="
              max-w-[330px]
              text-[28px]
              font-extrabold
              leading-[1.02]
              tracking-[-0.045em]
              text-[#111111]
              sm:text-[30px]
              lg:text-[27px]
              xl:max-w-[420px]
              xl:text-[39px]
            "
          >
            Why{" "}
            <span className="text-[#b98b46]">
              Homebuyers
            </span>

            <br />

            Choose

            <br />

            Dev{" "}
            <span className="text-[#b98b46]">
              Apartments
            </span>
          </h2>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            grid
            w-full
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:w-[72%]
            lg:grid-cols-5
            lg:gap-3
            xl:gap-4
          "
        >
          {features.map((feature) => (
            <motion.article
              key={`${feature.title}-${feature.subtitle}`}
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: {
                  duration: 0.22,
                  ease: "easeOut",
                },
              }}
              className="
                group
                relative
                flex
                min-h-[145px]
                overflow-hidden
                rounded-[10px]
                border
                border-[#eadcca]
                bg-white
                px-4
                py-[18px]
                text-center
                shadow-[0_9px_22px_rgba(67,46,21,0.13)]
                transition-all
                duration-300
                hover:border-[#d8ba8d]
                hover:shadow-[0_15px_30px_rgba(67,46,21,0.19)]
                sm:min-h-[150px]
                lg:min-h-[150px]
                lg:px-3
                lg:py-4
                xl:min-h-[172px]
                xl:rounded-[12px]
                xl:px-4
                xl:py-5
              "
            >
              {/* Top-left pale hover shape */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -left-[36px]
                  -top-[36px]
                  h-[74px]
                  w-[74px]
                  rounded-full
                  bg-[#b98b46]/[0.06]
                  transition-all
                  duration-500
                  ease-out
                  group-hover:-left-[22px]
                  group-hover:-top-[22px]
                  group-hover:scale-[1.7]
                  group-hover:bg-[#b98b46]/[0.10]
                  xl:-left-[48px]
                  xl:-top-[48px]
                  xl:h-[100px]
                  xl:w-[100px]
                  xl:group-hover:-left-[30px]
                  xl:group-hover:-top-[30px]
                "
              />

              {/* Small top-left accent circle */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-[12px]
                  top-[12px]
                  h-[5px]
                  w-[5px]
                  scale-0
                  rounded-full
                  bg-[#b98b46]
                  opacity-0
                  transition-all
                  duration-300
                  group-hover:scale-100
                  group-hover:opacity-100
                  xl:left-[16px]
                  xl:top-[16px]
                "
              />

              <div className="relative z-10 flex w-full flex-col items-center justify-center">
                <h3
                  className="
                    text-[15px]
                    font-extrabold
                    leading-none
                    tracking-[-0.035em]
                    text-[#141414]
                    transition-colors
                    duration-300
                    lg:text-[12px]
                    xl:text-[16px]
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-[3px]
                    text-[15px]
                    font-bold
                    leading-none
                    tracking-[-0.025em]
                    text-[#b98b46]
                    lg:text-[12px]
                    xl:text-[16px]
                  "
                >
                  {feature.subtitle}
                </p>

                <span
                  aria-hidden="true"
                  className="
                    my-[9px]
                    block
                    h-px
                    w-8
                    bg-[#d7bc91]
                    transition-all
                    duration-300
                    group-hover:w-11
                    group-hover:bg-[#b98b46]
                    xl:my-4
                    xl:w-10
                  "
                />

                <p
                  className="
                    max-w-[165px]
                    text-[11px]
                    leading-[1.45]
                    text-[#5c5c5c]
                    lg:max-w-[128px]
                    lg:text-[9px]
                    lg:leading-[1.5]
                    xl:max-w-[170px]
                    xl:text-[12px]
                    xl:leading-[1.5]
                  "
                >
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}