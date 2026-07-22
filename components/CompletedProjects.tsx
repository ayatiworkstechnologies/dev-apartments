"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  motion,
  type PanInfo,
} from "framer-motion";
import { MapPin } from "lucide-react";

type Project = {
  id: number;
  title: string;
  location: string;
  desc: string;
  img: string;
  thumb: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Villa, Pushpa Ave",
    location: "ECR",
    desc: "Experience contemporary villa living with thoughtfully planned spaces, premium finishes, and a prime location near the ECR coastline.",
    img: "/images/Villa, Pushpa Ave.png",
    thumb: "/images/Villa, Pushpa Ave.png",
  },
  {
    id: 2,
    title: "Dev Pristine Villa",
    location: "Chennai",
    desc: "A signature project redefining residential luxury — every detail crafted for the discerning homebuyer.",
    img: "/images/Dev Pristine Villa.png",
    thumb: "/images/Dev Pristine Villa.png",
  },
  {
    id: 3,
    title: "Villa, Pea Cock Enclave-4",
    location: "Chennai",
    desc: "Beautifully designed villas with modern amenities in one of Chennai's most sought-after residential enclaves.",
    img: "/images/Villa, Pea Cock Enclave-4.png",
    thumb: "/images/Villa, Pea Cock Enclave-4.png",
  },
  {
    id: 4,
    title: "Dev Heritage Homes",
    location: "Chennai",
    desc: "Heritage-inspired architecture blended with modern comforts, set amidst lush green surroundings.",
    img: "/images/Dev Pristine Villa-1.png",
    thumb: "/images/Dev Pristine Villa-1.png",
  },
];

