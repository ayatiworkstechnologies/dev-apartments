"use client";

import {
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

type Testimonial = {
  id: number;
  source: string;
  name: string;
  role: string;
  text: string;
};

type AvatarStyle = {
  background: string;
  shirt: string;
  skin: string;
  hair: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    source: "MagicBricks",
    name: "Sashank",
    role: "Owner",
    text: "Just moved in with my family and loving this place. It is very good locality with good environment and close to beach. Neighbours are cooperative, very helpful and friendly too. Good sea breeze all through the interior.",
  },
  {
    id: 2,
    source: "99Acres",
    name: "Priya Ramesh",
    role: "Home Owner",
    text: "Dev Appartments exceeded all our expectations. The build quality is outstanding and the team was incredibly supportive throughout our purchase journey. We could not be happier with our new home.",
  },
  {
    id: 3,
    source: "Housing.com",
    name: "Karthik Sundaram",
    role: "Investor",
    text: "I have invested in multiple properties over the years. Dev Appartments stands out for transparency, timely delivery and exceptional after-sales support. Highly recommended for every serious buyer.",
  },
  {
    id: 4,
    source: "NoBroker",
    name: "Anitha Krishnan",
    role: "Home Owner",
    text: "The location is perfect and the community is wonderful. Every amenity promised has been delivered on time. The construction quality is solid and the team was always available to answer our questions.",
  },
];

const avatarStyles: AvatarStyle[] = [
  {
    background: "#e6f4f3",
    shirt: "#078c8d",
    skin: "#efb27b",
    hair: "#292929",
  },
  {
    background: "#f7eee5",
    shirt: "#b58a48",
    skin: "#eeb57e",
    hair: "#443029",
  },
  {
    background: "#e9edf7",
    shirt: "#667db6",
    skin: "#ecb27e",
    hair: "#292929",
  },
  {
    background: "#f3e8ef",
    shirt: "#97627f",
    skin: "#efb37e",
    hair: "#392929",
  },
];

const AUTO_PLAY_DELAY = 2500;
const VISIBLE_STACK_CARDS = 3;

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

function PersonAvatar({ index }: { index: number }) {
  const avatar =
    avatarStyles[index % avatarStyles.length];

  return (
    <div
      className="
        flex h-9 w-9 shrink-0 items-center justify-center
        overflow-hidden rounded-full
        sm:h-10 sm:w-10
        lg:h-11 lg:w-11
      "
      style={{
        backgroundColor: avatar.background,
      }}
    >
      <svg
        viewBox="0 0 48 48"
        className="h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="18"
          r="8"
          fill={avatar.skin}
        />

        <path
          d="M15.5 17.2C16 10.7 19.9 7 24.8 7c5.5 0 8.4 3.9 8.2 9.8-2.2-1.2-4.8-2.4-8.3-2.6-3.2-.2-6.4 1.3-9.2 3Z"
          fill={avatar.hair}
        />

        <path
          d="M8.5 44c1.3-9.3 7.1-14 15.5-14 8.5 0 14.3 4.7 15.5 14h-31Z"
          fill={avatar.shirt}
        />

        <path
          d="M20 29.5 24 34l4-4.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

function BackgroundCurves() {
  return (
    <svg
      className="
        pointer-events-none absolute inset-0
        h-full w-full
      "
      viewBox="0 0 1440 560"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Top-left outer curve */}
      <motion.path
        d="
          M -100 78
          C 135 20, 350 52, 555 225
        "
        fill="none"
        stroke="#B88D48"
        strokeWidth="4.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        whileInView={{
          pathLength: 1,
          opacity: 0.52,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
          ease: smoothEase,
        }}
      />

      {/* Top-left inner curve */}
      <motion.path
        d="
          M -105 175
          C 125 95, 350 105, 565 270
        "
        fill="none"
        stroke="#B88D48"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        whileInView={{
          pathLength: 1,
          opacity: 0.27,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.7,
          delay: 0.1,
          ease: smoothEase,
        }}
      />

      {/* Bottom-right inner curve */}
      <motion.path
        d="
          M 925 455
          C 1085 500, 1250 410, 1510 245
        "
        fill="none"
        stroke="#B88D48"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        whileInView={{
          pathLength: 1,
          opacity: 0.27,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.7,
          delay: 0.15,
          ease: smoothEase,
        }}
      />

      {/* Bottom-right outer curve */}
      <motion.path
        d="
          M 865 545
          C 1070 595, 1265 505, 1525 340
        "
        fill="none"
        stroke="#B88D48"
        strokeWidth="4.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        whileInView={{
          pathLength: 1,
          opacity: 0.52,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
          delay: 0.06,
          ease: smoothEase,
        }}
      />

      {/* Right vertical detail */}
      <motion.g
        className="hidden sm:block"
        initial={{
          opacity: 0,
          scaleY: 0,
        }}
        whileInView={{
          opacity: 1,
          scaleY: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.75,
          delay: 0.65,
          ease: smoothEase,
        }}
        style={{
          transformOrigin: "1298px 330px",
        }}
      >
        <line
          x1="1298"
          y1="278"
          x2="1298"
          y2="380"
          stroke="#E6E6E6"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        <line
          x1="1298"
          y1="318"
          x2="1298"
          y2="353"
          stroke="#B88D48"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </motion.g>
    </svg>
  );
}

