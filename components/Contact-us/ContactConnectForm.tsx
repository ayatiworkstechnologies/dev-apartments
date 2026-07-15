"use client";

import Image from "next/image";
import {
  FormEvent,
  ChangeEvent,
  useState,
} from "react";
import { motion, type Variants } from "framer-motion";

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.985,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.9,
      ease: smoothEase,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const leftContentVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -45,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.85,
      ease: smoothEase,
      staggerChildren: 0.09,
    },
  },
};

const formVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 45,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    x: 0,
    scale: 1,

    transition: {
      duration: 0.9,
      ease: smoothEase,
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  code: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  code: "",
};

const contactDetails = [
  {
    title: "Email",
    icon: "/icons/email.svg",
    iconAlt: "Email",
    content: "info@devappartments.com",
    href: "mailto:info@devappartments.com",
  },
  {
    title: "Mobile",
    icon: "/icons/phone.svg",
    iconAlt: "Phone",
    phoneNumbers: [
      {
        label: "98400 37777",
        href: "tel:+919840037777",
      },
      {
        label: "98403 33117",
        href: "tel:+919840333117",
      },
    ],
  },
  {
    title: "Office",
    icon: "/icons/office.svg",
    iconAlt: "Office",
    address:
      "New No. 15/2, Old No. 7/2, First Main Road, Kasturibai Nagar, Adyar Chennai - 600020",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: "/icons/facebook.svg",
  },
  {
    label: "X",
    href: "#",
    icon: "/icons/x.svg",
  },
  {
    label: "Instagram",
    href: "#",
    icon: "/icons/instagram.svg",
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: "/icons/linkedin.svg",
  },
  {
    label: "YouTube",
    href: "#",
    icon: "/icons/youtube.svg",
  },
];

