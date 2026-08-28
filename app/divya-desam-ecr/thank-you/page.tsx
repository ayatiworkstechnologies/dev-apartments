"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Home,
  MapPin,
  Phone,
} from "lucide-react";

const ease: [
  number,
  number,
  number,
  number,
] = [
  0.22,
  1,
  0.36,
  1,
];

export default function ThankYouPage() {
  return (
    <main
      className="
        relative
        flex
        min-h-[100svh]
        items-center
        justify-center
        overflow-hidden

        bg-[#f5f1e9]

        px-4
        py-8

        sm:px-6
        sm:py-10

        lg:px-10
        lg:py-12
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[160px]
          top-[-160px]

          h-[420px]
          w-[420px]

          rounded-full

          bg-[#b88d48]/10

          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[220px]
          -right-[160px]

          h-[520px]
          w-[520px]

          rounded-full

          bg-[#e8612c]/10

          blur-3xl
        "
      />

      {/* Decorative top line */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-0

          h-px
          w-[75%]

          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-[#b88d48]/40
          to-transparent
        "
      />

      <motion.section
        initial={{
          opacity: 0,
          y: 28,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.75,
          ease,
        }}
        className="
          relative
          z-10

          w-full
          max-w-[1020px]

          overflow-hidden

          rounded-[26px]

          border
          border-white/80

          bg-white/95

          shadow-[0_28px_80px_rgba(60,42,25,0.11)]

          backdrop-blur-xl

          sm:rounded-[32px]
        "
      >
        {/* MAIN CONTENT */}
        <div
          className="
            px-5
            pb-8
            pt-7

            text-center

            sm:px-8
            sm:pb-10
            sm:pt-9

            md:px-12

            lg:px-16
            lg:pb-12
            lg:pt-10
          "
        >
          {/* Logo */}
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
              duration: 0.55,
              ease,
            }}
          >
            <Link
              href="/"
              aria-label="Dev Appartments home"
              className="
                inline-flex
                items-center
                justify-center
              "
            >
              <img
                src="/logo.png"
                alt="Dev Appartments"
                draggable={false}
                className="
                  h-[38px]
                  w-auto
                  object-contain

                  sm:h-[44px]

                  lg:h-[48px]
                "
              />
            </Link>
          </motion.div>

          {/* Success icon */}
          <motion.div
            initial={{
              scale: 0,
              rotate: -18,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.16,
              duration: 0.6,
              ease,
            }}
            className="
              relative

              mx-auto
              mt-7

              flex
              h-[76px]
              w-[76px]

              items-center
              justify-center

              rounded-full

              bg-[#f6efe6]

              sm:mt-8
              sm:h-[86px]
              sm:w-[86px]
            "
          >
            <motion.span
              animate={{
                scale: [1, 1.28, 1],
                opacity: [0.35, 0, 0.35],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="
                absolute
                inset-0

                rounded-full

                border
                border-[#b88d48]/40
              "
            />

            <div
              className="
                flex
                h-[50px]
                w-[50px]

                items-center
                justify-center

                rounded-full

                bg-[#be9141]

                text-white

                shadow-[0_10px_25px_rgba(184,141,72,0.26)]

                sm:h-[56px]
                sm:w-[56px]
              "
            >
              <Check
                size={25}
                strokeWidth={2.2}
              />
            </div>
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.28,
              duration: 0.5,
              ease,
            }}
            className="
              mt-6

              font-secondary

              text-[9px]
              font-semibold

              uppercase

              tracking-[0.24em]

              text-[#b88d48]

              sm:text-[10px]
            "
          >
            Enquiry Received
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.34,
              duration: 0.58,
              ease,
            }}
            className="
              mx-auto
              mt-3

              max-w-[680px]

              font-primary

              text-[34px]
              font-bold

              leading-[1]

              tracking-[-0.045em]

              text-[#18120e]

              sm:text-[44px]

              md:text-[50px]

              lg:text-[58px]
            "
          >
            Thank You for
            <br />

            <span className="text-[#bd8e3d]">
              Your Interest
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.42,
              duration: 0.58,
              ease,
            }}
            className="
              mx-auto
              mt-5

              max-w-[590px]

              font-secondary

              text-[12px]

              leading-[1.8]

              text-[#7b736c]

              sm:text-[14px]

              lg:text-[15px]
            "
          >
            Your site visit enquiry has been submitted
            successfully. Our team will contact you shortly
            to help you explore Divya Desam Premium Villas.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.58,
              ease,
            }}
            className="
              mt-7

              flex
              flex-col

              items-center
              justify-center

              gap-3

              sm:flex-row
            "
          >
            <Link
              href="/"
              className="
                group

                inline-flex
                h-[50px]

                w-full

                items-center
                justify-center

                gap-3

                rounded-full

                bg-[#e8612c]

                px-6

                font-secondary

                text-[12px]
                font-semibold

                text-white

                shadow-[0_12px_28px_rgba(232,97,44,0.22)]

                transition-all
                duration-300

                hover:-translate-y-[2px]
                hover:bg-[#d65322]

                sm:w-auto
                sm:min-w-[190px]
                sm:text-[13px]

                lg:h-[52px]
              "
            >
              <Home
                size={15}
                strokeWidth={1.9}
              />

              Back to Home

              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-[2px]
                  group-hover:-translate-y-[2px]
                "
              />
            </Link>

            {/* <a
              href="tel:+919840333117"
              className="
                group

                inline-flex
                h-[50px]

                w-full

                items-center
                justify-center

                gap-2.5

                rounded-full

                border
                border-[#ded3c7]

                bg-white

                px-6

                font-secondary

                text-[12px]
                font-semibold

                text-[#4a4038]

                transition-all
                duration-300

                hover:-translate-y-[2px]
                hover:border-[#b88d48]/50
                hover:text-[#b88d48]

                sm:w-auto
                sm:min-w-[175px]
                sm:text-[13px]

                lg:h-[52px]
              "
            >
              <Phone
                size={15}
                strokeWidth={1.9}
              />

              Call Our Team
            </a> */}
          </motion.div>
        </div>

        {/* BOTTOM STRIP */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.62,
            duration: 0.65,
          }}
          className="
            border-t
            border-[#eee7df]

            bg-[#faf8f5]

            px-5
            py-4

            sm:px-8
            sm:py-5

            lg:px-12
          "
        >
          <div
            className="
              flex
              flex-col

              gap-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* Property */}
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#e6ddd4]

                  bg-white

                  text-[#b88d48]

                  shadow-[0_4px_14px_rgba(65,45,28,0.05)]
                "
              >
                <MapPin
                  size={15}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <p
                  className="
                    font-secondary

                    text-[8px]
                    font-semibold

                    uppercase

                    tracking-[0.16em]

                    text-[#aaa097]

                    sm:text-[9px]
                  "
                >
                  Property
                </p>

                <p
                  className="
                    mt-0.5

                    font-secondary

                    text-[12px]
                    font-semibold

                    text-[#443b34]

                    sm:text-[13px]
                  "
                >
                  Divya Desam · ECR, Chennai
                </p>
              </div>
            </div>

            {/* Better replacement */}
            <a
              href="tel:+919840333117"
              className="
                group

                inline-flex
                w-fit

                items-center
                gap-3

                rounded-full

                border
                border-[#e3d9cf]

                bg-white

                px-4
                py-2.5

                font-secondary

                text-[11px]
                font-semibold

                text-[#675e56]

                shadow-[0_4px_14px_rgba(55,39,26,0.04)]

                transition-all
                duration-300

                hover:border-[#b88d48]/40
                hover:text-[#b88d48]
                hover:shadow-[0_8px_18px_rgba(55,39,26,0.07)]

                sm:text-[12px]
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6

                  items-center
                  justify-center

                  rounded-full

                  bg-[#f5efe7]

                  text-[#b88d48]
                "
              >
                <Phone
                  size={12}
                  strokeWidth={2}
                />
              </span>

              Need Help? Call Us

              <ArrowUpRight
                size={13}
                strokeWidth={1.9}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-[2px]
                  group-hover:-translate-y-[2px]
                "
              />
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Copyright */}
      <p
        className="
          absolute
          bottom-3
          left-1/2

          w-full

          -translate-x-1/2

          px-4

          text-center

          font-secondary

          text-[9px]

          text-[#a3978c]

          sm:bottom-4
          sm:text-[10px]
        "
      >
        © 2026 Dev Appartments · Divya Desam
      </p>
    </main>
  );
}