export default function Testimonials() {
  const reduceMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [direction, setDirection] =
    useState<1 | -1>(1);

  const [isPaused, setIsPaused] =
    useState(false);

  const showNext = useCallback(() => {
    setDirection(1);

    setCurrentIndex(
      (current) =>
        (current + 1) % testimonials.length,
    );
  }, []);

  const showPrevious = useCallback(() => {
    setDirection(-1);

    setCurrentIndex(
      (current) =>
        (current - 1 + testimonials.length) %
        testimonials.length,
    );
  }, []);

  const goToTestimonial = useCallback(
    (index: number) => {
      if (index === currentIndex) return;

      const forwardDistance =
        (index -
          currentIndex +
          testimonials.length) %
        testimonials.length;

      const backwardDistance =
        (currentIndex -
          index +
          testimonials.length) %
        testimonials.length;

      setDirection(
        forwardDistance <= backwardDistance
          ? 1
          : -1,
      );

      setCurrentIndex(index);
    },
    [currentIndex],
  );

  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const interval = window.setInterval(
      showNext,
      AUTO_PLAY_DELAY,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [
    currentIndex,
    isPaused,
    reduceMotion,
    showNext,
  ]);

  const getStackPosition = (
    testimonialIndex: number,
  ) => {
    return (
      (testimonialIndex -
        currentIndex +
        testimonials.length) %
      testimonials.length
    );
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const distance = info.offset.x;
    const velocity = info.velocity.x;

    if (distance < -65 || velocity < -450) {
      showNext();
      return;
    }

    if (distance > 65 || velocity > 450) {
      showPrevious();
    }
  };

  return (
    <section
      id="testimonials"
      className="
        relative w-full mb-5 overflow-hidden bg-white

        min-h-[520px]
        py-9

        sm:min-h-[535px]
        sm:py-10

        lg:min-h-[565px]
        lg:py-11

        xl:min-h-[580px]
      "
    >
      <BackgroundCurves />

      <div
        className="
          relative z-10 mx-auto
          w-full max-w-[1440px]
          px-4
          sm:px-7
          lg:px-10
        "
      >
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            ease: smoothEase,
          }}
          className="text-center"
        >
          <h2
            className="
              font-primary font-bold
              leading-[1.08]
              tracking-[-0.04em]
              text-[#111111]

              text-[27px]
              sm:text-[33px]
              lg:text-[38px]
              xl:text-[40px]
            "
          >
            Hear From{" "}
            <span className="text-[#B88D48]">
              Customers
            </span>
          </h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.16,
              ease: smoothEase,
            }}
            className="
              font-secondary mx-auto mt-3
              max-w-[530px]
              text-[10px] leading-[1.55]
              text-[#999999]

              sm:text-[11px]
              lg:text-[12px]
            "
          >
            What our clients are saying. Achieving client
            objectives, satisfaction and trust.
            <br className="hidden sm:block" />
            Also support us and would willingly be recommended.
          </motion.p>
        </motion.div>

        {/* Carousel wrapper */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.92,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            mass: 0.8,
            delay: 0.08,
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          className="
            relative mx-auto

            mt-8
            w-full max-w-[1020px]

            sm:mt-9
            lg:mt-10
          "
        >
          {/* Stacked cards */}
          <div
            className="
              relative

              h-[300px]

              sm:h-[300px]

              lg:h-[305px]
            "
          >
            {testimonials.map(
              (testimonial, index) => {
                const stackPosition =
                  getStackPosition(index);

                const isVisible =
                  stackPosition <
                  VISIBLE_STACK_CARDS;

                const isActive =
                  stackPosition === 0;

                const stackY =
                  stackPosition === 0
                    ? 0
                    : stackPosition === 1
                      ? 14
                      : 27;

                const stackScale =
                  stackPosition === 0
                    ? 1
                    : stackPosition === 1
                      ? 0.96
                      : 0.92;

                const stackOpacity =
                  stackPosition === 0
                    ? 1
                    : stackPosition === 1
                      ? 0.88
                      : 0.56;

                return (
                  <motion.article
                    key={testimonial.id}
                    drag={isActive ? "x" : false}
                    dragConstraints={{
                      left: 0,
                      right: 0,
                    }}
                    dragElastic={0.14}
                    onDragEnd={handleDragEnd}
                    initial={false}
                    animate={{
                      x: isVisible
                        ? 0
                        : direction === 1
                          ? -100
                          : 100,

                      y: isVisible
                        ? stackY
                        : 40,

                      scale: isVisible
                        ? stackScale
                        : 0.88,

                      opacity: isVisible
                        ? stackOpacity
                        : 0,
                    }}
                    transition={{
                      x: {
                        type: "spring",
                        stiffness: 185,
                        damping: 22,
                        mass: 0.8,
                      },
                      y: {
                        type: "spring",
                        stiffness: 190,
                        damping: 19,
                        mass: 0.8,
                      },
                      scale: {
                        type: "spring",
                        stiffness: 195,
                        damping: 18,
                      },
                      opacity: {
                        duration: 0.28,
                      },
                    }}
                    className={`
                      absolute inset-x-0 top-0
                      select-none bg-white

                      min-h-[235px]
                      rounded-[15px]
                      border border-black/[0.025]
                      px-5 py-7

                      shadow-[0_12px_38px_rgba(0,0,0,0.10)]

                      sm:min-h-[230px]
                      sm:rounded-[17px]
                      sm:px-8
                      sm:py-8

                      lg:min-h-[235px]
                      lg:rounded-[18px]
                      lg:px-12
                      lg:py-9

                      ${
                        isActive
                          ? "cursor-grab active:cursor-grabbing"
                          : "pointer-events-none"
                      }
                    `}
                    style={{
                      zIndex:
                        VISIBLE_STACK_CARDS -
                        stackPosition,
                      transformOrigin: "center top",
                    }}
                    aria-hidden={!isActive}
                  >
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 8,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: isActive ? 0.07 : 0,
                      }}
                    >
                      <p
                        className="
                          font-secondary text-[#5D5D5D]

                          text-[12px]
                          leading-[1.65]

                          sm:text-[13px]
                          sm:leading-[1.7]

                          lg:text-[14px]
                          lg:leading-[1.75]
                        "
                      >
                        {testimonial.text}
                      </p>

                      <div
                        className="
                          mt-8 flex items-center gap-3

                          sm:mt-9

                          lg:mt-10
                        "
                      >
                        <PersonAvatar index={index} />

                        <p
                          className="
                            font-secondary min-w-0
                            leading-relaxed text-[#808080]

                            text-[11px]
                            sm:text-[12px]
                            lg:text-[13px]
                          "
                        >
                          <span
                            className="
                              font-primary font-semibold
                              text-[#111111]
                            "
                          >
                            {testimonial.source}
                          </span>

                          <span className="mx-1">
                            -
                          </span>

                          <span>
                            {testimonial.name}
                          </span>

                          <span className="ml-1">
                            ({testimonial.role})
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  </motion.article>
                );
              },
            )}
          </div>

          {/* Indicators */}
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 175,
              damping: 15,
              delay: 0.24,
            }}
            className="
              relative z-20
              mt-1 flex items-center
              justify-center gap-2

              sm:mt-2
              lg:mt-3
            "
            role="tablist"
            aria-label="Choose testimonial"
          >
            {testimonials.map(
              (testimonial, index) => {
                const isActive =
                  currentIndex === index;

                return (
                  <motion.button
                    key={testimonial.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show testimonial ${index + 1}`}
                    onClick={() =>
                      goToTestimonial(index)
                    }
                    animate={{
                      width: isActive ? 26 : 7,
                      backgroundColor: isActive
                        ? "#B88D48"
                        : "#D6D6D6",
                    }}
                    whileHover={{
                      scale: 1.14,
                    }}
                    whileTap={{
                      scale: 0.82,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 20,
                    }}
                    className="
                      h-[7px] rounded-full
                      border-0 outline-none

                      focus-visible:ring-2
                      focus-visible:ring-[#B88D48]/40
                      focus-visible:ring-offset-2
                    "
                  />
                );
              },
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}