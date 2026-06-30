"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    source: "MagicBricks",
    name: "Sashank",
    role: "Owner",
    text: "Just moved in with my family and loving this place. It is very good locality with good environment and close to beach. Neighbours are co operative, very helpful and friendly too. Good sea breeze all through the interior.",
  },
  {
    id: 2,
    source: "99Acres",
    name: "Priya Ramesh",
    role: "Home Owner",
    text: "Dev Appartments exceeded all our expectations. The build quality is outstanding and the team was incredibly supportive throughout our purchase journey. We couldn't be happier with our new home.",
  },
  {
    id: 3,
    source: "Housing.com",
    name: "Karthik Sundaram",
    role: "Investor",
    text: "I've invested in multiple properties over the years. Dev Appartments stands out for their transparency, timely delivery, and exceptional after-sales support. Highly recommended to every serious buyer.",
  },
  {
    id: 4,
    source: "NoBroker",
    name: "Anitha Krishnan",
    role: "Home Owner",
    text: "The location is perfect and the community is wonderful. Every amenity promised has been delivered on time. The construction quality is solid and the team was always available to answer our questions.",
  },
];

const variants = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0, filter: "blur(6px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit:   (dir: number) => ({ x: dir * -80, opacity: 0, filter: "blur(6px)" }),
};

function PersonAvatar() {
  return (
    <div className="w-10 h-10 rounded-full bg-[#e8f0f7] flex items-center justify-center shrink-0">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="4" fill="#7aadcc" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#7aadcc" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused]       = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(id);
  }, [paused]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const t = testimonials[current];

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">

      {/* Decorative arc lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 420"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle cx="-40"  cy="210" r="220" fill="none" stroke="#c9a96e" strokeWidth="0.9" opacity="0.28" />
        <circle cx="-70"  cy="210" r="270" fill="none" stroke="#c9a96e" strokeWidth="0.7" opacity="0.18" />
        <circle cx="-100" cy="210" r="320" fill="none" stroke="#c9a96e" strokeWidth="0.6" opacity="0.12" />
        <circle cx="1240" cy="210" r="220" fill="none" stroke="#c9a96e" strokeWidth="0.9" opacity="0.28" />
        <circle cx="1270" cy="210" r="270" fill="none" stroke="#c9a96e" strokeWidth="0.7" opacity="0.18" />
        <circle cx="1300" cy="210" r="320" fill="none" stroke="#c9a96e" strokeWidth="0.6" opacity="0.12" />
      </svg>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-8">

        {/* Heading — blur fade, reverses on scroll back */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <h2 className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[38px] font-black text-gray-900 mb-3">
            Hear From{" "}
            <span className="text-[#b08c1c] italic">Customers</span>
          </h2>
          <p className="text-gray-400 text-[12.5px] sm:text-[13px] max-w-xs mx-auto leading-relaxed">
            What our clients are saying Achieving client objectives, satisfaction and trust.
            Also support us and would willingly recommended.
          </p>
        </motion.div>

        {/* Card + dots — slides in from side, reverses on scroll back */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10 shadow-[0_2px_28px_rgba(0,0,0,0.07)]"
              >
                <p className="text-gray-500 text-[13.5px] sm:text-[14.5px] leading-[1.85] mb-8">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <PersonAvatar />
                  <p className="text-gray-700 text-[13px] sm:text-[13.5px]">
                    <span className="font-bold text-gray-900">{t.source}</span>
                    {" "}-{" "}{t.name} ({t.role})
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 min-w-3 ${
                  i === current ? "w-8 bg-[#b08c1c]" : "w-4 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
