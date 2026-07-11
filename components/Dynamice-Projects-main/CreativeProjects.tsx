"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Dev Pristine Villa",
    image: "/images/dev-pristine-villa.jpg",
    description:
      "'Dev Appartments' was founded in 1981 under the stewardship of CEO and Managing Director, Mr. P.V. Devakumar with the guidance of Chairman, Mr. P.G. Venugopal.",
  },
  {
    id: 2,
    title: "Dev Pristine Villa",
    image: "/images/dev-pristine-villa.jpg",
    description:
      "'Dev Appartments' was founded in 1981 under the stewardship of CEO and Managing Director, Mr. P.V. Devakumar with the guidance of Chairman, Mr. P.G. Venugopal.",
  },
  {
    id: 3,
    title: "Dev Pristine Villa",
    image: "/images/dev-pristine-villa.jpg",
    description:
      "'Dev Appartments' was founded in 1981 under the stewardship of CEO and Managing Director, Mr. P.V. Devakumar with the guidance of Chairman, Mr. P.G. Venugopal.",
  },
  {
    id: 4,
    title: "Dev Pristine Villa",
    image: "/images/dev-pristine-villa.jpg",
    description:
      "'Dev Appartments' was founded in 1981 under the stewardship of CEO and Managing Director, Mr. P.V. Devakumar with the guidance of Chairman, Mr. P.G. Venugopal.",
  },
  {
    id: 5,
    title: "Dev Pristine Villa",
    image: "/images/dev-pristine-villa.jpg",
    description:
      "'Dev Appartments' was founded in 1981 under the stewardship of CEO and Managing Director, Mr. P.V. Devakumar with the guidance of Chairman, Mr. P.G. Venugopal.",
  },
  {
    id: 6,
    title: "Dev Pristine Villa",
    image: "/images/dev-pristine-villa.jpg",
    description:
      "'Dev Appartments' was founded in 1981 under the stewardship of CEO and Managing Director, Mr. P.V. Devakumar with the guidance of Chairman, Mr. P.G. Venugopal.",
  },
];

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.97,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

export default function CreativeProjects() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.5,
          }}
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-24"
        >
          <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.04em] text-black sm:text-[42px] lg:text-[52px]">
            Creative{" "}
            <span className="text-[#b78b45]">
              Projects That
            </span>
            <br />
            <span className="text-[#b78b45]">
              Define
            </span>{" "}
            Our Style
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
            Our diverse portfolio represents decades of construction experience
            backed by a passion for quality and outstanding client service.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isLeftColumn = index % 2 === 0;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.22,
        margin: "0px 0px -80px 0px",
      }}
      transition={{
        delay: isLeftColumn ? 0 : 0.12,
      }}
      className="group"
    >
      {/* Image */}
      <motion.div
        className="relative aspect-[1.75/1] w-full overflow-hidden rounded-[12px] bg-neutral-100"
        whileHover={{
          y: -5,
        }}
        transition={{
          duration: 0.45,
          ease: smoothEase,
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />

        {/* Subtle hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.04]" />

        {/* Animated line */}
        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#b78b45] transition-all duration-700 ease-out group-hover:w-full" />
      </motion.div>

      {/* Content */}
      <div className="pt-5 sm:pt-6">
        <motion.h3
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.8,
          }}
          transition={{
            duration: 0.65,
            delay: 0.15,
            ease: smoothEase,
          }}
          className="text-xl font-semibold tracking-[-0.02em] text-black sm:text-[23px]"
        >
          {project.title}
        </motion.h3>

        <motion.p
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
            amount: 0.8,
          }}
          transition={{
            duration: 0.65,
            delay: 0.25,
            ease: smoothEase,
          }}
          className="mt-3 max-w-xl text-[13px] leading-6 text-neutral-500 sm:text-sm"
        >
          {project.description}
        </motion.p>
      </div>
    </motion.article>
  );
}