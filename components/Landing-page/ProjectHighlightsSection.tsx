"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  Building2,
  MapPin,
  ShieldCheck,
  Zap,
  Download,
  FileText,
  X,
  type LucideIcon,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type HighlightItem = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

type BrochureFormData = {
  name: string;
  email: string;
  phone: string;
};

type SubmissionStatus = "idle" | "success" | "error";

type ApiResponse = {
  success?: boolean;
  message?: string;
};

/* =========================================================
   DATA
========================================================= */

const highlights: HighlightItem[] = [
  {
    id: 1,
    title: "Premium Amenities",
    description:
      "Modern amenities thoughtfully planned for a comfortable lifestyle.",
    icon: Building2,
  },
  {
    id: 2,
    title: "Prime Location",
    description:
      "Strategically located with seamless access to schools, IT hubs, entertainment, and the coastline.",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Safe & Secure Community",
    description:
      "Designed with advanced security features for confident and comfortable living.",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Reliable Power Backup",
    description:
      "Ensuring everyday convenience with dependable power support.",
    icon: Zap,
  },
];

/* Brochure PDF served from the public folder (adjust the path to your file) */

const BROCHURE_FILE_URL = "/pdf/brochure.pdf";
const BROCHURE_FILE_NAME = "Divya-Desam-Brochure.pdf";

const initialFormData: BrochureFormData = {
  name: "",
  email: "",
  phone: "",
};

const ease: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
];

/* =========================================================
   ANIMATION
========================================================= */

const containerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.12,
    },
  },
};

