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
    title: "Dev pristine villa",
    image: "/images/completed-project-images/1.png",
    description:
      "kathiravan salai - Neelankarai, ECR",
  },
  {
    id: 2,
    title: "Villa,Pushpa Ave",
    image: "/images/completed-project-images/2.png",
    description:
      "ECR",
  },
  {
    id: 3,
    title: "Villa, pea cock enclave-4",
    image: "/images/completed-project-images/3.png",
    description:
      "Neelankarai, ECR",
  },
  {
    id: 4,
    title: "Villa, pea cock enclave-3",
    image: "/images/completed-project-images/4.png",
    description:
      "Neelankarai, ECR",
  },
  {
    id: 5,
    title: "3star hotel",
    image: "/images/completed-project-images/5.png",
    description:
      "1996,Mylapore",
  },
  {
    id: 6,
    title: "Adyar",
    image: "/images/completed-project-images/6.png",
    description:
      "1996,16 Units,2BHK ",
  },
  {
    id: 7,
    title: "Adyar",
    image: "/images/completed-project-images/7.png",
    description:
      "Gandhi Nagar 1st Main Road, 1985, 36 units, 2& 3BHK Flats. Residential & Commercial",
  },
  {
    id: 8,
    title: "Adyar",
    image: "/images/completed-project-images/8.png",
    description:
      "Gandhi Nagar,1994, 24 Residential Units & 3 Commercial units",
  },
  {
    id: 9,
    title: "Adyar",
    image: "/images/completed-project-images/9.png",
    description:
      "Indira Nagar,1996,16 Units,2&3 BHK",
  },
  {
    id: 10,
    title: "Adyar",
    image: "/images/completed-project-images/10.png",
    description:
      "Kasturi Bai Nagar, 1992, 20 Units, 2&3 BHK",
  },
  {
    id: 11,
    title: "Adyar",
    image: "/images/completed-project-images/11.png",
    description:
      "Gandhi Nagar,1994, 24 Residential Units & 3 Commercial units",
  },
  {
    id: 12,
    title: "Adyar",
    image: "/images/completed-project-images/12.png",
    description:
      "Indira Nagar,1996,16 Units,2&3 BHK",
  },

  {
    id: 13,
    title: "Adyar",
    image: "/images/completed-project-images/13.png",
    description:
      "Kasturi Bai Nagar, 1995, 16 Units, 2&3 BHK",
  },
  {
    id: 14,
    title: "Adyar_1",
    image: "/images/completed-project-images/14.png",
    description:
      "Kasturi Bai Nagar, 1995, 16 Units, 2&3 BHK",
  },
  {
    id: 15,
    title: "Ashok nagar",
    image: "/images/completed-project-images/15.png",
    description:
      "12Ave, 2003,16 Units,2BHK",
  },
  {
    id: 16,
    title: "Besant nagar",
    image: "/images/completed-project-images/16.png",
    description:
      "1993, 10 Units,2&3 BHK",
  },
  {
    id: 17,
    title: "Besant nagar",
    image: "/images/completed-project-images/17.png",
    description:
      "1993, 16 Units,2&3 BHK",
  },
  {
    id: 18,
    title: "Besant nagar",
    image: "/images/completed-project-images/18.png",
    description:
      "1997, 32 Units,2&3 BHK",
  },
  {
    id: 19,
    title: "Bhavani street",
    image: "/images/completed-project-images/19.png",
    description:
      "ECR",
  },
  {
    id: 20,
    title: "Bypass road",
    image: "/images/completed-project-images/20.png",
    description:
      "Velachery, 2005, 6 Units, residential 2& 3 BHK",
  },
  {
    id: 21,
    title: "Bypass road",
    image: "/images/completed-project-images/21.png",
    description:
      "Velachery, 2005, 16 units residential 2& 3 BHK Flats",
  },
  {
    id: 22,
    title: "Dev final",
    image: "/images/completed-project-images/22.png",
    description:
      "ECR",
  },
  {
    id: 23,
    title: "T nagar",
    image: "/images/completed-project-images/23.png",
    description:
      "ECR",
  },
  {
    id: 24,
    title: "Hotel shelter",
    image: "/images/completed-project-images/24.png",
    description:
      "Mylapore, Commercial with Double Basement",
  },
  {
    id: 25,
    title: "Kasturibai nagar ",
    image: "/images/completed-project-images/25.png",
    description:
      "Adyar, 2000, 6 Units, 2BHK",
  },
  {
    id: 26,
    title: "Pallikaranai",
    image: "/images/completed-project-images/26.png",
    description:
      "5th Main Road",
  },
  {
    id: 27,
    title: "pallikaranai",
    image: "/images/completed-project-images/27.png",
    description:
      "6th Main Road",
  },
  {
    id: 28,
    title: "Pallikaranai-3",
    image: "/images/completed-project-images/28.png",
    description:
      "4th Main Road, 2008, 4 Units, 2BHK",
  },
  {
    id: 29,
    title: "R.A.puram",
    image: "/images/completed-project-images/29.png",
    description:
      "St.Mary's Road, 1992, 60 Units, Residential & Commercial",
  },
  {
    id: 30,
    title: "Thiruvanmiyur",
    image: "/images/completed-project-images/30.png",
    description:
      "1991, 20Units, 2& 3 BHK",
  },
  {
    id: 31,
    title: "Thiruvanmiyur",
    image: "/images/completed-project-images/31.png",
    description:
      "1993, 12 Units, 2BHK flats",
  },
  {
    id: 32,
    title: "Thiruvanmiyur",
    image: "/images/completed-project-images/32.png",
    description:
      " 2001, 8 units, 2& 3 BHK",
  },
  {
    id: 33,
    title: "Velachery",
    image: "/images/completed-project-images/33.png",
    description:
      "Taramani Road, 2003, 32 Units, 2&3 BHK Flats",
  },
  {
    id: 34,
    title: "Velachery",
    image: "/images/completed-project-images/34.png",
    description:
      "Baby Nagar, 2000, 60 Units, 2BHK",
  },
  {
    id: 35,
    title: "Velachery",
    image: "/images/completed-project-images/35.png",
    description:
      "Soni Nagar,2009, 6 Units, 3BHK",
  },
  {
    id: 36,
    title: "Velachery",
    image: "/images/completed-project-images/36.png",
    description:
      "Bypass Road, 2004, 12 2& 3 BHK Flats & Commercial",
  },
  {
    id: 37,
    title: "Velachery",
    image: "/images/completed-project-images/37.png",
    description:
      "Sarathy Nagar, 2004, 5 Blocks, 20 Units, 2BHK",
  },
  {
    id: 38,
    title: "Velachery",
    image: "/images/completed-project-images/38.png",
    description:
      "Sarathy Nagar, 2005, 20 Units",
  },
  {
    id: 39,
    title: "Velachery",
    image: "/images/completed-project-images/39.png",
    description:
      "Taramani Raod, 2003, 32 Units",
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