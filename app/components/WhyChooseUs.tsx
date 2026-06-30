"use client";

import { motion } from "framer-motion";

const features = [
  { title: "Innovative",  subtitle: "Design",        desc: "Smart layouts inspired by modern family lifestyles." },
  { title: "Exceptional", subtitle: "Service",       desc: "Personalised support from inquiry to possession." },
  { title: "Quality",     subtitle: "Craftsmanship", desc: "Precision-built homes with lasting structural excellence." },
];

const featureContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const featureItem = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 65, damping: 17 } },
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-28 bg-white">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.10)] flex flex-col lg:flex-row"
        >

          {/* ── Left: heading + features ── */}
          <div className="flex-1 flex flex-col justify-between gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16">

            <motion.h2
              initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight"
            >
              Why{" "}
              <span className="text-[#b08c1c]">Homebuyers Choose</span>
              <br />
              Dev Appartments
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={featureContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
            >
              {features.map((f) => (
                <motion.div key={f.title} variants={featureItem}>
                  <p className="font-black text-gray-900 text-lg leading-tight font-primary">{f.title}</p>
                  <p className="font-black text-[#b08c1c] text-lg leading-tight mb-3 font-primary">{f.subtitle}</p>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* ── Right: building image ── */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 1.04 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 h-64 lg:h-auto lg:w-[44%] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85&auto=format&fit=crop"
              alt="Dev Appartments building"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