function getCardVariants(index: number): Variants {
  const animations = [
    {
      opacity: 0,
      x: -45,
      y: 12,
      rotate: -1.5,
      scale: 0.94,
      filter: "blur(9px)",
    },
    {
      opacity: 0,
      y: 50,
      scale: 0.92,
      filter: "blur(9px)",
    },
    {
      opacity: 0,
      y: -45,
      scale: 0.94,
      filter: "blur(9px)",
    },
    {
      opacity: 0,
      x: 45,
      y: 12,
      rotate: 1.5,
      scale: 0.94,
      filter: "blur(9px)",
    },
  ];

  return {
    hidden: animations[index] ?? animations[0],

    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",

      transition: {
        type: "spring",
        stiffness: 105,
        damping: 15,
        mass: 0.85,
      },
    },
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ProjectHighlightsSection() {
  const reduceMotion = useReducedMotion();

  /* =========================================================
     DOWNLOAD BROCHURE MODAL STATE
  ========================================================= */

  const [isBrochureOpen, setIsBrochureOpen] =
    useState(false);

  const [formData, setFormData] =
    useState<BrochureFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");

  const [statusMessage, setStatusMessage] =
    useState("");

  /* =========================================================
     OPEN MODAL
  ========================================================= */

  const openBrochureForm = () => {
    setIsBrochureOpen(true);

    setSubmissionStatus("idle");
    setStatusMessage("");
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeBrochureForm = () => {
    if (isSubmitting) return;

    setIsBrochureOpen(false);

    setSubmissionStatus("idle");
    setStatusMessage("");
  };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (submissionStatus !== "idle") {
      setSubmissionStatus("idle");
      setStatusMessage("");
    }
  };

  /* =========================================================
     TRIGGER FILE DOWNLOAD
  ========================================================= */

  const triggerBrochureDownload = () => {
    const link = document.createElement("a");

    link.href = BROCHURE_FILE_URL;
    link.download = BROCHURE_FILE_NAME;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* =========================================================
     SUBMIT FORM
  ========================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    const cleanedFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    /* Required validation */

    if (
      !cleanedFormData.name ||
      !cleanedFormData.email ||
      !cleanedFormData.phone
    ) {
      setSubmissionStatus("error");

      setStatusMessage(
        "Please fill in all required fields.",
      );

      return;
    }

    /* Email validation */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(cleanedFormData.email)
    ) {
      setSubmissionStatus("error");

      setStatusMessage(
        "Please enter a valid email address.",
      );

      return;
    }

    /* Phone validation */

    const phonePattern = /^[0-9+\-\s()]{7,20}$/;

    if (
      !phonePattern.test(cleanedFormData.phone)
    ) {
      setSubmissionStatus("error");

      setStatusMessage(
        "Please enter a valid phone number.",
      );

      return;
    }

    setIsSubmitting(true);

    setSubmissionStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch(
        "/api/download-brochure",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify(
            cleanedFormData,
          ),
        },
      );

      const result =
        (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to submit your request.",
        );
      }

      if (result.success === false) {
        throw new Error(
          result.message ||
            "Unable to submit your request.",
        );
      }

      setSubmissionStatus("success");

      setStatusMessage(
        result.message ||
          "Thank you! Your brochure is downloading now.",
      );

      /* Trigger the actual PDF download */

      triggerBrochureDownload();

      /* Clear form */

      setFormData(initialFormData);
    } catch (error: unknown) {
      console.error(
        "Brochure download submission error:",
        error,
      );

      setSubmissionStatus("error");

      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     MODAL BODY SCROLL + ESC KEY
  ========================================================= */

  useEffect(() => {
    if (!isBrochureOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape" &&
        !isSubmitting
      ) {
        setIsBrochureOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [isBrochureOpen, isSubmitting]);

  return (
    <>
      <section
        id="project-highlights"
        className="relative w-full overflow-hidden bg-white"
      >
        {/* ===================================================
            HIGHLIGHTS SECTION
        =================================================== */}

        <div
          className="
            relative
            px-4 py-16

            sm:px-6
            sm:py-20

            md:px-8

            lg:px-12
            lg:py-24

            xl:px-16
            xl:py-28
          "
        >
          {/* Background decoration */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-32
              top-10

              h-[330px]
              w-[330px]

              rounded-full

              bg-[#b88d48]/[0.035]

              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-32
              bottom-0

              h-[330px]
              w-[330px]

              rounded-full

              bg-[#b88d48]/[0.035]

              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10

              mx-auto
              w-full

              max-w-[1500px]
            "
          >
            {/* Heading */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 35,
                      scale: 0.94,
                      filter:
                        "blur(10px)",
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
                amount: 0.45,
              }}
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.8,
                ease,
              }}
              className="text-center"
            >
              <h2
                className="
                  font-primary
                  font-semibold

                  leading-[1.1]
                  tracking-[-0.035em]

                  text-[#17213b]

                  text-[30px]

                  sm:text-[38px]

                  md:text-[44px]

                  lg:text-[50px]
                "
              >
                Everything You Need, Right Here
              </h2>

              <motion.div
                initial={{
                  scaleX: reduceMotion
                    ? 1
                    : 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0
                    : 0.85,

                  delay: reduceMotion
                    ? 0
                    : 0.25,

                  ease,
                }}
                className="
                  mx-auto
                  mt-4

                  h-[2px]
                  w-[48px]

                  origin-center

                  bg-[#b88d48]

                  sm:mt-5
                  sm:w-[58px]
                "
              />
            </motion.div>

            {/* =================================================
                HIGHLIGHT CARDS
            ================================================= */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.16,
              }}
              className="
                mt-12

                grid
                grid-cols-1

                gap-5

                sm:mt-14
                sm:grid-cols-2
                sm:gap-6

                lg:mt-16
                lg:grid-cols-4
                lg:gap-7

                xl:gap-8
              "
            >
              {highlights.map(
                (item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.article
                      key={item.id}
                      variants={
                        reduceMotion
                          ? undefined
                          : getCardVariants(
                              index,
                            )
                      }
                      initial={
                        reduceMotion
                          ? false
                          : undefined
                      }
                      whileHover={{
                        y: -10,

                        scale: 1.015,

                        boxShadow:
                          "0 25px 65px rgba(74,51,27,0.12)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 19,
                      }}
                      className="
                        group
                        relative

                        min-h-[190px]

                        overflow-hidden

                        rounded-[22px]

                        border
                        border-[#f3efe9]

                        bg-white

                        px-5
                        py-6

                        shadow-[0_12px_40px_rgba(67,48,29,0.055)]

                        sm:min-h-[205px]
                        sm:px-6
                        sm:py-7

                        lg:min-h-[215px]
                        lg:px-7
                        lg:py-8
                      "
                    >
                      {/* Hover gradient */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0

                          opacity-0

                          bg-gradient-to-br
                          from-[#b88d48]/[0.08]
                          via-transparent
                          to-transparent

                          transition-opacity
                          duration-500

                          group-hover:opacity-100
                        "
                      />

                      {/* Hover top line */}

                      <span
                        className="
                          absolute
                          left-0
                          top-0

                          h-[3px]
                          w-0

                          bg-[#b88d48]

                          transition-all
                          duration-500

                          group-hover:w-full
                        "
                      />

                      <div className="relative z-10">
                        {/* Icon */}

                        <motion.div
                          whileHover={{
                            rotate: [
                              0,
                              -8,
                              8,
                              0,
                            ],
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                          className="
                            flex
                            h-12
                            w-12

                            items-center
                            justify-center

                            rounded-[14px]

                            bg-[#faf7f1]

                            text-[#b88d48]

                            transition-all
                            duration-500

                            group-hover:scale-110
                            group-hover:bg-[#b88d48]
                            group-hover:text-white

                            group-hover:shadow-[0_10px_24px_rgba(184,141,72,0.28)]
                          "
                        >
                          <Icon
                            size={21}
                            strokeWidth={1.8}
                          />
                        </motion.div>

                        <div className="mt-6">
                          <h3
                            className="
                              font-primary

                              text-[14px]
                              font-semibold

                              leading-tight

                              text-[#171717]

                              sm:text-[15px]

                              lg:text-[16px]
                            "
                          >
                            {item.title}
                          </h3>

                          <p
                            className="
                              mt-2

                              max-w-[260px]

                              font-secondary

                              text-[11px]
                              leading-[1.6]

                              text-[#a09b95]

                              sm:text-[12px]

                              lg:text-[13px]
                            "
                          >
                            {
                              item.description
                            }
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  );
                },
              )}
            </motion.div>
          </div>
        </div>

        {/* ===================================================
            DOWNLOAD BROCHURE BANNER
        =================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 65,
                  filter: "blur(8px)",
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.22,
          }}
          transition={{
            duration: reduceMotion
              ? 0
              : 0.85,
            ease,
          }}
          className="
            relative
            overflow-hidden

            bg-[#b78949]

            px-4
            py-12

            sm:px-6
            sm:py-14

            md:px-8

            lg:px-12
            lg:py-16

            xl:px-16
          "
        >
          {/* Decoration */}

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 30, 0],
                    y: [0, -18, 0],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute

              -right-20
              -top-36

              h-[380px]
              w-[380px]

              rounded-full

              bg-white/[0.055]

              blur-2xl
            "
          />

          <div
            className="
              relative
              z-10

              mx-auto

              flex
              w-full
              max-w-[1500px]

              flex-col

              gap-8

              sm:gap-10

              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* Content */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -40,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.75,

                delay: reduceMotion
                  ? 0
                  : 0.1,

                ease,
              }}
              className="flex items-start gap-4"
            >
              {/* <div
                className="
                  hidden

                  h-14
                  w-14

                  shrink-0

                  items-center
                  justify-center

                  rounded-2xl

                  bg-white/15

                  text-white

                  sm:flex
                "
              >
                <FileText
                  size={26}
                  strokeWidth={1.7}
                />
              </div> */}

              <div>
                <h2
                  className="
                    font-primary
                    font-semibold

                    leading-tight

                    text-white

                    text-[28px]

                    sm:text-[34px]

                    lg:text-[39px]
                  "
                >
                  Download the Brochure
                </h2>

                <p
                  className="
                    mt-3

                    max-w-[570px]

                    font-secondary

                    text-[11px]
                    leading-[1.65]

                    text-white/75

                    sm:text-[12px]

                    md:text-[13px]
                  "
                >
                  Get the full details on villa
                  layouts, premium amenities,
                  specifications, and everything
                  that makes Divya Desam a
                  distinguished address. Enter
                  your details to download the
                  brochure instantly.
                </p>
              </div>
            </motion.div>

            {/* ===============================================
                DOWNLOAD BROCHURE BUTTON
            =============================================== */}

            <motion.button
              type="button"
              onClick={openBrochureForm}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 40,
                      scale: 0.9,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 135,
                damping: 15,

                delay: reduceMotion
                  ? 0
                  : 0.18,
              }}
              whileHover={{
                y: -4,

                scale: 1.035,

                backgroundColor:
                  "#ffffff",

                color:
                  "#9f7134",

                boxShadow:
                  "0 16px 35px rgba(78,49,19,0.18)",
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="
                group

                inline-flex
                w-fit

                cursor-pointer

                items-center
                justify-center

                gap-2.5

                rounded-[8px]

                border
                border-white/85

                bg-transparent

                px-5
                py-3

                font-primary

                text-[11px]
                font-semibold

                text-white

                transition-colors
                duration-300

                sm:px-6
                sm:text-[12px]

                md:shrink-0

                lg:px-8
                lg:py-3.5
                lg:text-[13px]
              "
            >
              <Download
                size={15}
                strokeWidth={1.9}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-y-0.5
                "
              />

              Download Brochure
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          DOWNLOAD BROCHURE MODAL
      ===================================================== */}

      {isBrochureOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="brochure-title"
          onClick={closeBrochureForm}
          className="
            fixed
            inset-0

            z-[99999]

            flex
            items-center
            justify-center

            overflow-y-auto

            bg-black/60

            px-4
            py-6

            backdrop-blur-sm
          "
        >
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 25,
                    scale: 0.94,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
              ease,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative

              my-auto

              w-full
              max-w-[500px]

              rounded-[22px]

              bg-white

              p-5

              shadow-[0_30px_90px_rgba(0,0,0,0.30)]

              sm:p-7
              md:p-8
            "
          >
            {/* Close */}

            <button
              type="button"
              aria-label="Close download brochure form"
              onClick={closeBrochureForm}
              disabled={isSubmitting}
              className="
                absolute
                right-4
                top-4

                flex
                h-10
                w-10

                items-center
                justify-center

                rounded-full

                bg-[#f7f5f2]

                text-[#444]

                transition-all
                duration-300

                hover:rotate-90
                hover:bg-[#b78949]
                hover:text-white

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={19} />
            </button>

            {/* Modal heading */}

            <div className="pr-12">
              <div
                className="
                  mb-4

                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-[14px]

                  bg-[#faf7f1]

                  text-[#b78949]
                "
              >
                <FileText
                  size={22}
                  strokeWidth={1.8}
                />
              </div>

              <p
                className="
                  mb-2

                  font-secondary

                  text-[10px]
                  font-semibold

                  uppercase

                  tracking-[0.18em]

                  text-[#b78949]
                "
              >
                Project Brochure
              </p>

              <h2
                id="brochure-title"
                className="
                  font-primary

                  text-[24px]
                  font-semibold

                  text-[#17213b]

                  sm:text-[28px]
                "
              >
                Download Brochure
              </h2>

              <p
                className="
                  mt-2

                  max-w-[390px]

                  font-secondary

                  text-[12px]
                  leading-6

                  text-[#777]
                "
              >
                Enter your details below and the
                brochure will download instantly.
              </p>
            </div>

            {/* ===============================================
                FORM
            =============================================== */}

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >
              {/* Name */}

              <div>
                <label
                  htmlFor="brochure-name"
                  className="
                    mb-1.5
                    block

                    text-[12px]
                    font-medium

                    text-[#444]
                  "
                >
                  Name
                </label>

                <input
                  id="brochure-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="
                    h-12
                    w-full

                    rounded-[10px]

                    border
                    border-[#e7e3dc]

                    bg-white

                    px-4

                    text-[13px]

                    text-[#222]

                    outline-none

                    transition-all

                    placeholder:text-[#aaa]

                    focus:border-[#b78949]
                    focus:ring-4
                    focus:ring-[#b78949]/10
                  "
                />
              </div>

              {/* Phone */}

              <div>
                <label
                  htmlFor="brochure-phone"
                  className="
                    mb-1.5
                    block

                    text-[12px]
                    font-medium

                    text-[#444]
                  "
                >
                  Phone Number
                </label>

                <input
                  id="brochure-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  disabled={isSubmitting}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="
                    h-12
                    w-full

                    rounded-[10px]

                    border
                    border-[#e7e3dc]

                    px-4

                    text-[13px]

                    text-[#222]

                    outline-none

                    transition-all

                    placeholder:text-[#aaa]

                    focus:border-[#b78949]
                    focus:ring-4
                    focus:ring-[#b78949]/10
                  "
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="brochure-email"
                  className="
                    mb-1.5
                    block

                    text-[12px]
                    font-medium

                    text-[#444]
                  "
                >
                  Email Address
                </label>

                <input
                  id="brochure-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="
                    h-12
                    w-full

                    rounded-[10px]

                    border
                    border-[#e7e3dc]

                    px-4

                    text-[13px]

                    text-[#222]

                    outline-none

                    transition-all

                    placeholder:text-[#aaa]

                    focus:border-[#b78949]
                    focus:ring-4
                    focus:ring-[#b78949]/10
                  "
                />
              </div>

              {/* Status */}

              {statusMessage && (
                <div
                  role={
                    submissionStatus ===
                    "error"
                      ? "alert"
                      : "status"
                  }
                  className={`
                    rounded-[10px]
                    border

                    px-4
                    py-3

                    text-[12px]
                    leading-5

                    ${
                      submissionStatus ===
                      "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }
                  `}
                >
                  {statusMessage}
                </div>
              )}

              {/* Submit */}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{
                  scale: isSubmitting
                    ? 1
                    : 0.98,
                }}
                className="
                  flex
                  h-12
                  w-full

                  items-center
                  justify-center

                  gap-2

                  rounded-[10px]

                  bg-[#b78949]

                  px-5

                  font-primary

                  text-[13px]
                  font-semibold

                  text-white

                  transition-all
                  duration-300

                  hover:bg-[#9f7134]

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4

                        animate-spin

                        rounded-full

                        border-2
                        border-white/30

                        border-t-white
                      "
                    />

                    Submitting...
                  </>
                ) : (
                  <>
                    <Download
                      size={16}
                      strokeWidth={1.8}
                    />

                    Download Brochure
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}