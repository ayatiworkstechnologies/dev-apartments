"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* Re-animates counter every time the element enters view */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!inView) {
      setCount(0);   // reset when scrolled back past
      return;
    }
    let frame = 0;
    const duration = 1800;
    const fps      = 60;
    const total    = (duration / 1000) * fps;
    const id = setInterval(() => {
      frame++;
      const progress = frame / total;
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.min(Math.round(ease * target), target));
      if (frame >= total) clearInterval(id);
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const avatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/55.jpg",
  "https://randomuser.me/api/portraits/women/63.jpg",
];

const avatarContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  exit:  {},
};
const avatarItem = {
  hidden: { scale: 0, opacity: 0 },
  show:   { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
  exit:   { scale: 0, opacity: 0, transition: { duration: 0.25 } },
};

export default function StatsSection() {
  return (
    <section id="about" className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Stats */}
          <motion.div
            initial={{ opacity: 0, x: -44, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-1">
              <CountUp target={10000} suffix=" +" />
              <br />
              <span className="text-gray-800">Satisfied Clients</span>
            </h2>
            <p className="text-[#b08c1c] font-semibold text-lg mt-1 mb-6 font-primary">Trust by us</p>

            {/* Staggered avatar row */}
            <motion.div
              className="flex items-center gap-1"
              variants={avatarContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.4 }}
            >
              {avatars.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`client-${i}`}
                  variants={avatarItem}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  style={{ marginLeft: i > 0 ? "-8px" : "0" }}
                />
              ))}
              <motion.span
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="ml-3 text-sm text-gray-500 font-medium"
              >
                +9,996 more
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Right: About text */}
          <motion.div
            initial={{ opacity: 0, x: 44, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[#b08c1c] text-sm font-semibold tracking-widest uppercase mb-3 font-primary"
            >
              Designing Spaces Creating Experience
            </motion.p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              Dev Appartments was founded in 1985 under the stewardship of CEO and Managing Director,
              Mr. P.U. Developer with the guidance of Chairman, Mr. P.G. Murugesan — a leading light
              of the real estate industry in Chennai. Since its inception, Dev Appartments has set the
              highest standards for itself amidst great challenges and struggles.
            </p>
            <motion.a
              href="#about"
              whileHover={{ x: 5, color: "#b08c1c" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-gray-800 font-semibold text-sm transition-colors"
            >
              Get Started
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
                <ArrowRight size={12} />
              </span>
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
