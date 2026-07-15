"use client";

import Image from "next/image";
import {
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type ProjectType =
  | "All Projects"
  | "Villa"
  | "Apartment"
  | "Commercial";

const projects: Project[] = [
  {
    id: 1,
    title: "Dev pristine villa",
    image: "/images/completed-project-images/1.png",
    description: "kathiravan salai - Neelankarai, ECR",
  },
  {
    id: 2,
    title: "Villa,Pushpa Ave",
    image: "/images/completed-project-images/2.png",
    description: "ECR",
  },
  {
    id: 3,
    title: "Villa, pea cock enclave-4",
    image: "/images/completed-project-images/3.png",
    description: "Neelankarai, ECR",
  },
  {
    id: 4,
    title: "Villa, pea cock enclave-3",
    image: "/images/completed-project-images/4.png",
    description: "Neelankarai, ECR",
  },
  {
    id: 5,
    title: "3star hotel",
    image: "/images/completed-project-images/5.png",
    description: "1996,Mylapore",
  },
  {
    id: 6,
    title: "Adyar",
    image: "/images/completed-project-images/6.png",
    description: "1996,16 Units,2BHK",
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
    description: "Indira Nagar,1996,16 Units,2&3 BHK",
  },
  {
    id: 10,
    title: "Adyar",
    image: "/images/completed-project-images/10.png",
    description: "Kasturi Bai Nagar, 1992, 20 Units, 2&3 BHK",
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
    description: "Indira Nagar,1996,16 Units,2&3 BHK",
  },
  {
    id: 13,
    title: "Adyar",
    image: "/images/completed-project-images/13.png",
    description: "Kasturi Bai Nagar, 1995, 16 Units, 2&3 BHK",
  },
  {
    id: 14,
    title: "Adyar_1",
    image: "/images/completed-project-images/14.png",
    description: "Kasturi Bai Nagar, 1995, 16 Units, 2&3 BHK",
  },
  {
    id: 15,
    title: "Ashok nagar",
    image: "/images/completed-project-images/15.png",
    description: "12Ave, 2003,16 Units,2BHK",
  },
  {
    id: 16,
    title: "Besant nagar",
    image: "/images/completed-project-images/16.png",
    description: "1993, 10 Units,2&3 BHK",
  },
  {
    id: 17,
    title: "Besant nagar",
    image: "/images/completed-project-images/17.png",
    description: "1993, 16 Units,2&3 BHK",
  },
  {
    id: 18,
    title: "Besant nagar",
    image: "/images/completed-project-images/18.png",
    description: "1997, 32 Units,2&3 BHK",
  },
  {
    id: 19,
    title: "Bhavani street",
    image: "/images/completed-project-images/19.png",
    description: "ECR",
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
    description: "ECR",
  },
  {
    id: 23,
    title: "T nagar",
    image: "/images/completed-project-images/23.png",
    description: "ECR",
  },
  {
    id: 24,
    title: "Hotel shelter",
    image: "/images/completed-project-images/24.png",
    description: "Mylapore, Commercial with Double Basement",
  },
  {
    id: 25,
    title: "Kasturibai nagar",
    image: "/images/completed-project-images/25.png",
    description: "Adyar, 2000, 6 Units, 2BHK",
  },
  {
    id: 26,
    title: "Pallikaranai",
    image: "/images/completed-project-images/26.png",
    description: "5th Main Road",
  },
  {
    id: 27,
    title: "pallikaranai",
    image: "/images/completed-project-images/27.png",
    description: "6th Main Road",
  },
  {
    id: 28,
    title: "Pallikaranai-3",
    image: "/images/completed-project-images/28.png",
    description: "4th Main Road, 2008, 4 Units, 2BHK",
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
    description: "1991, 20Units, 2& 3 BHK",
  },
  {
    id: 31,
    title: "Thiruvanmiyur",
    image: "/images/completed-project-images/31.png",
    description: "1993, 12 Units, 2BHK flats",
  },
  {
    id: 32,
    title: "Thiruvanmiyur",
    image: "/images/completed-project-images/32.png",
    description: "2001, 8 units, 2& 3 BHK",
  },
  {
    id: 33,
    title: "Velachery",
    image: "/images/completed-project-images/33.png",
    description: "Taramani Road, 2003, 32 Units, 2&3 BHK Flats",
  },
  {
    id: 34,
    title: "Velachery",
    image: "/images/completed-project-images/34.png",
    description: "Baby Nagar, 2000, 60 Units, 2BHK",
  },
  {
    id: 35,
    title: "Velachery",
    image: "/images/completed-project-images/35.png",
    description: "Soni Nagar,2009, 6 Units, 3BHK",
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
    description: "Sarathy Nagar, 2005, 20 Units",
  },
  {
    id: 39,
    title: "Velachery",
    image: "/images/completed-project-images/39.png",
    description: "Taramani Raod, 2003, 32 Units",
  },
];

const projectTypes: ProjectType[] = [
  "All Projects",
  "Villa",
  "Apartment",
  "Commercial",
];

const locationAliases: Record<string, string[]> = {
  Adyar: [
    "adyar",
    "gandhi nagar",
    "indira nagar",
    "kasturi bai nagar",
    "kasturibai nagar",
  ],
  "Ashok Nagar": ["ashok nagar"],
  "Besant Nagar": ["besant nagar"],
  ECR: [
    "ecr",
    "bhavani street",
    "pushpa ave",
    "dev final",
  ],
  Mylapore: [
    "mylapore",
    "hotel shelter",
    "3star hotel",
  ],
  Neelankarai: [
    "neelankarai",
    "pea cock enclave",
  ],
  Pallikaranai: ["pallikaranai"],
  "R.A. Puram": [
    "r.a.puram",
    "r.a. puram",
    "st.mary's road",
  ],
  "T Nagar": ["t nagar"],
  Thiruvanmiyur: ["thiruvanmiyur"],
  Velachery: [
    "velachery",
    "bypass road",
    "taramani",
    "baby nagar",
    "soni nagar",
    "sarathy nagar",
  ],
};

function getProjectType(
  project: Project,
): Exclude<ProjectType, "All Projects"> {
  const value =
    `${project.title} ${project.description}`.toLowerCase();

  if (
    value.includes("hotel") ||
    value.includes("commercial") ||
    value.includes("3star")
  ) {
    return "Commercial";
  }

  if (value.includes("villa")) {
    return "Villa";
  }

  return "Apartment";
}

function getProjectLocation(project: Project) {
  const value =
    `${project.title} ${project.description}`.toLowerCase();

  const matchedLocation = Object.entries(locationAliases).find(
    ([, aliases]) =>
      aliases.some((alias) => value.includes(alias)),
  );

  return matchedLocation?.[0] ?? "Other";
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] =
    useState<ProjectType>("All Projects");
  const [selectedLocation, setSelectedLocation] =
    useState("All Locations");

  const [isSearchFocused, setIsSearchFocused] =
    useState(false);

  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState(-1);

  const locations = useMemo(() => {
    const values = Array.from(
      new Set(projects.map(getProjectLocation)),
    ).sort((a, b) => a.localeCompare(b));

    return ["All Locations", ...values];
  }, []);

  const filteredProjects = useMemo(() => {
    const searchValue = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const projectValue =
        `${project.title} ${project.description}`.toLowerCase();

      const matchesSearch =
        !searchValue ||
        projectValue.includes(searchValue);

      const matchesType =
        selectedType === "All Projects" ||
        getProjectType(project) === selectedType;

      const matchesLocation =
        selectedLocation === "All Locations" ||
        getProjectLocation(project) === selectedLocation;

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation
      );
    });
  }, [
    searchQuery,
    selectedType,
    selectedLocation,
  ]);

  const searchSuggestions = useMemo(() => {
    const value = searchQuery.trim().toLowerCase();

    if (!value) {
      return [];
    }

    return projects
      .filter((project) => {
        const projectValue =
          `${project.title} ${project.description}`.toLowerCase();

        const matchesSearch =
          projectValue.includes(value);

        const matchesType =
          selectedType === "All Projects" ||
          getProjectType(project) === selectedType;

        const matchesLocation =
          selectedLocation === "All Locations" ||
          getProjectLocation(project) === selectedLocation;

        return (
          matchesSearch &&
          matchesType &&
          matchesLocation
        );
      })
      .slice(0, 6);
  }, [
    searchQuery,
    selectedType,
    selectedLocation,
  ]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedType !== "All Projects" ||
    selectedLocation !== "All Locations";

  const showSuggestions =
    isSearchFocused &&
    searchQuery.trim().length > 0;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("All Projects");
    setSelectedLocation("All Locations");
    setIsSearchFocused(false);
    setActiveSuggestionIndex(-1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setActiveSuggestionIndex(-1);
  };

  const selectSuggestion = (project: Project) => {
    setSearchQuery(project.title);
    setIsSearchFocused(false);
    setActiveSuggestionIndex(-1);
  };

  const handleSearchKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!showSuggestions || searchSuggestions.length === 0) {
      if (event.key === "Escape") {
        setIsSearchFocused(false);
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveSuggestionIndex((current) =>
        current < searchSuggestions.length - 1
          ? current + 1
          : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveSuggestionIndex((current) =>
        current > 0
          ? current - 1
          : searchSuggestions.length - 1,
      );
    }

    if (
      event.key === "Enter" &&
      activeSuggestionIndex >= 0
    ) {
      event.preventDefault();

      selectSuggestion(
        searchSuggestions[activeSuggestionIndex],
      );
    }

    if (event.key === "Escape") {
      setIsSearchFocused(false);
      setActiveSuggestionIndex(-1);
    }
  };

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
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12 lg:mb-14"
        >
          <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.04em] text-black sm:text-[42px] lg:text-[52px]">
            Where{" "}
            <span className="text-[#b78b45]">
              Vision
            </span>
            <br />
            <span className="text-[#b78b45]">
              Becomes
            </span>{" "}
            Reality!
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
            Every completed project is a reflection of our
            passion for quality, innovation and timeless
            design. Discover homes built to inspire
            confidence, comfort, and lasting value. Explore
            the homes we&apos;ve proudly delivered, where
            thoughtful design meets enduring craftsmanship.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: smoothEase,
          }}
          className="relative z-30 mb-12 sm:mb-14 lg:mb-16"
        >
          <div className="rounded-[24px] border border-[#eee8de] bg-[#fbfaf7] p-4 shadow-[0_18px_60px_rgba(55,42,20,0.08)] sm:p-5 lg:p-6">
            {/* Top Row */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
              {/* Search */}
              <div className="relative min-w-0 flex-1">
                <div className="relative z-20">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9d968c]"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                    />
                    <path d="m20 20-3.5-3.5" />
                  </svg>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setActiveSuggestionIndex(-1);
                    }}
                    onFocus={() => {
                      setIsSearchFocused(true);
                    }}
                    onBlur={() => {
                      window.setTimeout(() => {
                        setIsSearchFocused(false);
                        setActiveSuggestionIndex(-1);
                      }, 150);
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search project, area, year or BHK..."
                    aria-label="Search completed projects"
                    aria-expanded={showSuggestions}
                    aria-autocomplete="list"
                    autoComplete="off"
                    spellCheck={false}
                    className={`h-[58px] w-full rounded-[16px] border bg-white pl-14 pr-14 text-[15px] font-medium text-neutral-900 outline-none transition placeholder:font-normal placeholder:text-neutral-400 ${
                      showSuggestions
                        ? "border-[#b78b45] ring-4 ring-[#b78b45]/10"
                        : "border-[#e5dfd4] focus:border-[#b78b45] focus:ring-4 focus:ring-[#b78b45]/10"
                    }`}
                  />

                  <AnimatePresence>
                    {searchQuery.length > 0 && (
                      <motion.button
                        type="button"
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                        onMouseDown={(event) => {
                          event.preventDefault();
                        }}
                        onClick={clearSearch}
                        aria-label="Clear search"
                        className="absolute right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-[#eee7dc] hover:text-[#9b7133]"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                        >
                          <path d="M6 6l12 12" />
                          <path d="M18 6 6 18" />
                        </svg>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                        scale: 0.985,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.985,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: smoothEase,
                      }}
                      className="absolute left-0 right-0 top-[66px] z-50 overflow-hidden rounded-[18px] border border-[#e8dfd1] bg-white shadow-[0_22px_55px_rgba(42,33,19,0.16)]"
                    >
                      {searchSuggestions.length > 0 ? (
                        <>
                          <div className="flex items-center justify-between border-b border-[#eee8df] px-4 py-3 sm:px-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                              Suggested projects
                            </p>

                            <span className="rounded-full bg-[#f5eddf] px-2.5 py-1 text-[11px] font-bold text-[#9d7436]">
                              {searchSuggestions.length}
                            </span>
                          </div>

                          <div
                            role="listbox"
                            className="max-h-[390px] overflow-y-auto p-2"
                          >
                            {searchSuggestions.map(
                              (project, index) => {
                                const isActive =
                                  index ===
                                  activeSuggestionIndex;

                                return (
                                  <button
                                    key={project.id}
                                    type="button"
                                    role="option"
                                    aria-selected={isActive}
                                    onMouseDown={(event) => {
                                      event.preventDefault();
                                    }}
                                    onMouseEnter={() => {
                                      setActiveSuggestionIndex(
                                        index,
                                      );
                                    }}
                                    onClick={() => {
                                      selectSuggestion(project);
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-[13px] p-2.5 text-left transition sm:gap-4 ${
                                      isActive
                                        ? "bg-[#f8f1e5]"
                                        : "hover:bg-[#faf8f4]"
                                    }`}
                                  >
                                    <div className="relative h-14 w-[76px] shrink-0 overflow-hidden rounded-[10px] bg-neutral-100 sm:h-16 sm:w-[90px]">
                                      <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="90px"
                                        className="object-cover"
                                      />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                          <h4 className="truncate text-sm font-semibold text-neutral-900 sm:text-[15px]">
                                            {project.title}
                                          </h4>

                                          <p className="mt-1 line-clamp-1 text-xs leading-5 text-neutral-500 sm:text-[13px]">
                                            {project.description}
                                          </p>
                                        </div>

                                        <span className="hidden shrink-0 rounded-full bg-[#f5eddf] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#956b2e] sm:block">
                                          {getProjectType(
                                            project,
                                          )}
                                        </span>
                                      </div>

                                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-[#9d7436]">
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="1.8"
                                          className="h-3.5 w-3.5"
                                        >
                                          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                          <circle
                                            cx="12"
                                            cy="10"
                                            r="2.5"
                                          />
                                        </svg>

                                        {getProjectLocation(
                                          project,
                                        )}
                                      </div>
                                    </div>

                                    <svg
                                      aria-hidden="true"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      className={`h-5 w-5 shrink-0 transition ${
                                        isActive
                                          ? "translate-x-0 text-[#b78b45]"
                                          : "-translate-x-1 text-neutral-300"
                                      }`}
                                    >
                                      <path d="m9 18 6-6-6-6" />
                                    </svg>
                                  </button>
                                );
                              },
                            )}
                          </div>

                          <div className="border-t border-[#eee8df] bg-[#fcfaf7] px-4 py-3 text-xs text-neutral-400 sm:px-5">
                            Use the arrow keys to navigate and
                            press Enter to select.
                          </div>
                        </>
                      ) : (
                        <div className="px-5 py-8 text-center">
                          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f1e7]">
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              className="h-5 w-5 text-[#b78b45]"
                            >
                              <circle
                                cx="11"
                                cy="11"
                                r="7"
                              />
                              <path d="m20 20-3.5-3.5" />
                            </svg>
                          </div>

                          <h4 className="mt-3 text-sm font-semibold text-neutral-900">
                            No recommendations found
                          </h4>

                          <p className="mt-1 text-xs leading-5 text-neutral-500">
                            Try another project, area, year,
                            or BHK keyword.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Location Filter */}
              <div className="relative w-full xl:w-[260px]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9d968c]"
                >
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                  />
                </svg>

                <select
                  value={selectedLocation}
                  onChange={(event) => {
                    setSelectedLocation(event.target.value);
                    setActiveSuggestionIndex(-1);
                  }}
                  aria-label="Filter by location"
                  className="h-[58px] w-full cursor-pointer appearance-none rounded-[16px] border border-[#e5dfd4] bg-white pl-14 pr-12 text-[15px] font-semibold text-neutral-800 outline-none transition focus:border-[#b78b45] focus:ring-4 focus:ring-[#b78b45]/10"
                >
                  {locations.map((location) => (
                    <option
                      key={location}
                      value={location}
                    >
                      {location}
                    </option>
                  ))}
                </select>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                >
                  <path d="m7 10 5 5 5-5" />
                </svg>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-5 flex flex-col gap-5 border-t border-[#ebe5dc] pt-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Project Types */}
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => {
                  const isActive =
                    selectedType === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedType(type);
                        setActiveSuggestionIndex(-1);
                      }}
                      className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition sm:px-5 ${
                        isActive
                          ? "border-[#b78b45] bg-[#b78b45] text-white shadow-[0_8px_20px_rgba(183,139,69,0.24)]"
                          : "border-[#e2dccf] bg-white text-neutral-600 hover:border-[#c7a66e] hover:text-[#9d7436]"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>

              {/* Result and Clear */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div
                  aria-live="polite"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm text-neutral-500 shadow-sm"
                >
                  <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#f3eadb] px-2 text-xs font-bold text-[#9c7132]">
                    {filteredProjects.length}
                  </span>

                  <span>
                    {filteredProjects.length === 1
                      ? "Project found"
                      : "Projects found"}
                  </span>
                </div>

                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.button
                      type="button"
                      initial={{
                        opacity: 0,
                        x: 12,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 12,
                      }}
                      onClick={clearFilters}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dacbb3] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#9b7133] transition hover:bg-[#b78b45] hover:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path d="M3 12a9 9 0 1 0 3-6.7" />
                        <path d="M3 4v6h6" />
                      </svg>

                      Clear filters
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:gap-x-16 lg:gap-y-20"
            >
              {filteredProjects.map(
                (project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ),
              )}
            </motion.div>
          ) : (
            <motion.div
              key="no-projects"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.4,
                ease: smoothEase,
              }}
              className="rounded-[24px] border border-dashed border-[#d8cbb5] bg-[#fbfaf7] px-6 py-16 text-center sm:py-20"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_25px_rgba(0,0,0,0.07)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-7 w-7 text-[#b78b45]"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-black">
                No matching projects
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
                No projects match the selected search and
                filters. Try changing the location, project
                type, or search keyword.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#b78b45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9f7739]"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
      layout
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      exit={{
        opacity: 0,
        y: 20,
        scale: 0.97,
      }}
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

        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.04]" />

        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#b78b45] transition-all duration-700 ease-out group-hover:w-full" />
      </motion.div>

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