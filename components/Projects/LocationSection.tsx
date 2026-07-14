"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import {
  Church,
  Clock3,
  GraduationCap,
  Hospital,
  Landmark,
  School,
  ShoppingBasket,
  TrainFront,
  type LucideIcon,
} from "lucide-react";

type NearbyPlace = {
  name: string;
  distance: string;
  travelTime: string;
};

type NearbyCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  places: NearbyPlace[];
};

const nearbyCategories: NearbyCategory[] = [
  {
    id: "schools",
    title: "Schools",
    icon: School,
    places: [
      {
        name: "Sri Sankara Senior Secondary School",
        distance: "1.2 km",
        travelTime: "5 min",
      },
      {
        name: "The Hindu Senior Secondary School",
        distance: "2.6 km",
        travelTime: "9 min",
      },
    ],
  },
  {
    id: "hospitals",
    title: "Hospitals",
    icon: Hospital,
    places: [
      {
        name: "Apollo Speciality Hospital",
        distance: "2.4 km",
        travelTime: "8 min",
      },
      {
        name: "Fortis Malar Hospital",
        distance: "4.1 km",
        travelTime: "14 min",
      },
    ],
  },
  {
    id: "colleges",
    title: "Colleges",
    icon: GraduationCap,
    places: [
      {
        name: "Madras School of Economics",
        distance: "3.8 km",
        travelTime: "12 min",
      },
      {
        name: "Institute of Hotel Management",
        distance: "4.5 km",
        travelTime: "15 min",
      },
    ],
  },
  {
    id: "worship",
    title: "Worship",
    icon: Church,
    places: [
      {
        name: "Marundeeswarar Temple",
        distance: "1.5 km",
        travelTime: "6 min",
      },
      {
        name: "Nearby Mosque and Church",
        distance: "2.3 km",
        travelTime: "9 min",
      },
    ],
  },
  {
    id: "city",
    title: "City Centre",
    icon: Landmark,
    places: [
      {
        name: "Thiruvanmiyur Junction",
        distance: "2.0 km",
        travelTime: "7 min",
      },
      {
        name: "Adyar",
        distance: "4.6 km",
        travelTime: "15 min",
      },
    ],
  },
  {
    id: "markets",
    title: "Markets",
    icon: ShoppingBasket,
    places: [
      {
        name: "Thiruvanmiyur Market",
        distance: "900 m",
        travelTime: "4 min",
      },
      {
        name: "Nearby Supermarket",
        distance: "1.4 km",
        travelTime: "6 min",
      },
    ],
  },
  {
    id: "transport",
    title: "Transport",
    icon: TrainFront,
    places: [
      {
        name: "Thiruvanmiyur Bus Terminus",
        distance: "1.7 km",
        travelTime: "6 min",
      },
      {
        name: "Thiruvanmiyur MRTS Station",
        distance: "2.8 km",
        travelTime: "10 min",
      },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mapVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function LocationSection() {
  const [activeId, setActiveId] = useState(
    nearbyCategories[0].id,
  );

  const activeCategory =
    nearbyCategories.find(
      (category) => category.id === activeId,
    ) ?? nearbyCategories[0];

  const ActiveIcon = activeCategory.icon;

  return (
    <section className="relative overflow-hidden bg-[#f7f5ef] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[320px] w-[320px] rounded-full bg-[#b88a44]/10 blur-[110px]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.14,
        }}
        className="relative mx-auto max-w-7xl"
      >
        {/* Heading */}
        <motion.div
          variants={fadeUpVariants}
          className="mb-7 max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#b88a44]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a77a39]">
              Our Location
            </p>
          </div>

          <h2 className="mt-3 text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-[#1f1f1f] sm:text-4xl">
            Well connected to everyday essentials.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Schools, hospitals, markets and major transport
            facilities are easily accessible from Dev Apartment.
          </p>
        </motion.div>

        <div className="grid items-start gap-5 lg:grid-cols-[1.12fr_0.88fr] lg:gap-6">
          {/* Map */}
          <motion.div
            variants={mapVariants}
            className="group relative h-[360px] overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_20px_55px_rgba(30,30,30,0.08)] sm:h-[430px] lg:h-[500px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25908.822089435347!2d80.2299377535103!3d13.007509636536266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e062999005%3A0xd986fb71dc835b1d!2sDev%20apartment!5e0!3m2!1sen!2sin!4v1782985424149!5m2!1sen!2sin"
              title="Dev Apartment Location"
              className="absolute inset-0 h-full w-full border-0 grayscale-[10%] transition duration-700 group-hover:grayscale-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </motion.div>

          {/* Nearby panel */}
          <motion.div
            variants={panelVariants}
            className="rounded-[24px] border border-black/[0.07] bg-white p-4 shadow-[0_20px_55px_rgba(30,30,30,0.07)] sm:p-5"
          >
            <div className="border-b border-black/[0.07] pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a77a39]">
                Nearby Locations
              </p>

              <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.03em] text-[#1f1f1f] sm:text-2xl">
                Essentials & Connectivity
              </h3>
            </div>

            {/* Small category tabs */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {nearbyCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeId === category.id;

                return (
                  <motion.button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveId(category.id)}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className={`flex min-h-[66px] flex-col items-center justify-center rounded-xl border px-1.5 py-2 text-center transition-all duration-300 ${
                      isActive
                        ? "border-[#172033] bg-[#172033] text-white shadow-[0_8px_20px_rgba(23,32,51,0.16)]"
                        : "border-black/[0.07] bg-[#fbfaf7] text-[#262626] hover:border-[#b88a44]/35"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={
                        isActive
                          ? "text-[#d9b06c]"
                          : "text-[#a77a39]"
                      }
                    />

                    <span className="mt-1.5 text-[9px] font-semibold leading-3 sm:text-[10px]">
                      {category.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Selected category */}
            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                  }}
                  transition={{
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-2xl bg-[#f8f5ee] p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#b88a44] text-white">
                      <ActiveIcon size={17} />
                    </div>

                    <h4 className="text-base font-semibold text-[#1f1f1f]">
                      {activeCategory.title}
                    </h4>
                  </div>

                  <div className="mt-3 space-y-2">
                    {activeCategory.places.map(
                      (place, index) => (
                        <motion.div
                          key={place.name}
                          initial={{
                            opacity: 0,
                            x: 8,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.07,
                            duration: 0.3,
                          }}
                          className="flex items-center justify-between gap-3 rounded-xl border border-black/[0.06] bg-white p-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-[#252525] sm:text-sm">
                              {place.name}
                            </p>

                            <div className="mt-1 flex items-center gap-1 text-[9px] text-gray-400">
                              <Clock3 size={10} />

                              <span>{place.travelTime}</span>
                            </div>
                          </div>

                          <span className="shrink-0 rounded-full bg-[#172033] px-2.5 py-1 text-[9px] font-semibold text-white">
                            {place.distance}
                          </span>
                        </motion.div>
                      ),
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}