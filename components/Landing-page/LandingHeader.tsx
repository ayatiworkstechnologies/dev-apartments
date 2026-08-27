"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Loader2,
  X,
} from "lucide-react";

type EnquiryFormData = {
  name: string;
  phone: string;
  email: string;
  villa_type: string;
  message: string;
};

type FormStatus = {
  type: "error" | null;
  message: string;
};

const initialFormData: EnquiryFormData = {
  name: "",
  phone: "",
  email: "",
  villa_type: "",
  message: "",
};

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

export default function LandingHeader() {
  const router = useRouter();

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const [
    isVillaSelectOpen,
    setIsVillaSelectOpen,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState<EnquiryFormData>(
    initialFormData,
  );

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    formStatus,
    setFormStatus,
  ] = useState<FormStatus>({
    type: null,
    message: "",
  });

  const openModal = () => {
    setFormStatus({
      type: null,
      message: "",
    });

    setIsVillaSelectOpen(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }

    setIsVillaSelectOpen(false);
    setIsModalOpen(false);

    setFormStatus({
      type: null,
      message: "",
    });
  };

  const handleFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      }),
    );

    if (formStatus.type) {
      setFormStatus({
        type: null,
        message: "",
      });
    }
  };

  const handleVillaChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    handleFormChange(event);

    setIsVillaSelectOpen(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setFormStatus({
      type: null,
      message: "",
    });

    if (!formData.name.trim()) {
      setFormStatus({
        type: "error",
        message:
          "Please enter your full name.",
      });

      return;
    }

    if (!formData.phone.trim()) {
      setFormStatus({
        type: "error",
        message:
          "Please enter your phone number.",
      });

      return;
    }

    if (!formData.email.trim()) {
      setFormStatus({
        type: "error",
        message:
          "Please enter your email address.",
      });

      return;
    }

    if (!formData.villa_type) {
      setFormStatus({
        type: "error",
        message:
          "Please select a villa type.",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      const response =
        await fetch(
          "/api/landingpage-enquiry",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name:
                formData.name.trim(),

              phone:
                formData.phone.trim(),

              email:
                formData.email.trim(),

              villa_type:
                formData.villa_type,

              message:
                formData.message.trim(),
            }),
          },
        );

      let result: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        result =
          await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to submit your enquiry.",
        );
      }

      setFormData(
        initialFormData,
      );

      setIsVillaSelectOpen(false);
      setIsModalOpen(false);

      router.push(
        "/thank-you",
      );
    } catch (error) {
      console.error(
        "Header enquiry error:",
        error,
      );

      setFormStatus({
        type: "error",

        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
          "Escape" &&
        !isSubmitting
      ) {
        setIsVillaSelectOpen(
          false,
        );

        setIsModalOpen(
          false,
        );
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
  }, [
    isModalOpen,
    isSubmitting,
  ]);

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{
          y: -30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          ease,
        }}
        className="
          fixed
          inset-x-0
          top-0
          z-50

          px-3
          pt-3

          sm:px-5
          sm:pt-4

          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            max-w-[1440px]
          "
        >
          <div
            className="
              flex
              h-[64px]

              items-center
              justify-between

              rounded-[18px]

              border
              border-white/70

              bg-white/90

              px-4

              shadow-[0_10px_40px_rgba(32,23,16,0.08)]

              backdrop-blur-xl

              sm:h-[70px]
              sm:px-6

              lg:h-[76px]
              lg:rounded-full
              lg:px-8
            "
          >
            {/* LOGO */}
            <Link
              href="/"
              aria-label="Dev Apartments Home"
              className="
                shrink-0

                transition-transform
                duration-300

                hover:scale-[1.03]

                active:scale-[0.98]
              "
            >
              <img
                src="/logo.png"
                alt="Dev Apartments"
                draggable={false}
                className="
                  h-[36px]
                  w-auto

                  object-contain

                  sm:h-[42px]

                  lg:h-[46px]
                "
              />
            </Link>

            {/* ENQUIRE */}
            <motion.button
              type="button"
              onClick={openModal}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group

                inline-flex

                h-[42px]

                items-center
                justify-center

                gap-1.5

                rounded-full

                bg-[#e8612c]

                px-4

                text-[12px]
                font-semibold

                text-white

                shadow-[0_8px_22px_rgba(232,97,44,0.25)]

                transition-colors
                duration-300

                hover:bg-[#d65322]

                sm:h-[46px]
                sm:gap-2
                sm:px-5
                sm:text-[13px]

                lg:h-[48px]
                lg:px-6
                lg:text-[14px]
              "
            >
              <span>
                Enquire Now
              </span>

              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-[2px]
                  group-hover:-translate-y-[2px]
                "
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* POPUP */}
      <AnimatePresence>
        {isModalOpen && (
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
            transition={{
              duration: 0.2,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="header-enquiry-title"
            onClick={closeModal}
            className="
              fixed
              inset-0
              z-[10000]

              flex

              items-center
              justify-center

              overflow-y-auto

              bg-[#17120f]/60

              px-4
              py-4

              backdrop-blur-[7px]

              sm:px-6
              sm:py-6
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 22,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 16,
                scale: 0.98,
              }}
              transition={{
                duration: 0.35,
                ease,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                relative

                w-full
                max-w-[540px]

                overflow-hidden

                rounded-[22px]

                border
                border-white/70

                bg-white

                shadow-[0_30px_90px_rgba(0,0,0,0.28)]
              "
            >
              {/* Background Accent */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute

                  -right-16
                  -top-16

                  h-40
                  w-40

                  rounded-full

                  bg-[#b88d48]/10

                  blur-3xl
                "
              />

              {/* Close */}
              <button
                type="button"
                onClick={closeModal}
                disabled={
                  isSubmitting
                }
                aria-label="Close enquiry"
                className="
                  absolute

                  right-4
                  top-4
                  z-20

                  flex

                  h-9
                  w-9

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#e8dfd7]

                  bg-[#f8f4ef]

                  text-[#625850]

                  transition-all
                  duration-300

                  hover:rotate-90
                  hover:bg-[#e8612c]
                  hover:text-white

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <X
                  size={17}
                  strokeWidth={
                    1.8
                  }
                />
              </button>

              <div
                className="
                  relative
                  z-10

                  px-5
                  pb-5
                  pt-6

                  sm:px-7
                  sm:pb-6
                  sm:pt-7
                "
              >
                {/* Heading */}
                <div className="pr-12">
                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                    "
                  >
                    <span
                      className="
                        h-px
                        w-6

                        bg-[#b88d48]
                      "
                    />

                    <p
                      className="
                        font-secondary

                        text-[9px]
                        font-semibold

                        uppercase

                        tracking-[0.2em]

                        text-[#b88d48]
                      "
                    >
                      Divya Desam
                    </p>
                  </div>

                  <h2
                    id="header-enquiry-title"
                    className="
                      mt-2

                      font-primary

                      text-[26px]
                      font-bold

                      leading-[1.05]
                      tracking-[-0.04em]

                      text-[#1c1510]

                      sm:text-[30px]
                    "
                  >
                    Book a Site Visit
                  </h2>

                  <p
                    className="
                      mt-2

                      max-w-[410px]

                      font-secondary

                      text-[11px]

                      leading-[1.6]

                      text-[#81786f]

                      sm:text-[12px]
                    "
                  >
                    Share your details
                    and our team will
                    contact you to
                    schedule your visit.
                  </p>
                </div>

                {/* FORM */}
                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="
                    mt-5
                    space-y-3
                  "
                >
                  {/* NAME + PHONE */}
                  <div
                    className="
                      grid
                      gap-3

                      sm:grid-cols-2
                    "
                  >
                    <div>
                      <label
                        htmlFor="header-popup-name"
                        className="
                          mb-1
                          block

                          text-[9px]
                          font-semibold

                          text-[#625950]
                        "
                      >
                        Full Name
                      </label>

                      <input
                        id="header-popup-name"
                        type="text"
                        name="name"
                        value={
                          formData.name
                        }
                        onChange={
                          handleFormChange
                        }
                        placeholder="Enter your name"
                        autoComplete="name"
                        disabled={
                          isSubmitting
                        }
                        className="
                          h-[42px]
                          w-full

                          rounded-[10px]

                          border
                          border-[#e8dfd6]

                          bg-[#faf8f5]

                          px-3.5

                          text-[12px]

                          text-[#251d17]

                          outline-none

                          transition-all
                          duration-300

                          placeholder:text-[#aaa19a]

                          focus:border-[#b88d48]
                          focus:bg-white

                          focus:ring-4
                          focus:ring-[#b88d48]/10

                          disabled:opacity-60
                        "
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="header-popup-phone"
                        className="
                          mb-1
                          block

                          text-[9px]
                          font-semibold

                          text-[#625950]
                        "
                      >
                        Phone Number
                      </label>

                      <input
                        id="header-popup-phone"
                        type="tel"
                        name="phone"
                        value={
                          formData.phone
                        }
                        onChange={
                          handleFormChange
                        }
                        placeholder="+91 00000 00000"
                        autoComplete="tel"
                        inputMode="tel"
                        disabled={
                          isSubmitting
                        }
                        className="
                          h-[42px]
                          w-full

                          rounded-[10px]

                          border
                          border-[#e8dfd6]

                          bg-[#faf8f5]

                          px-3.5

                          text-[12px]

                          text-[#251d17]

                          outline-none

                          transition-all
                          duration-300

                          placeholder:text-[#aaa19a]

                          focus:border-[#b88d48]
                          focus:bg-white

                          focus:ring-4
                          focus:ring-[#b88d48]/10

                          disabled:opacity-60
                        "
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="header-popup-email"
                      className="
                        mb-1
                        block

                        text-[9px]
                        font-semibold

                        text-[#625950]
                      "
                    >
                      Email Address
                    </label>

                    <input
                      id="header-popup-email"
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleFormChange
                      }
                      placeholder="Enter your email"
                      autoComplete="email"
                      disabled={
                        isSubmitting
                      }
                      className="
                        h-[42px]
                        w-full

                        rounded-[10px]

                        border
                        border-[#e8dfd6]

                        bg-[#faf8f5]

                        px-3.5

                        text-[12px]

                        text-[#251d17]

                        outline-none

                        transition-all
                        duration-300

                        placeholder:text-[#aaa19a]

                        focus:border-[#b88d48]
                        focus:bg-white

                        focus:ring-4
                        focus:ring-[#b88d48]/10

                        disabled:opacity-60
                      "
                    />
                  </div>

                  {/* VILLA TYPE */}
                  <div>
                    <label
                      htmlFor="header-popup-villa"
                      className="
                        mb-1
                        block

                        text-[9px]
                        font-semibold

                        text-[#625950]
                      "
                    >
                      Villa Type
                    </label>

                    {/* Custom arrow wrapper */}
                    <div
                      className="
                        relative
                        w-full
                      "
                    >
                      <select
                        id="header-popup-villa"
                        name="villa_type"
                        value={
                          formData.villa_type
                        }
                        onChange={
                          handleVillaChange
                        }
                        onMouseDown={() =>
                          setIsVillaSelectOpen(
                            true,
                          )
                        }
                        onFocus={() =>
                          setIsVillaSelectOpen(
                            true,
                          )
                        }
                        onBlur={() =>
                          setIsVillaSelectOpen(
                            false,
                          )
                        }
                        disabled={
                          isSubmitting
                        }
                        className="
                          h-[42px]
                          w-full

                          cursor-pointer

                          appearance-none

                          rounded-[10px]

                          border
                          border-[#e8dfd6]

                          bg-[#faf8f5]

                          py-0
                          pl-3.5
                          pr-12

                          text-[12px]

                          text-[#736a62]

                          outline-none

                          transition-all
                          duration-300

                          focus:border-[#b88d48]
                          focus:bg-white

                          focus:ring-4
                          focus:ring-[#b88d48]/10

                          disabled:cursor-not-allowed
                          disabled:opacity-60
                        "
                      >
                        <option
                          value=""
                          disabled
                        >
                          Select Villa Type
                        </option>

                        <option value="3 BHK Premium Villa">
                          3 BHK Premium
                          Villa
                        </option>

                        <option value="4 BHK Premium Villa">
                          4 BHK Premium
                          Villa
                        </option>
                      </select>

                      {/* Custom animated arrow */}
                      <motion.span
                        animate={{
                          rotate:
                            isVillaSelectOpen
                              ? 180
                              : 0,
                        }}
                        transition={{
                          duration: 0.25,
                          ease,
                        }}
                        className="
                          pointer-events-none

                          absolute

                          right-3.5
                          top-1/2

                          flex

                          h-6
                          w-6

                          -translate-y-1/2

                          items-center
                          justify-center

                          rounded-full

                          text-[#746a61]
                        "
                      >
                        <ChevronDown
                          size={17}
                          strokeWidth={
                            2
                          }
                        />
                      </motion.span>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label
                      htmlFor="header-popup-message"
                      className="
                        mb-1
                        block

                        text-[9px]
                        font-semibold

                        text-[#625950]
                      "
                    >
                      Message
                    </label>

                    <textarea
                      id="header-popup-message"
                      name="message"
                      rows={2}
                      value={
                        formData.message
                      }
                      onChange={
                        handleFormChange
                      }
                      placeholder="Tell us how we can assist you"
                      disabled={
                        isSubmitting
                      }
                      className="
                        min-h-[68px]
                        w-full

                        resize-none

                        rounded-[10px]

                        border
                        border-[#e8dfd6]

                        bg-[#faf8f5]

                        px-3.5
                        py-2.5

                        text-[12px]

                        text-[#251d17]

                        outline-none

                        transition-all
                        duration-300

                        placeholder:text-[#aaa19a]

                        focus:border-[#b88d48]
                        focus:bg-white

                        focus:ring-4
                        focus:ring-[#b88d48]/10

                        disabled:opacity-60
                      "
                    />
                  </div>

                  {/* ERROR */}
                  {formStatus.type ===
                    "error" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -4,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      role="alert"
                      className="
                        rounded-[10px]

                        border
                        border-red-200

                        bg-red-50

                        px-3
                        py-2

                        text-[11px]
                        font-medium

                        text-red-600
                      "
                    >
                      {
                        formStatus.message
                      }
                    </motion.div>
                  )}

                  {/* SUBMIT */}
                  <motion.button
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                    whileHover={
                      isSubmitting
                        ? {}
                        : {
                            y: -2,
                          }
                    }
                    whileTap={
                      isSubmitting
                        ? {}
                        : {
                            scale:
                              0.98,
                          }
                    }
                    className="
                      group

                      flex

                      h-[46px]
                      w-full

                      items-center
                      justify-between

                      rounded-full

                      bg-[#ee5f24]

                      px-4

                      text-[12px]
                      font-semibold

                      text-white

                      shadow-[0_10px_24px_rgba(238,95,36,0.24)]

                      transition-all
                      duration-300

                      hover:bg-[#d9511c]

                      disabled:cursor-not-allowed
                      disabled:opacity-70

                      sm:px-5
                      sm:text-[13px]
                    "
                  >
                    <span>
                      {isSubmitting
                        ? "Submitting..."
                        : "Schedule a Site Visit"}
                    </span>

                    <span
                      className="
                        flex

                        h-7
                        w-7

                        items-center
                        justify-center

                        rounded-full

                        bg-white/15
                      "
                    >
                      {isSubmitting ? (
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <ArrowUpRight
                          size={14}
                          strokeWidth={
                            2
                          }
                        />
                      )}
                    </span>
                  </motion.button>

                  <p
                    className="
                      text-center

                      text-[8px]

                      leading-[1.5]

                      text-[#9b928b]

                      sm:text-[9px]
                    "
                  >
                    By submitting, you
                    agree to be
                    contacted regarding
                    your Divya Desam
                    enquiry.
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}