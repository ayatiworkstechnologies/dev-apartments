"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type ComponentType,
  type FormEvent,
  type MouseEvent,
} from "react";

import { usePathname } from "next/navigation";

import {
  Phone,
  Send,
  X,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

type ContactAction = {
  id: number;
  label: string;
  ariaLabel: string;
  href: string;

  icon: ComponentType<{
    size?: number | string;
    className?: string;
    strokeWidth?: number;
  }>;

  type:
    | "link"
    | "enquiry";
};

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

type SubmissionStatus =
  | "idle"
  | "success"
  | "error";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const contactActions: ContactAction[] = [
  {
    id: 1,
    label: "Call",
    ariaLabel:
      "Call Dev Appartments",
    href: "tel:+919840333117",
    icon: Phone,
    type: "link",
  },
  {
    id: 2,
    label: "WhatsApp",
    ariaLabel:
      "Chat with Dev Appartments on WhatsApp",
    href: "https://wa.me/919840333117",
    icon: FaWhatsapp,
    type: "link",
  },
  {
    id: 3,
    label: "Enquire Now",
    ariaLabel:
      "Open enquiry form",
    href: "#",
    icon: Send,
    type: "enquiry",
  },
];

export default function FloatingContactActions() {
  const pathname =
    usePathname();

  const [
    isEnquiryOpen,
    setIsEnquiryOpen,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] =
    useState<ContactFormData>(
      initialFormData,
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    submissionStatus,
    setSubmissionStatus,
  ] =
    useState<SubmissionStatus>(
      "idle",
    );

  const [
    statusMessage,
    setStatusMessage,
  ] =
    useState("");

  /*
   * Hide FloatingContactActions
   * only on these pages.
   */
  const hiddenRoutes = [
    "/divya-desam-ecr",
    "/thank-you",
  ];

  const shouldHideFloatingActions =
    hiddenRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(
          `${route}/`,
        ),
    );

  const openEnquiry = () => {
    setIsEnquiryOpen(true);

    setSubmissionStatus(
      "idle",
    );

    setStatusMessage("");
  };

  const closeEnquiry = () => {
    if (isSubmitting) {
      return;
    }

    setIsEnquiryOpen(false);

    setSubmissionStatus(
      "idle",
    );

    setStatusMessage("");
  };

  const handleChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
    >,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previousData) => ({
        ...previousData,
        [name]: value,
      }),
    );

    if (
      submissionStatus !==
      "idle"
    ) {
      setSubmissionStatus(
        "idle",
      );

      setStatusMessage("");
    }
  };

  const handleTemporaryLink = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (
      event.currentTarget.getAttribute(
        "href",
      ) === "#"
    ) {
      event.preventDefault();
    }
  };

  const handleSubmit =
    async (
      event: FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      const cleanedFormData: ContactFormData =
        {
          name:
            formData.name.trim(),

          email:
            formData.email.trim(),

          phone:
            formData.phone.trim(),

          message:
            formData.message.trim(),
        };

      if (
        !cleanedFormData.name ||
        !cleanedFormData.email ||
        !cleanedFormData.phone ||
        !cleanedFormData.message
      ) {
        setSubmissionStatus(
          "error",
        );

        setStatusMessage(
          "Please fill in all required fields.",
        );

        return;
      }

      setIsSubmitting(true);

      setSubmissionStatus(
        "idle",
      );

      setStatusMessage("");

      try {
        const response =
          await fetch(
            "/api/contact",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify(
                  cleanedFormData,
                ),
            },
          );

        const responseText =
          await response.text();

        let result: ApiResponse =
          {};

        if (responseText) {
          try {
            result =
              JSON.parse(
                responseText,
              ) as ApiResponse;
          } catch {
            result = {
              success: false,

              message:
                responseText ||
                "Invalid response received from the server.",
            };
          }
        }

        if (!response.ok) {
          throw new Error(
            result.message ||
              `Unable to submit the enquiry. Error ${response.status}.`,
          );
        }

        if (
          result.success ===
          false
        ) {
          throw new Error(
            result.message ||
              "Unable to submit your enquiry.",
          );
        }

        setSubmissionStatus(
          "success",
        );

        setStatusMessage(
          result.message ||
            "Thank you! Your enquiry has been submitted successfully.",
        );

        setFormData(
          initialFormData,
        );
      } catch (
        error: unknown
      ) {
        console.error(
          "Floating enquiry form error:",
          error,
        );

        setSubmissionStatus(
          "error",
        );

        setStatusMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        setIsSubmitting(
          false,
        );
      }
    };

  useEffect(() => {
    document.body.style.overflow =
      isEnquiryOpen
        ? "hidden"
        : "";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
          "Escape" &&
        !isSubmitting
      ) {
        closeEnquiry();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [
    isEnquiryOpen,
    isSubmitting,
  ]);

  /*
   * Do not render this component
   * on Divya Desam landing page
   * or Thank You page.
   */
  if (
    shouldHideFloatingActions
  ) {
    return null;
  }

  return (
    <>
      {/* Desktop Floating Contact Dock */}
      <aside
        aria-label="Quick contact actions"
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
            gap-4

            rounded-full

            border
            border-white/10

            bg-white/25

            px-1.5
            py-3.5

            shadow-[0_14px_38px_rgba(0,0,0,0.16)]

            backdrop-blur-2xl
          "
        >
          {contactActions.map(
            (item) => {
              const Icon =
                item.icon;

              const actionContent =
                (
                  <>
                    <span
                      className="
                        pointer-events-none

                        absolute

                        right-[calc(100%+11px)]
                        top-1/2

                        -translate-y-1/2
                        translate-x-2

                        whitespace-nowrap

                        rounded-lg

                        border
                        border-white/10

                        bg-[#181818]/95

                        px-3
                        py-2

                        text-[11px]
                        font-medium
                        tracking-wide

                        text-white

                        opacity-0

                        shadow-[0_10px_28px_rgba(0,0,0,0.24)]

                        backdrop-blur-md

                        transition-all
                        duration-300

                        ease-[cubic-bezier(0.22,1,0.36,1)]

                        group-hover:translate-x-0
                        group-hover:opacity-100

                        group-focus-visible:translate-x-0
                        group-focus-visible:opacity-100
                      "
                    >
                      {
                        item.label
                      }

                      <span
                        className="
                          absolute

                          left-full
                          top-1/2

                          -translate-y-1/2

                          border-y-[5px]
                          border-l-[6px]

                          border-y-transparent
                          border-l-[#181818]
                        "
                      />
                    </span>

                    <Icon
                      size={18}
                      strokeWidth={
                        1.75
                      }
                      className="
                        relative
                        z-10

                        transition-colors
                        duration-300
                      "
                    />

                    <span
                      className="
                        pointer-events-none

                        absolute
                        inset-[4px]

                        rounded-full

                        border
                        border-white/60

                        opacity-70
                      "
                    />
                  </>
                );

              const desktopActionClasses = `
                group
                relative

                flex
                h-[44px]
                w-[44px]
                shrink-0

                items-center
                justify-center

                rounded-full

                border
                border-neutral-200/80

                bg-gradient-to-br
                from-white
                to-[#f4f4f4]

                text-neutral-700

                shadow-[0_4px_13px_rgba(0,0,0,0.09)]

                transition-colors
                duration-300

                hover:border-[#f45a28]/70
                hover:bg-none
                hover:bg-[#f45a28]
                hover:text-white

                focus-visible:border-[#f45a28]/70
                focus-visible:bg-none
                focus-visible:bg-[#f45a28]
                focus-visible:text-white

                focus-visible:outline-none

                focus-visible:ring-4
                focus-visible:ring-[#f45a28]/15
              `;

              if (
                item.type ===
                "enquiry"
              ) {
                return (
                  <button
                    key={
                      item.id
                    }
                    type="button"
                    aria-label={
                      item.ariaLabel
                    }
                    onClick={
                      openEnquiry
                    }
                    className={
                      desktopActionClasses
                    }
                  >
                    {
                      actionContent
                    }
                  </button>
                );
              }

              return (
                <a
                  key={
                    item.id
                  }
                  href={
                    item.href
                  }
                  aria-label={
                    item.ariaLabel
                  }
                  onClick={
                    handleTemporaryLink
                  }
                  target={
                    item.label ===
                    "WhatsApp"
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.label ===
                    "WhatsApp"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={
                    desktopActionClasses
                  }
                >
                  {
                    actionContent
                  }
                </a>
              );
            },
          )}
        </div>
      </aside>

      {/* Mobile Bottom Contact Bar */}
      <aside
        aria-label="Mobile contact actions"
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

            rounded-2xl

            border
            border-neutral-200

            bg-white

            shadow-[0_14px_40px_rgba(0,0,0,0.18)]
          "
        >
          {contactActions.map(
            (
              item,
              index,
            ) => {
              const Icon =
                item.icon;

              const isLast =
                index ===
                contactActions.length -
                  1;

              const mobileClasses = `
                flex
                min-h-[64px]
                min-w-0

                items-center
                justify-center

                gap-2

                px-2

                text-neutral-700

                transition-all
                duration-300

                active:scale-[0.98]

                ${
                  !isLast
                    ? "border-r border-neutral-200"
                    : ""
                }

                ${
                  item.type ===
                  "enquiry"
                    ? "bg-[#f45a28] text-white active:bg-[#d94a1c]"
                    : "bg-white active:bg-neutral-100"
                }
              `;

              const mobileContent =
                (
                  <>
                    <Icon
                      size={19}
                      strokeWidth={
                        1.8
                      }
                      className="shrink-0"
                    />

                    <span
                      className="
                        min-w-0
                        whitespace-nowrap

                        text-[10px]
                        font-semibold

                        min-[380px]:text-[11px]
                      "
                    >
                      {
                        item.label
                      }
                    </span>
                  </>
                );

              if (
                item.type ===
                "enquiry"
              ) {
                return (
                  <button
                    key={
                      item.id
                    }
                    type="button"
                    aria-label={
                      item.ariaLabel
                    }
                    onClick={
                      openEnquiry
                    }
                    className={
                      mobileClasses
                    }
                  >
                    {
                      mobileContent
                    }
                  </button>
                );
              }

              return (
                <a
                  key={
                    item.id
                  }
                  href={
                    item.href
                  }
                  aria-label={
                    item.ariaLabel
                  }
                  onClick={
                    handleTemporaryLink
                  }
                  target={
                    item.label ===
                    "WhatsApp"
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.label ===
                    "WhatsApp"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={
                    mobileClasses
                  }
                >
                  {
                    mobileContent
                  }
                </a>
              );
            },
          )}
        </div>
      </aside>

      {/* Enquiry Modal */}
      {isEnquiryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
          className="
            fixed
            inset-0
            z-[10000]

            flex
            items-center
            justify-center

            overflow-y-auto

            bg-black/55

            px-4
            py-6

            backdrop-blur-sm
          "
          onClick={
            closeEnquiry
          }
        >
          <div
            className="
              relative

              my-auto

              w-full
              max-w-[490px]

              rounded-[26px]

              bg-white

              p-5

              shadow-[0_30px_90px_rgba(0,0,0,0.3)]

              sm:p-8
            "
            onClick={(
              event,
            ) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Close enquiry form"
              onClick={
                closeEnquiry
              }
              disabled={
                isSubmitting
              }
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

                bg-neutral-100

                text-neutral-700

                transition-all
                duration-300

                hover:rotate-90
                hover:bg-[#f45a28]
                hover:text-white

                focus-visible:outline-none

                focus-visible:ring-4
                focus-visible:ring-[#f45a28]/15

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={20} />
            </button>

            <div className="pr-12">
              <p
                className="
                  mb-2

                  text-xs
                  font-semibold
                  uppercase

                  tracking-[0.2em]

                  text-[#b4894a]
                "
              >
                Contact Us
              </p>

              <h2
                id="enquiry-title"
                className="
                  text-2xl
                  font-semibold

                  text-neutral-900

                  sm:text-3xl
                "
              >
                Start a
                Conversation
              </h2>

              <p
                className="
                  mt-2

                  text-sm
                  leading-6

                  text-neutral-500
                "
              >
                Share your
                requirements and our
                team will contact you
                shortly.
              </p>
            </div>

            <form
              className="
                mt-7
                space-y-4
              "
              onSubmit={
                handleSubmit
              }
              noValidate
            >
              <div>
                <label
                  htmlFor="floating-contact-name"
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-neutral-700
                  "
                >
                  Name
                </label>

                <input
                  id="floating-contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
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
                  placeholder="Enter your name"
                  className="
                    h-12
                    w-full

                    rounded-xl

                    border
                    border-neutral-200

                    px-4

                    text-sm
                    text-neutral-800

                    outline-none

                    transition

                    placeholder:text-neutral-400

                    focus:border-[#f45a28]

                    focus:ring-4
                    focus:ring-[#f45a28]/10

                    disabled:cursor-not-allowed
                    disabled:bg-neutral-100
                    disabled:opacity-70
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="floating-contact-phone"
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-neutral-700
                  "
                >
                  Phone Number
                </label>

                <input
                  id="floating-contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
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
                  placeholder="Enter your phone number"
                  className="
                    h-12
                    w-full

                    rounded-xl

                    border
                    border-neutral-200

                    px-4

                    text-sm
                    text-neutral-800

                    outline-none

                    transition

                    placeholder:text-neutral-400

                    focus:border-[#f45a28]

                    focus:ring-4
                    focus:ring-[#f45a28]/10

                    disabled:cursor-not-allowed
                    disabled:bg-neutral-100
                    disabled:opacity-70
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="floating-contact-email"
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-neutral-700
                  "
                >
                  Email Address
                </label>

                <input
                  id="floating-contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
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
                  placeholder="Enter your email address"
                  className="
                    h-12
                    w-full

                    rounded-xl

                    border
                    border-neutral-200

                    px-4

                    text-sm
                    text-neutral-800

                    outline-none

                    transition

                    placeholder:text-neutral-400

                    focus:border-[#f45a28]

                    focus:ring-4
                    focus:ring-[#f45a28]/10

                    disabled:cursor-not-allowed
                    disabled:bg-neutral-100
                    disabled:opacity-70
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="floating-contact-message"
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-neutral-700
                  "
                >
                  Message
                </label>

                <textarea
                  id="floating-contact-message"
                  name="message"
                  rows={4}
                  value={
                    formData.message
                  }
                  onChange={
                    handleChange
                  }
                  required
                  disabled={
                    isSubmitting
                  }
                  placeholder="Tell us about your requirement"
                  className="
                    w-full

                    resize-none

                    rounded-xl

                    border
                    border-neutral-200

                    px-4
                    py-3

                    text-sm
                    text-neutral-800

                    outline-none

                    transition

                    placeholder:text-neutral-400

                    focus:border-[#f45a28]

                    focus:ring-4
                    focus:ring-[#f45a28]/10

                    disabled:cursor-not-allowed
                    disabled:bg-neutral-100
                    disabled:opacity-70
                  "
                />
              </div>

              {statusMessage && (
                <div
                  role={
                    submissionStatus ===
                    "error"
                      ? "alert"
                      : "status"
                  }
                  aria-live="polite"
                  className={`
                    rounded-xl

                    border

                    px-4
                    py-3

                    text-sm
                    leading-6

                    ${
                      submissionStatus ===
                      "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }
                  `}
                >
                  {
                    statusMessage
                  }
                </div>
              )}

              <button
                type="submit"
                disabled={
                  isSubmitting
                }
                className="
                  flex
                  h-12
                  w-full

                  items-center
                  justify-center

                  gap-2

                  rounded-xl

                  bg-[#f45a28]

                  px-5

                  text-sm
                  font-semibold

                  text-white

                  transition-all
                  duration-300

                  hover:bg-[#d94a1c]

                  focus-visible:outline-none

                  focus-visible:ring-4
                  focus-visible:ring-[#f45a28]/20

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isSubmitting ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="
                        h-4
                        w-4

                        animate-spin

                        rounded-full

                        border-2
                        border-white/40

                        border-t-white
                      "
                    />

                    Submitting...
                  </>
                ) : (
                  <>
                    <Send
                      size={18}
                      strokeWidth={
                        1.8
                      }
                    />

                    Submit Enquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}