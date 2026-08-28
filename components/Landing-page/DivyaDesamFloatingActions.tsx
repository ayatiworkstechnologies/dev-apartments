"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { getDivyaDesamThankYouUrl } from "@/lib/campaignTracking";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowUpRight,
  ChevronDown,
  Loader2,
  Phone,
  Send,
  X,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

type FormData = {
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

const initialFormData: FormData = {
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

export default function DivyaDesamFloatingActions() {
  const router = useRouter();

  const [
    isEnquiryOpen,
    setIsEnquiryOpen,
  ] = useState(false);

  const [
    isVillaSelectOpen,
    setIsVillaSelectOpen,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState<FormData>(
    initialFormData,
  );

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    status,
    setStatus,
  ] = useState<FormStatus>({
    type: null,
    message: "",
  });

  const openEnquiry = () => {
    setStatus({
      type: null,
      message: "",
    });

    setIsVillaSelectOpen(false);

    setIsEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    if (isSubmitting) {
      return;
    }

    setIsVillaSelectOpen(false);

    setIsEnquiryOpen(false);

    setStatus({
      type: null,
      message: "",
    });
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
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

    if (status.type) {
      setStatus({
        type: null,
        message: "",
      });
    }
  };

  const handleVillaChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    handleChange(event);

    setIsVillaSelectOpen(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setStatus({
      type: null,
      message: "",
    });

    if (!formData.name.trim()) {
      setStatus({
        type: "error",
        message:
          "Please enter your full name.",
      });

      return;
    }

    if (!formData.phone.trim()) {
      setStatus({
        type: "error",
        message:
          "Please enter your phone number.",
      });

      return;
    }

    if (!formData.email.trim()) {
      setStatus({
        type: "error",
        message:
          "Please enter your email address.",
      });

      return;
    }

    if (!formData.villa_type) {
      setStatus({
        type: "error",
        message:
          "Please select a villa type.",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
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

      setIsEnquiryOpen(false);

      router.push(
        getDivyaDesamThankYouUrl(),
      );
    } catch (error) {
      console.error(
        "Divya Desam enquiry error:",
        error,
      );

      setStatus({
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
    if (!isEnquiryOpen) {
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

        setIsEnquiryOpen(
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
    isEnquiryOpen,
    isSubmitting,
  ]);

  return (
    <>
      {/* ===================================================
          DESKTOP FLOATING ACTIONS
      =================================================== */}

      <aside
        aria-label="Divya Desam contact actions"
        className="
          fixed
          right-4
          top-1/2

          z-[9999]

          hidden

          -translate-y-1/2

          md:block
        "
      >
        <div
          className="
            flex
            w-[58px]

            flex-col
            items-center

            gap-3.5

            rounded-full

            border
            border-white/30

            bg-white/30

            px-1.5
            py-3.5

            shadow-[0_16px_45px_rgba(0,0,0,0.16)]

            backdrop-blur-2xl
          "
        >
          {/* CALL */}
          <a
            href="tel:+919840333117"
            aria-label="Call Divya Desam"
            className="
              group
              relative

              flex
              h-[44px]
              w-[44px]

              items-center
              justify-center

              rounded-full

              border
              border-[#eadfd4]

              bg-white

              text-[#675d55]

              shadow-[0_5px_15px_rgba(0,0,0,0.08)]

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:border-[#e8612c]/50
              hover:bg-[#e8612c]
              hover:text-white
            "
          >
            <span
              className="
                pointer-events-none

                absolute

                right-[calc(100%+10px)]
                top-1/2

                -translate-y-1/2
                translate-x-2

                whitespace-nowrap

                rounded-lg

                bg-[#18130f]

                px-3
                py-2

                text-[10px]
                font-semibold

                text-white

                opacity-0

                shadow-lg

                transition-all
                duration-300

                group-hover:translate-x-0
                group-hover:opacity-100
              "
            >
              Call
            </span>

            <Phone
              size={17}
              strokeWidth={1.8}
            />
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/919840333117"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Divya Desam"
            className="
              group
              relative

              flex
              h-[44px]
              w-[44px]

              items-center
              justify-center

              rounded-full

              border
              border-[#eadfd4]

              bg-white

              text-[#675d55]

              shadow-[0_5px_15px_rgba(0,0,0,0.08)]

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:border-[#e8612c]/50
              hover:bg-[#e8612c]
              hover:text-white
            "
          >
            <span
              className="
                pointer-events-none

                absolute

                right-[calc(100%+10px)]
                top-1/2

                -translate-y-1/2
                translate-x-2

                whitespace-nowrap

                rounded-lg

                bg-[#18130f]

                px-3
                py-2

                text-[10px]
                font-semibold

                text-white

                opacity-0

                shadow-lg

                transition-all
                duration-300

                group-hover:translate-x-0
                group-hover:opacity-100
              "
            >
              WhatsApp
            </span>

            <FaWhatsapp
              size={18}
            />
          </a>

          {/* ENQUIRE */}
          <button
            type="button"
            onClick={openEnquiry}
            aria-label="Enquire about Divya Desam"
            className="
              group
              relative

              flex
              h-[44px]
              w-[44px]

              items-center
              justify-center

              rounded-full

              border
              border-[#eadfd4]

              bg-white

              text-[#675d55]

              shadow-[0_5px_15px_rgba(0,0,0,0.08)]

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:border-[#e8612c]/50
              hover:bg-[#e8612c]
              hover:text-white
            "
          >
            <span
              className="
                pointer-events-none

                absolute

                right-[calc(100%+10px)]
                top-1/2

                -translate-y-1/2
                translate-x-2

                whitespace-nowrap

                rounded-lg

                bg-[#18130f]

                px-3
                py-2

                text-[10px]
                font-semibold

                text-white

                opacity-0

                shadow-lg

                transition-all
                duration-300

                group-hover:translate-x-0
                group-hover:opacity-100
              "
            >
              Enquire Now
            </span>

            <Send
              size={17}
              strokeWidth={1.8}
            />
          </button>
        </div>
      </aside>

      {/* ===================================================
          MOBILE BOTTOM ACTION BAR
      =================================================== */}

      <aside
        aria-label="Divya Desam mobile contact actions"
        className="
          fixed
          bottom-3
          left-3
          right-3

          z-[9999]

          md:hidden
        "
      >
        <div
          className="
            grid
            grid-cols-3

            overflow-hidden

            rounded-[18px]

            border
            border-[#e9dfd5]

            bg-white

            shadow-[0_16px_45px_rgba(0,0,0,0.18)]
          "
        >
          <a
            href="tel:+919840333117"
            className="
              flex
              min-h-[60px]

              items-center
              justify-center

              gap-2

              border-r
              border-[#eee5dd]

              px-2

              text-[#5f5750]

              transition-all
              duration-300

              active:bg-[#faf7f3]
            "
          >
            <Phone
              size={17}
              strokeWidth={1.8}
            />

            <span
              className="
                text-[10px]
                font-semibold

                min-[380px]:text-[11px]
              "
            >
              Call
            </span>
          </a>

          <a
            href="https://wa.me/919840333117"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              min-h-[60px]

              items-center
              justify-center

              gap-2

              border-r
              border-[#eee5dd]

              px-2

              text-[#5f5750]

              transition-all
              duration-300

              active:bg-[#faf7f3]
            "
          >
            <FaWhatsapp
              size={18}
            />

            <span
              className="
                text-[10px]
                font-semibold

                min-[380px]:text-[11px]
              "
            >
              WhatsApp
            </span>
          </a>

          <button
            type="button"
            onClick={openEnquiry}
            className="
              flex
              min-h-[60px]

              items-center
              justify-center

              gap-2

              bg-white

              px-2

              text-[#5f5750]

              transition-all
              duration-300

              hover:bg-[#e8612c]
              hover:text-white

              active:bg-[#e8612c]
              active:text-white
            "
          >
            <Send
              size={17}
              strokeWidth={1.8}
            />

            <span
              className="
                whitespace-nowrap

                text-[10px]
                font-semibold

                min-[380px]:text-[11px]
              "
            >
              Enquire
            </span>
          </button>
        </div>
      </aside>

      {/* ===================================================
          ENQUIRY POPUP
      =================================================== */}

      <AnimatePresence>
        {isEnquiryOpen && (
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
            aria-labelledby="divya-enquiry-title"
            onClick={closeEnquiry}
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
              {/* Decorative glow */}
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
                onClick={closeEnquiry}
                disabled={isSubmitting}
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
                  strokeWidth={1.8}
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
                    id="divya-enquiry-title"
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
                    Share your details and our
                    team will contact you to
                    schedule your visit.
                  </p>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
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
                        htmlFor="divya-floating-name"
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
                        id="divya-floating-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        autoComplete="name"
                        disabled={isSubmitting}
                        required
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
                        htmlFor="divya-floating-phone"
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
                        id="divya-floating-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        autoComplete="tel"
                        inputMode="tel"
                        disabled={isSubmitting}
                        required
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
                      htmlFor="divya-floating-email"
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
                      id="divya-floating-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      disabled={isSubmitting}
                      required
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
                      htmlFor="divya-floating-villa"
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

                    <div
                      className="
                        relative
                        w-full
                      "
                    >
                      <select
                        id="divya-floating-villa"
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
                        required
                        disabled={isSubmitting}
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
                          3 BHK Premium Villa
                        </option>

                        <option value="4 BHK Premium Villa">
                          4 BHK Premium Villa
                        </option>
                      </select>

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

                          right-3
                          top-1/2

                          flex
                          h-6
                          w-6

                          -translate-y-1/2

                          items-center
                          justify-center

                          text-[#746a61]
                        "
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={2}
                        />
                      </motion.span>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label
                      htmlFor="divya-floating-message"
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
                      id="divya-floating-message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can assist you"
                      disabled={isSubmitting}
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
                  {status.type ===
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
                      {status.message}
                    </motion.div>
                  )}

                  {/* SUBMIT */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
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
                            scale: 0.98,
                          }
                    }
                    className="
                      group

                      flex
                      h-[46px]
                      w-full

                      max-w-[230px]

                      items-center
                      justify-between

                      rounded-full

                      bg-[#e8612c]

                      px-4

                      text-[12px]
                      font-semibold

                      text-white

                      shadow-[0_10px_24px_rgba(232,97,44,0.24)]

                      transition-all
                      duration-300

                      hover:bg-[#d65322]

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
                          strokeWidth={2}
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
                    By submitting, you agree
                    to be contacted regarding
                    your Divya Desam enquiry.
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