export default function ContactConnectForm() {
  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      console.log("Contact form data:", formData);

      // Add your API request here.
      // Example:
      //
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Unable to submit form");
      // }

      setFormData(initialFormData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="
        overflow-hidden bg-white
        px-4 py-12
        sm:px-6 sm:py-16
        lg:px-8 lg:py-20
      "
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
          margin: "0px 0px -50px 0px",
        }}
        className="
          mx-auto grid w-full
          max-w-[1080px]
          grid-cols-1
          overflow-hidden
          rounded-[14px]
          bg-white
          shadow-[0_18px_48px_rgba(25,25,25,0.14)]

          lg:grid-cols-[0.86fr_1.14fr]
        "
      >
        {/* Left contact section */}
        <motion.div
          variants={leftContentVariants}
          className="
            flex flex-col justify-center
            px-6 py-10

            sm:px-9 sm:py-12
            lg:px-10 lg:py-12
            xl:px-12
          "
        >
          <motion.div variants={itemVariants}>
            <h2
              className="
                text-[29px] font-semibold
                leading-[1.1]
                tracking-[-0.035em]
                text-[#090909]

                sm:text-[32px]
                lg:text-[34px]
              "
            >
              Let&apos;s{" "}
              <span className="text-[#B88948]">
                Connect
              </span>
            </h2>

            <p
              className="
                mt-4 max-w-[260px]
                text-[12px] font-normal
                leading-[1.65]
                text-[#999999]

                sm:text-[13px]
              "
            >
              Share your details, and our team will get in
              touch with you soon.
            </p>
          </motion.div>

          {/* Contact details */}
          <div className="mt-8 space-y-6">
            {contactDetails.map((detail) => (
              <motion.div
                key={detail.title}
                variants={itemVariants}
                whileHover={{
                  x: 5,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      relative h-[18px] w-[18px]
                      flex-shrink-0
                    "
                  >
                    <Image
                      src={detail.icon}
                      alt={detail.iconAlt}
                      fill
                      sizes="18px"
                      className="object-contain"
                    />
                  </div>

                  <h3
                    className="
                      text-[14px] font-semibold
                      text-[#1A1A1A]
                    "
                  >
                    {detail.title}
                  </h3>
                </div>

                {detail.href && detail.content && (
                  <a
                    href={detail.href}
                    className="
                      mt-2 block pl-[28px]
                      text-[11px]
                      text-[#7F7F7F]
                      transition-colors
                      duration-300
                      hover:text-[#B88948]

                      sm:text-[12px]
                    "
                  >
                    {detail.content}
                  </a>
                )}

                {detail.phoneNumbers && (
                  <div
                    className="
                      mt-2 flex flex-wrap
                      items-center gap-1
                      pl-[28px]
                      text-[11px]
                      text-[#7F7F7F]

                      sm:text-[12px]
                    "
                  >
                    {detail.phoneNumbers.map(
                      (phone, index) => (
                        <span
                          key={phone.href}
                          className="inline-flex items-center gap-1"
                        >
                          {index > 0 && (
                            <span aria-hidden="true">
                              ||
                            </span>
                          )}

                          <a
                            href={phone.href}
                            className="
                              transition-colors
                              duration-300
                              hover:text-[#B88948]
                            "
                          >
                            {phone.label}
                          </a>
                        </span>
                      ),
                    )}
                  </div>
                )}

                {detail.address && (
                  <address
                    className="
                      mt-2 max-w-[285px]
                      pl-[28px]
                      text-[11px]
                      not-italic
                      leading-[1.6]
                      text-[#7F7F7F]

                      sm:text-[12px]
                    "
                  >
                    {detail.address}
                  </address>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social icons */}
          <motion.div
            variants={itemVariants}
            className="
              mt-8 flex items-center
              gap-4
              sm:mt-9
            "
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -4,
                  scale: 1.12,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className="
                  relative block
                  h-[15px] w-[15px]
                "
              >
                <Image
                  src={social.icon}
                  alt={social.label}
                  fill
                  sizes="15px"
                  className="object-contain"
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right form section */}
        <div
          className="
            flex items-center justify-center
            bg-[#FAFAFA]
            p-4

            sm:p-6
            lg:bg-white lg:p-5
          "
        >
          <motion.form
            variants={formVariants}
            onSubmit={handleSubmit}
            className="
              w-full rounded-[12px]
              
              bg-white p-5
            

              sm:p-6
              lg:p-5
            "
          >
            <motion.div variants={itemVariants}>
              <label
                htmlFor="name"
                className="
                  mb-1.5 block
                  text-[13px] font-semibold
                  text-[#1A1A1A]
                "
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                required
                className="
                  h-[38px] w-full
                  rounded-[4px]
                  border border-transparent
                  bg-[#F5F5F5]
                  px-3
                  text-[12px]
                  text-[#222222]
                  outline-none
                  transition-all duration-300

                  placeholder:text-[#A5A5A5]

                  focus:border-[#B88948]/50
                  focus:bg-white
                  focus:shadow-[0_0_0_3px_rgba(184,137,72,0.10)]
                "
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-2.5"
            >
              <label
                htmlFor="email"
                className="
                  mb-1.5 block
                  text-[13px] font-semibold
                  text-[#1A1A1A]
                "
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                required
                className="
                  h-[38px] w-full
                  rounded-[4px]
                  border border-transparent
                  bg-[#F5F5F5]
                  px-3
                  text-[12px]
                  text-[#222222]
                  outline-none
                  transition-all duration-300

                  placeholder:text-[#A5A5A5]

                  focus:border-[#B88948]/50
                  focus:bg-white
                  focus:shadow-[0_0_0_3px_rgba(184,137,72,0.10)]
                "
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-2.5"
            >
              <label
                htmlFor="phone"
                className="
                  mb-1.5 block
                  text-[13px] font-semibold
                  text-[#1A1A1A]
                "
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Your Phone No"
                required
                className="
                  h-[38px] w-full
                  rounded-[4px]
                  border border-transparent
                  bg-[#F5F5F5]
                  px-3
                  text-[12px]
                  text-[#222222]
                  outline-none
                  transition-all duration-300

                  placeholder:text-[#A5A5A5]

                  focus:border-[#B88948]/50
                  focus:bg-white
                  focus:shadow-[0_0_0_3px_rgba(184,137,72,0.10)]
                "
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-2.5"
            >
              <label
                htmlFor="message"
                className="
                  mb-1.5 block
                  text-[13px] font-semibold
                  text-[#1A1A1A]
                "
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Enter Your Message"
                required
                className="
                  min-h-[88px] w-full
                  resize-none
                  rounded-[4px]
                  border border-transparent
                  bg-[#F5F5F5]
                  px-3 py-3
                  text-[12px]
                  text-[#222222]
                  outline-none
                  transition-all duration-300

                  placeholder:text-[#A5A5A5]

                  focus:border-[#B88948]/50
                  focus:bg-white
                  focus:shadow-[0_0_0_3px_rgba(184,137,72,0.10)]
                "
              />
            </motion.div>

            

            <motion.div
              variants={itemVariants}
              className="mt-4"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={
                  isSubmitting
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.035,
                        boxShadow:
                          "0 10px 24px rgba(184,137,72,0.30)",
                      }
                }
                whileTap={
                  isSubmitting
                    ? undefined
                    : {
                        scale: 0.96,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                }}
                className="
                  inline-flex min-h-[39px]
                  items-center justify-center
                  rounded-full
                  bg-[#B88948]
                  px-7
                  text-[12px] font-semibold
                  text-white
                  outline-none
                  transition-colors duration-300

                  hover:bg-[#A87A3D]

                  focus-visible:ring-4
                  focus-visible:ring-[#B88948]/20

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit"}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}