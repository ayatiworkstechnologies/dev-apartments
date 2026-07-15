"use client";

import { motion } from "framer-motion";
import {
  AtSign,
  Building2,
  Mail,
  Phone,
} from "lucide-react";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/devappartmentss/",
    d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    fill: false,
  },
  {
    label: "X",
    href: "https://x.com/devappartments",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    fill: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/devappartments/",
    d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z",
    fill: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dev-appartments-2378151b0/",
    d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    fill: false,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@devappartments6112",
    d: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20.06 12 20.06 12 20.06s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02l5.75-3.02-5.75-3.02v6.04z",
    fill: false,
  },
];

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Current Projects",
    href: "/current-projects",
  },
  {
    label: "Recent Projects",
    href: "/recent-projects",
  },
  {
    label: "Completed Projects",
    href: "/completed-projects",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

const gridVariants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.05,
    },
  },
};

const colVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(8px)",
  },

  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [
        number,
        number,
        number,
        number,
      ],
    },
  },
};

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-gray-100 bg-white"
    >
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10">
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: false,
            amount: 0.1,
          }}
          className="
            grid grid-cols-1
            gap-8 pb-8 pt-10

            sm:grid-cols-2
            sm:pb-10 sm:pt-12

            lg:grid-cols-[2fr_1.4fr_1.6fr]
            lg:gap-10
          "
        >
          {/* Brand column */}
          <motion.div
            variants={colVariants}
            className="
              sm:col-span-2
              lg:col-span-1
            "
          >
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="Dev Appartments"
                className="
                  h-10 w-auto
                  object-contain

                  sm:h-12
                "
                draggable={false}
              />
            </div>

            <p
              className="
                mb-2 font-primary
                text-base font-bold
                text-gray-900
              "
            >
              Dev Appartments.
            </p>

            <p
              className="
                mb-4 max-w-sm
                text-sm leading-relaxed
                text-gray-500
              "
            >
              We, at Dev Appartments aim to be the pillar
              of success and are unparalleled when it
              comes to the real estate business.
            </p>

            <p
              className="
                mb-1 font-primary
                text-sm font-bold
                text-gray-800
              "
            >
              Mon–Fri, 09:00 AM–06:00 PM
            </p>

            <p
              className="
                mb-5 font-primary
                text-sm font-bold
                text-gray-800
              "
            >
              Sunday Holiday
            </p>

            {/* Social media */}
            <div className="flex flex-wrap items-center gap-4">
              {socials.map(
                ({
                  label,
                  href,
                  d,
                  fill,
                }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={`Visit Dev Appartments on ${label}`}
                    title={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.2,
                      opacity: 0.75,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="
                      rounded-full p-1
                      text-[#e8612c]
                      transition-opacity
                      duration-200

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#e8612c]/30
                    "
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={
                        fill
                          ? "currentColor"
                          : "none"
                      }
                      stroke={
                        fill
                          ? "none"
                          : "currentColor"
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={d} />
                    </svg>
                  </motion.a>
                ),
              )}

              {/* Threads */}
              <motion.a
                href="https://www.threads.net/@devappartments"
                aria-label="Visit Dev Appartments on Threads"
                title="Threads"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  opacity: 0.75,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="
                  rounded-full p-1
                  text-[#e8612c]
                  transition-opacity
                  duration-200

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#e8612c]/30
                "
              >
                <AtSign
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Discover More */}
          <motion.div variants={colVariants}>
            <p
              className="
                mb-5 font-primary
                text-base font-bold
                text-gray-900
              "
            >
              Discover More
            </p>

            <ul className="space-y-3.5">
              {navLinks.map(
                ({ label, href }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="
                        h-[5px] w-[5px]
                        shrink-0 rounded-full
                        bg-gray-400
                      "
                    />

                    <a
                      href={href}
                      className="
                        text-sm text-gray-600
                        transition-colors
                        duration-200

                        hover:text-[#b08c1c]
                      "
                    >
                      {label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={colVariants}
            className="space-y-6"
          >
            <div>
              <p
                className="
                  mb-2 flex items-center
                  gap-2 font-primary
                  text-base font-bold
                  text-gray-900
                "
              >
                <Building2
                  size={15}
                  className="
                    shrink-0 text-[#e8612c]
                  "
                />

                Office
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=New+No+15%2F2+Old+No+7%2F2+First+Main+Road+Kasturibai+Nagar+Adyar+Chennai+600020"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block text-sm
                  leading-relaxed
                  text-gray-500
                  transition-colors
                  duration-200

                  hover:text-[#b08c1c]
                "
              >
                New No. 15/2, Old No. 7/2, First Main
                Road, Kasturibai Nagar, Adyar, Chennai –
                600020
              </a>
            </div>

            <div>
              <p
                className="
                  mb-2 flex items-center
                  gap-2 font-primary
                  text-base font-bold
                  text-gray-900
                "
              >
                <Mail
                  size={15}
                  className="
                    shrink-0 text-[#e8612c]
                  "
                />

                Email
              </p>

              <a
                href="mailto:info@devappartments.com"
                className="
                  break-all text-sm
                  text-gray-500
                  transition-colors
                  duration-200

                  hover:text-[#b08c1c]
                "
              >
                info@devappartments.com
              </a>
            </div>

            <div>
              <p
                className="
                  mb-2 flex items-center
                  gap-2 font-primary
                  text-base font-bold
                  text-gray-900
                "
              >
                <Phone
                  size={15}
                  className="
                    shrink-0 text-[#e8612c]
                  "
                />

                Mobile
              </p>

              <a
                href="tel:+919840037777"
                className="
                  text-sm text-gray-500
                  transition-colors
                  duration-200

                  hover:text-[#b08c1c]
                "
              >
                +91 98400 37777
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: false,
            amount: 0.8,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            border-t border-gray-100
            py-4 text-center

            sm:py-5
          "
        >
          <p
            className="
              text-xs text-gray-400

              sm:text-sm
            "
          >
            © 2026 Dev Appartments. All rights reserved
            &nbsp;|&nbsp; Design &amp; Developed by{" "}
            <a
              href="https://ayatiworks.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                transition-colors
                duration-200

                hover:text-[#b08c1c]
              "
            >
              Ayatiworks
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}