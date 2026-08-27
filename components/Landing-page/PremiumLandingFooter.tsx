"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  motion,
} from "framer-motion";

import {
  ArrowUpRight,
  ChevronDown,
  Loader2,
  Mail,
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

type FormData = {
  name: string;
  phone: string;
  email: string;
  villa_type: string;
  message: string;
};

type Status = {
  type:
    | "error"
    | null;

  message: string;
};

const initialFormData: FormData =
  {
    name: "",
    phone: "",
    email: "",
    villa_type: "",
    message: "",
  };

export default function PremiumLandingFooter() {
  const router =
    useRouter();

  const [
    formData,
    setFormData,
  ] =
    useState<FormData>(
      initialFormData,
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(false);

  const [
    isVillaSelectOpen,
    setIsVillaSelectOpen,
  ] = useState(false);

  const [
    status,
    setStatus,
  ] =
    useState<Status>({
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
    } =
      event.target;

    setFormData(
      (
        previous,
      ) => ({
        ...previous,
        [name]:
          value,
      }),
    );

    if (
      status.type
    ) {
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

  const handleSubmit =
    async (
      event: FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      if (
        isSubmitting
      ) {
        return;
      }

      setStatus({
        type: null,
        message: "",
      });

      if (
        !formData.name.trim()
      ) {
        setStatus({
          type: "error",
          message:
            "Please enter your full name.",
        });

        return;
      }

      if (
        !formData.phone.trim()
      ) {
        setStatus({
          type: "error",
          message:
            "Please enter your phone number.",
        });

        return;
      }

      if (
        !formData.email.trim()
      ) {
        setStatus({
          type: "error",
          message:
            "Please enter your email address.",
        });

        return;
      }

      if (
        !formData.villa_type
      ) {
        setStatus({
          type: "error",
          message:
            "Please select your villa type.",
        });

        return;
      }

      try {
        setIsSubmitting(
          true,
        );

        const response =
          await fetch(
            "/api/landingpage-enquiry",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
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
                  },
                ),
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
          result =
            {};
        }

        if (
          !response.ok
        ) {
          throw new Error(
            result.message ||
              "Unable to submit your enquiry.",
          );
        }

        setFormData(
          initialFormData,
        );

        router.push(
          "/thank-you",
        );
      } catch (
        error
      ) {
        console.error(
          "Landing page enquiry error:",
          error,
        );

        setStatus({
          type: "error",

          message:
            error instanceof
            Error
              ? error.message
              : "Something went wrong. Please try again.",
        });
      } finally {
        setIsSubmitting(
          false,
        );
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
      "
    >
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute

          -left-[140px]
          top-[80px]

          h-[360px]
          w-[360px]

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

          -right-[180px]
          bottom-[-140px]

          h-[420px]
          w-[420px]

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
          max-w-[1500px]

          px-5
          pt-14

          sm:px-8
          sm:pt-16

          lg:px-12
          lg:pt-20

          xl:px-20
        "
      >
        {/* Top label */}
        <div
          className="
            mb-10

            flex
            items-center
            gap-4

            sm:mb-12
          "
        >
          <span
            className="
              h-px
              w-10

              bg-[#b88d48]
            "
          />

          <p
            className="
              font-secondary

              text-[10px]
              font-semibold

              uppercase

              tracking-[0.24em]

              text-[#cba45e]
            "
          >
            Visit. Experience. Own.
          </p>
        </div>

        {/* Main */}
        <div
          className="
            grid
            gap-12

            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-16

            xl:grid-cols-[0.85fr_1.15fr]
            xl:gap-24
          "
        >
          {/* LEFT CONTENT
              MOBILE = SECOND
              DESKTOP = FIRST
          */}
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
              ease,
            }}
            className="
              order-2

              flex
              flex-col
              justify-between

              lg:order-1
            "
          >
            <div>
              <h2
                className="
                  max-w-[520px]

                  font-primary

                  text-[38px]
                  font-bold

                  leading-[1.02]
                  tracking-[-0.045em]

                  text-white

                  sm:text-[48px]

                  lg:text-[58px]

                  xl:text-[64px]
                "
              >
                Find Your
                <br />

                <span
                  className="
                    text-[#c89b3c]
                  "
                >
                  Home at Divya
                  Desam
                </span>
              </h2>

              <p
                className="
                  mt-5

                  max-w-[500px]

                  font-secondary

                  text-[13px]

                  leading-[1.8]

                  text-white/55

                  sm:text-[14px]

                  lg:text-[15px]
                "
              >
                Schedule a visit
                and explore premium
                3 &amp; 4 BHK villas
                designed for elegant,
                comfortable living.
              </p>
            </div>

            {/* Address */}
            <div
              className="
                mt-10

                border-t
                border-white/10

                pt-8

                sm:mt-12
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    flex

                    h-10
                    w-10
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
                    size={17}
                    strokeWidth={
                      1.8
                    }
                  />
                </div>

                <div>
                  <p
                    className="
                      font-secondary

                      text-[10px]
                      font-semibold

                      uppercase

                      tracking-[0.16em]

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
                      mt-2

                      block

                      max-w-[460px]

                      font-secondary

                      text-[14px]
                      font-medium

                      leading-[1.8]

                      text-white/80

                      transition-colors
                      duration-300

                      hover:text-[#c89b3c]

                      sm:text-[15px]
                    "
                  >
                    New No. 15/2,
                    Old No. 7/2,
                    First Main Road,
                    Kasturibai Nagar,
                    Adyar, Chennai –
                    600020
                  </a>
                </div>
              </div>

              {/* Phone + email */}
              <div
                className="
                  mt-7

                  flex
                  flex-col

                  gap-5

                  sm:flex-row
                  sm:items-center
                  sm:gap-8
                "
              >
                <a
                  href="tel:+919840333117"
                  className="
                    group

                    inline-flex

                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      flex

                      h-9
                      w-9

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
                      size={15}
                      strokeWidth={
                        1.8
                      }
                    />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-secondary

                        text-[9px]

                        uppercase

                        tracking-[0.14em]

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

                        text-[13px]
                        font-semibold

                        text-white/80
                      "
                    >
                      +91 98403 33117
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:info@devappartments.com"
                  className="
                    group

                    inline-flex

                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      flex

                      h-9
                      w-9

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
                      size={15}
                      strokeWidth={
                        1.8
                      }
                    />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-secondary

                        text-[9px]

                        uppercase

                        tracking-[0.14em]

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

                        text-[13px]
                        font-semibold

                        text-white/80
                      "
                    >
                      info@devappartments.com
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* FORM
              MOBILE = FIRST
              DESKTOP = SECOND
          */}
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease,
            }}
            className="
              order-1

              rounded-[28px]

              border
              border-white/10

              bg-white

              p-5

              text-[#241b15]

              shadow-[0_28px_80px_rgba(0,0,0,0.22)]

              sm:p-8

              lg:order-2
              lg:p-9

              xl:p-10
            "
          >
            <div
              className="
                flex

                items-start
                justify-between

                gap-6
              "
            >
              <div>
                <p
                  className="
                    font-secondary

                    text-[10px]
                    font-semibold

                    uppercase

                    tracking-[0.2em]

                    text-[#b88d48]
                  "
                >
                  Enquire Now
                </p>

                <h3
                  className="
                    mt-2

                    font-primary

                    text-[28px]
                    font-bold

                    tracking-[-0.035em]

                    text-[#211811]

                    sm:text-[32px]

                    lg:text-[36px]
                  "
                >
                  Book a Site Visit
                </h3>
              </div>

              <span
                className="
                  hidden

                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-full

                  bg-[#f4eee7]

                  text-[#b88d48]

                  sm:flex
                "
              >
                <ArrowUpRight
                  size={19}
                  strokeWidth={
                    1.8
                  }
                />
              </span>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="
                mt-7
                space-y-4
              "
            >
              {/* Name + Phone */}
              <div
                className="
                  grid
                  gap-4

                  sm:grid-cols-2
                "
              >
                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                  disabled={
                    isSubmitting
                  }
                  autoComplete="name"
                  placeholder="Full Name"
                  className="
                    h-[52px]
                    w-full

                    rounded-[12px]

                    border
                    border-[#e7e0d8]

                    bg-[#faf8f5]

                    px-4

                    font-secondary

                    text-[13px]

                    text-[#241b15]

                    outline-none

                    transition-all
                    duration-300

                    placeholder:text-[#9d958d]

                    focus:border-[#b88d48]
                    focus:bg-white

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  required
                  disabled={
                    isSubmitting
                  }
                  autoComplete="tel"
                  placeholder="Phone Number"
                  className="
                    h-[52px]
                    w-full

                    rounded-[12px]

                    border
                    border-[#e7e0d8]

                    bg-[#faf8f5]

                    px-4

                    font-secondary

                    text-[13px]

                    text-[#241b15]

                    outline-none

                    transition-all
                    duration-300

                    placeholder:text-[#9d958d]

                    focus:border-[#b88d48]
                    focus:bg-white

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
                disabled={
                  isSubmitting
                }
                autoComplete="email"
                placeholder="Email Address"
                className="
                  h-[52px]
                  w-full

                  rounded-[12px]

                  border
                  border-[#e7e0d8]

                  bg-[#faf8f5]

                  px-4

                  font-secondary

                  text-[13px]

                  text-[#241b15]

                  outline-none

                  transition-all
                  duration-300

                  placeholder:text-[#9d958d]

                  focus:border-[#b88d48]
                  focus:bg-white

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {/* Villa */}
              <div className="relative w-full">
                <select
                  name="villa_type"
                  value={
                    formData.villa_type
                  }
                  onChange={
                    handleVillaChange
                  }
                  onMouseDown={() =>
                    setIsVillaSelectOpen(true)
                  }
                  onFocus={() =>
                    setIsVillaSelectOpen(true)
                  }
                  onBlur={() =>
                    setIsVillaSelectOpen(false)
                  }
                  required
                  disabled={
                    isSubmitting
                  }
                  className="
                    h-[52px]
                    w-full

                    cursor-pointer
                    appearance-none

                    rounded-[12px]

                    border
                    border-[#e7e0d8]

                    bg-[#faf8f5]

                    py-0
                    pl-4
                    pr-12

                    font-secondary

                    text-[13px]

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
                    right-4
                    top-1/2

                    flex
                    h-7
                    w-7

                    -translate-y-1/2

                    items-center
                    justify-center

                    text-[#746a61]
                  "
                >
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                  />
                </motion.span>
              </div>

              {/* Message */}
              <textarea
                name="message"
                value={
                  formData.message
                }
                onChange={
                  handleChange
                }
                rows={3}
                disabled={
                  isSubmitting
                }
                placeholder="Message"
                className="
                  min-h-[96px]
                  w-full

                  resize-none

                  rounded-[12px]

                  border
                  border-[#e7e0d8]

                  bg-[#faf8f5]

                  px-4
                  py-3.5

                  font-secondary

                  text-[13px]

                  text-[#241b15]

                  outline-none

                  transition-all
                  duration-300

                  placeholder:text-[#9d958d]

                  focus:border-[#b88d48]
                  focus:bg-white

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {/* Error only */}
              {status.type ===
                "error" && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    rounded-[12px]

                    border
                    border-red-200

                    bg-red-50

                    px-4
                    py-3

                    font-secondary

                    text-[12px]
                    font-medium

                    text-red-600
                  "
                >
                  {
                    status.message
                  }
                </motion.div>
              )}

              {/* Submit */}
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

                  mt-1

                  flex

                  h-[54px]
                  w-full
                  max-w-[230px]

                  items-center
                  justify-between

                  rounded-full

                  bg-[#e8612c]

                  px-5

                  font-secondary

                  text-[13px]
                  font-semibold

                  text-white

                  shadow-[0_12px_28px_rgba(232,97,44,0.25)]

                  transition-all
                  duration-300

                  hover:bg-[#d65322]

                  disabled:cursor-not-allowed
                  disabled:opacity-70

                  sm:px-6

                  sm:text-[14px]
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

                    h-8
                    w-8

                    items-center
                    justify-center

                    rounded-full

                    bg-white/15

                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                >
                  {isSubmitting ? (
                    <Loader2
                      size={
                        15
                      }
                      className="animate-spin"
                    />
                  ) : (
                    <ArrowUpRight
                      size={
                        15
                      }
                      strokeWidth={
                        2
                      }
                    />
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom footer */}
        <div
          className="
            mt-14

            flex
            flex-col
            gap-3

            border-t
            border-white/10

            py-5

            font-secondary

            text-[11px]

            text-white/35

            sm:flex-row
            sm:items-center
            sm:justify-between

            lg:mt-16
          "
        >
          <p>
            © 2026 Dev
            Appartments. All
            rights reserved.
          </p>

          <p>
            Divya Desam ·
            Premium Villas ·
            ECR, Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}