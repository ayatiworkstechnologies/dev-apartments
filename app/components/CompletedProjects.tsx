"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

type Project = {
  id: number;
  title: string;
  location: string;
  desc: string;
  img: string;
  thumb: string;
  href: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Villa, Pushpa Ave",
    location: "ECR",
    desc: "Experience contemporary villa living with thoughtfully planned spaces, premium finishes, and a prime location near the ECR coastline.",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=90&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=300&q=80&auto=format&fit=crop",

    // Dedicated Pushpa Avenue project page
    href: "/pushpa-ave",
  },
  {
    id: 2,
    title: "Dev Pristine Villa",
    location: "Chennai",
    desc: "A signature project redefining residential luxury — every detail crafted for the discerning homebuyer.",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=90&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300&q=80&auto=format&fit=crop",

    // Remaining projects open the enquiry form
    href: "#form",
  },
  {
    id: 3,
    title: "Villa, Pea Cock Enclave-4",
    location: "Chennai",
    desc: "Beautifully designed villas with modern amenities in one of Chennai's most sought-after residential enclaves.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=90&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&q=80&auto=format&fit=crop",
    href: "#form",
  },
  {
    id: 4,
    title: "Dev Heritage Homes",
    location: "Chennai",
    desc: "Heritage-inspired architecture blended with modern comforts, set amidst lush green surroundings.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=90&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80&auto=format&fit=crop",
    href: "#form",
  },
  {
    id: 5,
    title: "Green Valley Villas",
    location: "Chennai",
    desc: "Serene residential villas surrounded by nature, offering a peaceful retreat from city life.",
    img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=90&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=300&q=80&auto=format&fit=crop",
    href: "#form",
  },
];

const TOTAL = projects.length;

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export default function CompletedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /*
   * The track is 500% wide.
   * It moves from the first project to the last project.
   */
  const xRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "0%",
      `${-((TOTAL - 1) / TOTAL) * 100}%`,
    ],
  );

  const x = useSpring(xRaw, {
    stiffness: 55,
    damping: 22,
    mass: 0.6,
  });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (progress) => {
      const nextIndex = Math.round(
        progress * (TOTAL - 1),
      );

      setActiveIndex(
        Math.min(
          TOTAL - 1,
          Math.max(0, nextIndex),
        ),
      );
    },
  );

  const counter = `${String(
    activeIndex + 1,
  ).padStart(2, "0")} / ${String(
    TOTAL,
  ).padStart(2, "0")}`;

  return (
    <div
      ref={containerRef}
      id="completed"
      className="relative h-[500vh]"
    >
      {/* Sticky viewport */}
      <div
        className="
          sticky top-0 flex h-[100svh]
          items-center overflow-hidden bg-white
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
              lg:gap-16 xl:gap-20
            "
          >
            {/* Left content */}
            <div>
              <motion.h2
                initial={{
                  opacity: 0,
                  x: -32,
                  filter: "blur(10px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: false,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.75,
                  ease,
                }}
                className="
                  mb-4 font-primary
                  text-3xl font-black
                  leading-[1.15] text-gray-900

                  sm:text-4xl
                  lg:mb-6 lg:text-5xl
                "
              >
                Explore{" "}
                <span className="text-[#b08c1c]">
                  Our
                </span>
                <br />

                <span className="text-[#b08c1c]">
                  Successfully
                </span>
                <br />

                <span className="text-[#b08c1c]">
                  Completed
                </span>
                <br />

                Residential Projects
              </motion.h2>

              <motion.p
                initial={{
                  opacity: 0,
                  x: -20,
                  filter: "blur(6px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: false,
                  amount: 0.4,
                }}
                transition={{
                  delay: 0.12,
                  duration: 0.65,
                  ease,
                }}
                className="
                  mb-7 max-w-xs
                  font-secondary text-sm
                  leading-relaxed text-gray-400

                  sm:text-base
                  lg:mb-10
                "
              >
                Discover beautifully completed
                communities that reflect innovative
                design, superior construction, and Dev
                Appartments&apos; commitment to
                excellence and customer satisfaction.
              </motion.p>

              {/* Counter and progress */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.4,
                }}
                transition={{
                  delay: 0.22,
                  duration: 0.55,
                }}
                className="flex items-center gap-5"
              >
                <span
                  className="
                    w-14 shrink-0
                    text-sm font-bold
                    tabular-nums text-gray-400
                  "
                >
                  {counter}
                </span>

                <div className="flex items-center gap-2">
                  {projects.map((project, index) => (
                    <span
                      key={project.id}
                      className={`
                        block h-[3px] rounded-full
                        transition-all duration-500

                        ${
                          index === activeIndex
                            ? "w-8 bg-[#b08c1c]"
                            : "w-3 bg-gray-200"
                        }
                      `}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right project carousel */}
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
                once: false,
                amount: 0.3,
              }}
              transition={{
                duration: 0.8,
                ease,
              }}
              className="
                overflow-hidden rounded-2xl
                shadow-[0_8px_50px_rgba(0,0,0,0.14)]

                sm:rounded-3xl
              "
            >
              <motion.div
                className="flex w-[500%]"
                style={{ x }}
              >
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="relative w-1/5 shrink-0"
                  >
                    {/* Project image */}
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

                    {/* Bottom image gradient */}
                    <div
                      className="
                        pointer-events-none
                        absolute inset-x-0 bottom-0
                        h-2/5 bg-gradient-to-t
                        from-black/70
                        via-black/20
                        to-transparent
                      "
                    />

                    {/* Floating project card */}
                    <div
                      className="
                        absolute bottom-3
                        left-3 right-3

                        rounded-xl bg-white/95
                        p-3 backdrop-blur-md

                        shadow-2xl

                        sm:bottom-5
                        sm:left-5 sm:right-5
                        sm:rounded-2xl
                        sm:p-5
                      "
                    >
                      <div className="flex items-start gap-3">
                        {/* Thumbnail */}
                        <img
                          src={project.thumb}
                          alt=""
                          draggable={false}
                          className="
                            h-12 w-12 shrink-0
                            rounded-lg object-cover

                            sm:h-[72px]
                            sm:w-[72px]
                            sm:rounded-xl
                          "
                        />

                        {/* Information */}
                        <div className="min-w-0 flex-1">
                          <h3
                            className="
                              mb-0.5 font-primary
                              text-sm font-black
                              leading-snug text-gray-900

                              sm:text-base
                            "
                          >
                            {project.title}
                          </h3>

                          <div className="mb-1.5 flex items-center gap-1 sm:mb-2">
                            <MapPin
                              size={11}
                              className="
                                shrink-0 text-[#b08c1c]
                              "
                            />

                            <p
                              className="
                                font-primary text-xs
                                font-semibold
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

                          {/* Pushpa Ave goes to page.
                              Remaining projects go to #form. */}
                          <Link
                            href={project.href}
                            className="
                              group mt-2
                              inline-flex items-center
                              gap-1.5

                              font-primary
                              text-[11px] font-bold
                              text-[#b08c1c]

                              transition-all duration-300

                              hover:gap-2.5

                              sm:mt-3
                              sm:text-sm
                            "
                          >
                            Explore More

                            <ArrowRight
                              size={13}
                              className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-0.5
                              "
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}