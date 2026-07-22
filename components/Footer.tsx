"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  Phone,
} from "lucide-react";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/devappartmentss/",
    icon: "/icons/facebook.svg",
  },
  {
    label: "X",
    href: "https://x.com/devappartments",
    icon: "/icons/x.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/devappartments/",
    icon: "/icons/instagram.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dev-appartments-2378151b0/",
    icon: "/icons/linkedin.svg",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@devappartments6112",
    icon: "/icons/youtube.svg",
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@devappartments",
    icon: "/icons/threads.svg",
  },
];

const discoverLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  // {
  //   label: "Ongoing Projects",
  //   href: "/projects/ongoing-projects",
  // },
  // {
  //   label: "Recent Projects",
  //   href: "/projects/recent-projects",
  // },
  // {
  //   label: "Completed Projects",
  //   href: "/projects/completed-projects",
  // },
  // {
  //   label: "Dream Destination",
  //   href: "/dream-destination",
  // },
  {
    label: "Blog",
    href: "/blog",
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
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const columnVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
      className="
        border-t border-[#eee8e2]
        bg-white
      "
    >
      <div
        className="
          mx-auto w-full max-w-[1240px]
          px-5 sm:px-7 lg:px-10
        "
      >
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            grid grid-cols-1
            gap-10 py-12
            sm:grid-cols-2
            lg:grid-cols-[1.6fr_1fr_1.3fr]
            lg:gap-14 lg:py-16
          "
        >
          {/* Brand */}
          <motion.div
            variants={columnVariants}
            className="
              sm:col-span-2
              lg:col-span-1
            "
          >
            <Link
              href="/"
              aria-label="Dev Appartments home"
              className="inline-block"
            >
              <img
                src="/logo.png"
                alt="Dev Appartments"
                draggable={false}
                className="
                  h-11 w-auto
                  object-contain
                  sm:h-12
                "
              />
            </Link>

            <h2
              className="
                mt-5 text-lg
                font-semibold
                text-[#29221d]
              "
            >
              Dev Appartments
            </h2>

            <p
              className="
                mt-3 max-w-sm
                text-[14px] leading-7
                text-[#78716b]
              "
            >
              Creating thoughtfully planned residential
              spaces with quality construction, modern
              comfort and trusted delivery.
            </p>

            <div
              className="
                mt-5 space-y-1
                text-[13px] font-medium
                text-[#4e4741]
              "
            >
              <p>Monday–Saturday: 09:00 AM–06:00 PM</p>
              <p>Sunday: Holiday</p>
            </div>

            {/* Social icons */}
            <div
              className="
                mt-6 flex flex-wrap
                items-center gap-3
              "
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Dev Appartments on ${social.label}`}
                  title={social.label}
                  whileHover={{
                    y: -3,
                    scale: 1.06,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                    border border-[#e7dfd7]
                    bg-[#faf8f5]
                    transition-all duration-300
                    hover:border-[#e8612c]/30
                    hover:bg-[#fff2ec]
                    hover:shadow-[0_8px_20px_rgba(232,97,44,0.12)]
                  "
                >
                  <img
                    src={social.icon}
                    alt=""
                    aria-hidden="true"
                    className="
                      h-[22px] w-[22px]
                      object-contain
                    "
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Discover More */}
          <motion.div variants={columnVariants}>
            <h3
              className="
                text-[17px] font-semibold
                text-[#29221d]
              "
            >
              Discover More
            </h3>

            <div className="mt-3 h-px w-10 bg-[#b88d48]" />

            <ul className="mt-6 space-y-3">
              {discoverLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      group inline-flex
                      items-center gap-3
                      text-[14px]
                      text-[#706962]
                      transition-colors
                      duration-300
                      hover:text-[#e8612c]
                    "
                  >
                    <span
                      className="
                        h-[5px] w-[5px]
                        shrink-0 rounded-full
                        bg-[#b8aca1]
                        transition-all duration-300
                        group-hover:bg-[#e8612c]
                        group-hover:scale-125
                      "
                    />

                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={columnVariants}
            className="space-y-7"
          >
            <div>
              <h3
                className="
                  text-[17px] font-semibold
                  text-[#29221d]
                "
              >
                Contact Us
              </h3>

              <div className="mt-3 h-px w-10 bg-[#b88d48]" />
            </div>

            {/* Office */}
            <div>
              <div
                className="
                  mb-2 flex items-center
                  gap-2 text-[14px]
                  font-semibold
                  text-[#39312b]
                "
              >
                <Building2
                  size={16}
                  strokeWidth={1.8}
                  className="text-[#e8612c]"
                />

                Office
              </div>

              <a
                href="https://maps.app.goo.gl/sQxBRaRcr5MwHMGH9"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block max-w-sm
                  text-[14px] leading-7
                  text-[#78716b]
                  transition-colors duration-300
                  hover:text-[#b88d48]
                "
              >
                New No. 15/2, Old No. 7/2, First Main Road,
                Kasturibai Nagar, Adyar, Chennai – 600020
              </a>
            </div>

            {/* Email */}
            <div>
              <div
                className="
                  mb-2 flex items-center
                  gap-2 text-[14px]
                  font-semibold
                  text-[#39312b]
                "
              >
                <Mail
                  size={16}
                  strokeWidth={1.8}
                  className="text-[#e8612c]"
                />

                Email
              </div>

              <a
                href="mailto:info@devappartments.com"
                className="
                  break-all text-[14px]
                  text-[#78716b]
                  transition-colors duration-300
                  hover:text-[#b88d48]
                "
              >
                info@devappartments.com
              </a>
            </div>

            {/* Phone numbers */}
            <div>
              <div
                className="
                  mb-3 flex items-center
                  gap-2 text-[14px]
                  font-semibold
                  text-[#39312b]
                "
              >
                <Phone
                  size={16}
                  strokeWidth={1.8}
                  className="text-[#e8612c]"
                />

                Mobile
              </div>

              <div
                className="
                  flex flex-wrap
                  items-center gap-x-3 gap-y-2
                  text-[14px]
                "
              >
                <a
                  href="tel:+919840037777"
                  className="
                    font-medium
                    text-[#78716b]
                    transition-colors duration-300
                    hover:text-[#e8612c]
                  "
                >
                  +91 98400 37777
                </a>

                <span
                  aria-hidden="true"
                  className="
                    hidden h-4 w-px
                    bg-[#d8d0c8]
                    sm:block
                  "
                />

                <a
                  href="tel:+919840333117"
                  className="
                    font-medium
                    text-[#78716b]
                    transition-colors duration-300
                    hover:text-[#e8612c]
                  "
                >
                  +91 98403 33117
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <div
          className="
            border-t border-[#eee8e2]
            py-5 text-center
          "
        >
          <p
            className="
              text-[12px] leading-6
              text-[#9a938c]
              sm:text-[13px]
            "
          >
            © 2026 Dev Appartments. All rights reserved
            <span className="mx-2">|</span>
            Design &amp; Developed by{" "}
            <a
              href="https://ayatiworks.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-medium text-[#7b736d]
                transition-colors duration-300
                hover:text-[#e8612c]
              "
            >
              Ayatiworks
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}