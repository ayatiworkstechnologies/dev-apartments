"use client";

import {
  FormEvent,
  useState,
} from "react";

import { redirectToDivyaDesamThankYouPage } from "@/lib/campaignTracking";
import { motion } from "framer-motion";

import {
  ArrowUpRight,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const ease: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  villa_type: string;
  message: string;
};

type Status = {
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

export default function PremiumLandingFooter() {

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
    isVillaSelectOpen,
    setIsVillaSelectOpen,
  ] = useState(false);

  const [
    status,
    setStatus,
  ] = useState<Status>({
    type: null,
    message: "",
  });

  const handleChange = (
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
          "Please select your villa type.",
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

      redirectToDivyaDesamThankYouPage();
    } catch (error) {
      console.error(
        "Landing page enquiry error:",
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

  return (
    <footer
      id="site-visit"
      className="
        relative
        overflow-hidden

        bg-[#18130f]

        text-white

        pb-[92px]

        md:pb-0
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute

          -left-[160px]
          top-[40px]

          h-[300px]
          w-[300px]

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

          -bottom-[150px]
          -right-[150px]

          h-[340px]
          w-[340px]

          rounded-full

          bg-[#e8612c]/10

          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto

          w-full
          max-w-[1360px]

          px-5
          pt-9

          sm:px-8
          sm:pt-10

          lg:px-10
          lg:pt-11

          xl:px-12
        "
      >
        {/* Top label */}
        <div
          className="
            mb-7

            flex
            items-center
            gap-3

            sm:mb-8
          "
        >
          <span
            className="
              h-px
              w-8

              bg-[#b88d48]
            "
          />

          <p
            className="
              font-secondary

              text-[9px]
              font-semibold

              uppercase

              tracking-[0.22em]

              text-[#cba45e]

              sm:text-[10px]
            "
          >
            Visit. Experience. Own.
          </p>
        </div>

        {/* Main grid */}
        <div
          className="
            grid
            gap-8

            lg:grid-cols-[minmax(0,1fr)_520px]
            lg:items-start
            lg:gap-12

            xl:grid-cols-[minmax(0,1fr)_550px]
            xl:gap-14
          "
        >
          {/* =================================================
              LEFT CONTENT
              Mobile = after form
              Desktop = left
          ================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="
              order-2

              flex
              max-w-[560px]

              flex-col
              justify-start

              lg:order-1
              lg:pt-1
            "
          >
            {/* Heading */}
            <div>
              <h2
                className="
                  max-w-[500px]

                  font-primary

                  text-[36px]
                  font-bold

                  leading-[0.98]
                  tracking-[-0.045em]

                  text-white

                  sm:text-[43px]

                  lg:text-[50px]

                  xl:text-[56px]
                "
              >
                Find Your
                <br />

                <span
                  className="
                    text-[#c89b3c]
                  "
                >
                  Home at Divya Desam
                </span>
              </h2>

              <p
                className="
                  mt-4

                  max-w-[470px]

                  font-secondary

                  text-[12px]

                  leading-[1.7]

                  text-white/55

                  sm:text-[13px]

                  lg:text-[14px]
                "
              >
                Schedule a visit and explore premium
                3 &amp; 4 BHK villas designed for
                elegant, comfortable living.
              </p>
            </div>

            {/* Address */}
            <div
              className="
                mt-8

                border-t
                border-white/10

                pt-6

                sm:mt-9
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-3.5
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
                    border-white/10

                    bg-white/[0.04]

                    text-[#c89b3c]
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

                      text-[9px]
                      font-semibold

                      uppercase

                      tracking-[0.15em]

                      text-white/35
                    "
                  >
                    Office Address
                  </p>

                  <a
                    href="https://maps.app.goo.gl/sQxBRaRcr5MwHMGH9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-1.5

                      block

                      max-w-[460px]

                      font-secondary

                      text-[13px]
                      font-medium

                      leading-[1.7]

                      text-white/80

                      transition-colors
                      duration-300

                      hover:text-[#c89b3c]

                      sm:text-[14px]
                    "
                  >
                    New No. 15/2, Old No. 7/2,
                    First Main Road, Kasturibai Nagar,
                    Adyar, Chennai – 600020
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div
                className="
                  mt-6

                  flex
                  flex-col

                  gap-4

                  sm:flex-row
                  sm:items-center
                  sm:gap-7
                "
              >
                {/* Phone */}
                <a
                  href="tel:+919840333117"
                  className="
                    group

                    inline-flex

                    items-center
                    gap-2.5
                  "
                >
                  <span
                    className="
                      flex

                      h-8
                      w-8

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/10

                      text-[#c89b3c]

                      transition-all
                      duration-300

                      group-hover:border-[#c89b3c]/40
                      group-hover:bg-[#c89b3c]/10
                    "
                  >
                    <Phone
                      size={13}
                      strokeWidth={1.8}
                    />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-secondary

                        text-[8px]

                        uppercase

                        tracking-[0.13em]

                        text-white/30
                      "
                    >
                      Call
                    </span>

                    <span
                      className="
                        mt-0.5
                        block

                        font-secondary

                        text-[12px]
                        font-semibold

                        text-white/80

                        sm:text-[13px]
                      "
                    >
                      +91 98403 33117
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@devappartments.com"
                  className="
                    group

                    inline-flex

                    items-center
                    gap-2.5
                  "
                >
                  <span
                    className="
                      flex

                      h-8
                      w-8

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/10

                      text-[#c89b3c]

                      transition-all
                      duration-300

                      group-hover:border-[#c89b3c]/40
                      group-hover:bg-[#c89b3c]/10
                    "
                  >
                    <Mail
                      size={13}
                      strokeWidth={1.8}
                    />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-secondary

                        text-[8px]

                        uppercase

                        tracking-[0.13em]

                        text-white/30
                      "
                    >
                      Email
                    </span>

                    <span
                      className="
                        mt-0.5
                        block

                        font-secondary

                        text-[12px]
                        font-semibold

                        text-white/80

                        sm:text-[13px]
                      "
                    >
                      info@devappartments.com
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              FORM
              Mobile = first
              Desktop = right
          ================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease,
            }}
            className="
              order-1

              w-full

              rounded-[22px]

              border
              border-white/10

              bg-white

              p-5

              text-[#241b15]

              shadow-[0_22px_65px_rgba(0,0,0,0.20)]

              sm:p-6

              lg:order-2
              lg:p-7
            "
          >
            {/* Heading */}
            <div
              className="
                flex

                items-start
                justify-between

                gap-5
              "
            >
              <div>
                <p
                  className="
                    font-secondary

                    text-[9px]
                    font-semibold

                    uppercase

                    tracking-[0.18em]

                    text-[#b88d48]

                    sm:text-[10px]
                  "
                >
                  Enquire Now
                </p>

                <h3
                  className="
                    mt-1.5

                    font-primary

                    text-[26px]
                    font-bold

                    tracking-[-0.035em]

                    text-[#211811]

                    sm:text-[29px]

                    lg:text-[31px]
                  "
                >
                  Book a Site Visit
                </h3>
              </div>

              <span
                className="
                  hidden

                  h-10
                  w-10

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-[#f4eee7]

                  text-[#b88d48]

                  sm:flex
                "
              >
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                />
              </span>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="
                mt-5
                space-y-3
              "
            >
              {/* Name + Phone */}
              <div
                className="
                  grid
                  gap-3

                  sm:grid-cols-2
                "
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  autoComplete="name"
                  placeholder="Full Name"
                  className="
                    h-[46px]
                    w-full

                    rounded-[10px]

                    border
                    border-[#e7e0d8]

                    bg-[#faf8f5]

                    px-3.5

                    font-secondary

                    text-[12px]

                    text-[#241b15]

                    outline-none

                    transition-all
                    duration-300

                    placeholder:text-[#9d958d]

                    focus:border-[#b88d48]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#b88d48]/10

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  autoComplete="tel"
                  placeholder="Phone Number"
                  className="
                    h-[46px]
                    w-full

                    rounded-[10px]

                    border
                    border-[#e7e0d8]

                    bg-[#faf8f5]

                    px-3.5

                    font-secondary

                    text-[12px]

                    text-[#241b15]

                    outline-none

                    transition-all
                    duration-300

                    placeholder:text-[#9d958d]

                    focus:border-[#b88d48]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#b88d48]/10

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                autoComplete="email"
                placeholder="Email Address"
                className="
                  h-[46px]
                  w-full

                  rounded-[10px]

                  border
                  border-[#e7e0d8]

                  bg-[#faf8f5]

                  px-3.5

                  font-secondary

                  text-[12px]

                  text-[#241b15]

                  outline-none

                  transition-all
                  duration-300

                  placeholder:text-[#9d958d]

                  focus:border-[#b88d48]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#b88d48]/10

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {/* Villa Type */}
              <div
                className="
                  relative
                  w-full
                "
              >
                <select
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
                    h-[46px]
                    w-full

                    cursor-pointer
                    appearance-none

                    rounded-[10px]

                    border
                    border-[#e7e0d8]

                    bg-[#faf8f5]

                    py-0
                    pl-3.5
                    pr-11

                    font-secondary

                    text-[12px]

                    text-[#7e766e]

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

              {/* Message */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={2}
                disabled={isSubmitting}
                placeholder="Message"
                className="
                  min-h-[76px]
                  w-full

                  resize-none

                  rounded-[10px]

                  border
                  border-[#e7e0d8]

                  bg-[#faf8f5]

                  px-3.5
                  py-3

                  font-secondary

                  text-[12px]

                  text-[#241b15]

                  outline-none

                  transition-all
                  duration-300

                  placeholder:text-[#9d958d]

                  focus:border-[#b88d48]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#b88d48]/10

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {/* Error */}
              {status.type ===
                "error" && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
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

                    px-3.5
                    py-2.5

                    font-secondary

                    text-[11px]
                    font-medium

                    text-red-600
                  "
                >
                  {status.message}
                </motion.div>
              )}

              {/* Button */}
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

                  mt-1

                  flex

                  h-[46px]
                  w-full

                  items-center
                  justify-between

                  rounded-full

                  bg-[#e8612c]

                  px-4

                  font-secondary

                  text-[12px]
                  font-semibold

                  text-white

                  shadow-[0_10px_24px_rgba(232,97,44,0.22)]

                  transition-all
                  duration-300

                  hover:bg-[#d65322]

                  disabled:cursor-not-allowed
                  disabled:opacity-70

                  sm:max-w-[220px]
                  sm:px-5
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

                    shrink-0

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
            </form>
          </motion.div>
        </div>

        {/* =================================================
            COPYRIGHT
        ================================================= */}
        <div
          className="
            mt-9

            flex
            flex-col

            gap-2

            border-t
            border-white/10

            py-4

            font-secondary

            text-[9px]

            text-white/35

            sm:flex-row
            sm:items-center
            sm:justify-between

            sm:text-[10px]

            lg:mt-10
          "
        >
          <p>
            © 2026 Dev Appartments. All rights reserved.
          </p>

          <p>
            Divya Desam · Premium Villas · ECR, Thiruvidandhai, Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}