const TOTAL = projects.length;
const AUTO_SLIDE_DELAY = 4500;

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export default function CompletedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const showNextSlide = useCallback(() => {
    setActiveIndex(
      (previousIndex) =>
        (previousIndex + 1) % TOTAL,
    );
  }, []);

  const showPreviousSlide = useCallback(() => {
    setActiveIndex(
      (previousIndex) =>
        (previousIndex - 1 + TOTAL) % TOTAL,
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(
      showNextSlide,
      AUTO_SLIDE_DELAY,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, showNextSlide]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeDistance = 50;
    const swipeVelocity = 350;

    if (
      info.offset.x < -swipeDistance ||
      info.velocity.x < -swipeVelocity
    ) {
      showNextSlide();
      return;
    }

    if (
      info.offset.x > swipeDistance ||
      info.velocity.x > swipeVelocity
    ) {
      showPreviousSlide();
    }
  };

  const counter = `${String(
    activeIndex + 1,
  ).padStart(2, "0")} / ${String(
    TOTAL,
  ).padStart(2, "0")}`;

  return (
    <section
      id="completed"
      className="
        relative flex min-h-[100svh]
        items-center overflow-hidden
        bg-white py-10
        sm:py-12
        lg:h-[100svh]
        lg:py-0
      "
    >
      <div
        className="
          mx-auto w-full max-w-[1400px]
          px-4 sm:px-8 lg:px-14
        "
      >
        <div
          className="
            grid items-center gap-8
            lg:grid-cols-[5fr_8fr]
            lg:gap-16
            xl:gap-20
          "
        >
          {/* Left content */}
          <div
            className="
              mx-auto w-full
              max-w-[560px]
              text-center

              lg:mx-0
              lg:max-w-none
              lg:text-left
            "
          >
            <motion.h2
              initial={{
                opacity: 0,
                x: -30,
                filter: "blur(8px)",
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.7,
                ease,
              }}
              className="
                font-primary font-black
                tracking-[-0.04em]
                text-gray-900

                text-[30px]
                leading-[1.05]

                sm:text-[36px]

                lg:text-[44px]
                lg:leading-[1.06]

                xl:text-[52px]
                2xl:text-[58px]
              "
            >
              {/* Mobile and tablet */}
              <span className="block lg:hidden">
                <span className="block">
                  Explore{" "}
                  <span className="text-[#b08c1c]">
                    Our Successfully
                  </span>
                </span>

                <span className="block">
                  <span className="text-[#b08c1c]">
                    Completed
                  </span>{" "}
                  Residential Projects
                </span>
              </span>

              {/* Laptop and desktop */}
              <span className="hidden lg:block">
                Explore{" "}
                <span className="text-[#b08c1c]">
                  Our
                </span>

                <span className="block text-[#b08c1c]">
                  Successfully
                </span>

                <span className="block text-[#b08c1c]">
                  Completed
                </span>

                <span className="block">
                  Residential Projects
                </span>
              </span>
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                x: -18,
                filter: "blur(5px)",
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                delay: 0.1,
                duration: 0.65,
                ease,
              }}
              className="
                mx-auto mt-4
                max-w-[350px]
                font-secondary
                text-[12px]
                leading-5
                text-gray-400

                sm:mt-5
                sm:max-w-[440px]
                sm:text-[14px]
                sm:leading-7

                lg:mx-0
                lg:mt-7
                lg:max-w-[360px]
                lg:text-[15px]
                lg:leading-7

                xl:max-w-[390px]
                xl:text-base
                xl:leading-8
              "
            >
              Discover beautifully completed communities
              that reflect innovative design, superior
              construction, and Dev Appartments&apos;
              commitment to excellence and customer
              satisfaction.
            </motion.p>

            {/* Counter and indicators */}
            <motion.div
              initial={{
                opacity: 0,
                y: 14,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
              className="
                mt-5 flex items-center
                justify-center gap-3

                sm:mt-6
                sm:gap-4

                lg:mt-9
                lg:justify-start
                lg:gap-5
              "
            >
              <span
                className="
                  w-12 shrink-0
                  text-[12px] font-bold
                  tabular-nums
                  text-gray-400

                  sm:w-14
                  sm:text-[13px]

                  lg:text-sm
                "
              >
                {counter}
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {projects.map((project, index) => {
                  const isActive =
                    activeIndex === index;

                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => {
                        setActiveIndex(index);
                      }}
                      aria-label={`Show ${project.title}`}
                      aria-current={
                        isActive
                          ? "true"
                          : undefined
                      }
                      className="
                        flex h-7 items-center
                        justify-center
                        focus-visible:outline-none
                      "
                    >
                      <span
                        className={`
                          block h-[3px] cursor-pointer
                          rounded-full
                          transition-all
                          duration-500

                          ${
                            isActive
                              ? "w-8 bg-[#b08c1c] sm:w-9"
                              : `
                                w-3 bg-gray-200
                                hover:bg-gray-300
                              `
                          }
                        `}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right project slider */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
              filter: "blur(12px)",
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            onMouseEnter={() => {
              setIsPaused(true);
            }}
            onMouseLeave={() => {
              setIsPaused(false);
            }}
            onFocusCapture={() => {
              setIsPaused(true);
            }}
            onBlurCapture={() => {
              setIsPaused(false);
            }}
            className="
              relative overflow-hidden
              rounded-2xl
              shadow-[0_8px_50px_rgba(0,0,0,0.14)]
              sm:rounded-3xl
            "
          >
            <motion.div
              drag="x"
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              animate={{
                x: `-${activeIndex * 100}%`,
              }}
              transition={{
                duration: 0.85,
                ease,
              }}
              className="
                flex cursor-grab
                touch-pan-y
                select-none
                active:cursor-grabbing
              "
            >
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="
                    relative w-full shrink-0
                  "
                >
                  {/* Original image heights retained */}
                  <img
                    src={project.img}
                    alt={project.title}
                    draggable={false}
                    className="
                      h-[44vh] w-full
                      select-none object-cover

                      min-[480px]:h-[50vh]
                      sm:h-[58vh]
                      lg:h-[74vh]
                    "
                  />

                  {/* Original gradient */}
                  <div
                    className="
                      pointer-events-none
                      absolute inset-x-0 bottom-0
                      h-2/5
                      bg-gradient-to-t
                      from-black/70
                      via-black/20
                      to-transparent
                    "
                  />

                  {/* Original floating card design */}
                  <div
                    className="
                      absolute bottom-3
                      left-3 right-3

                      rounded-xl
                      bg-white/95
                      p-3
                      shadow-2xl
                      backdrop-blur-md

                      sm:bottom-5
                      sm:left-5
                      sm:right-5
                      sm:rounded-2xl
                      sm:p-5
                    "
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={project.thumb}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        className="
                          h-12 w-12 shrink-0
                          rounded-lg object-cover

                          sm:h-[72px]
                          sm:w-[72px]
                          sm:rounded-xl
                        "
                      />

                      <div className="min-w-0 flex-1">
                        <h3
                          className="
                            mb-0.5
                            font-primary
                            text-sm font-black
                            leading-snug
                            text-gray-900

                            sm:text-base
                          "
                        >
                          {project.title}
                        </h3>

                        <div className="mb-1.5 flex items-center gap-1 sm:mb-2">
                          <MapPin
                            size={11}
                            className="
                              shrink-0
                              text-[#b08c1c]
                            "
                          />

                          <p
                            className="
                              font-primary
                              text-xs font-semibold
                              text-[#b08c1c]

                              sm:text-sm
                            "
                          >
                            {project.location}
                          </p>
                        </div>

                        <p
                          className="
                            line-clamp-2
                            font-secondary
                            text-[10px]
                            leading-relaxed
                            text-gray-500

                            sm:text-sm
                          "
                        >
                          {project.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>

            {/* Automatic progress */}
            {!isPaused && (
              <motion.div
                key={`progress-${activeIndex}`}
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration:
                    AUTO_SLIDE_DELAY / 1000,
                  ease: "linear",
                }}
                className="
                  absolute bottom-0
                  left-0 z-20
                  h-[3px] w-full
                  origin-left
                  bg-[#b08c1c]
                "
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}