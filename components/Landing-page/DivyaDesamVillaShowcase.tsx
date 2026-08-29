"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { redirectToDivyaDesamThankYouPage } from "@/lib/campaignTracking";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Loader2,
  MapPin,
  X,
} from "lucide-react";

type RevealType =
  | "left"
  | "top"
  | "circle"
  | "bottom"
  | "diagonal";

type GalleryImage = {
  id: number;
  image: string;
  alt: string;
  reveal: RevealType;
};

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

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    image: "/images/divyadesam-1.png",
    alt: "Divya Desam premium villa exterior",
    reveal: "left",
  },
  {
    id: 2,
    image: "/images/divyadesam-02.png",
    alt: "Divya Desam contemporary villa architecture",
    reveal: "top",
  },
  {
    id: 3,
    image: "/images/pushpa-03.png",
    alt: "Divya Desam premium villa interior",
    reveal: "circle",
  },
];

const initialFormData: EnquiryFormData = {
  name: "",
  phone: "",
  email: "",
  villa_type: "",
  message: "",
};

const ease: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
];

const SECTION_BACKGROUND = "#f5f1e9";

function getRevealClipPaths(reveal: RevealType) {
  switch (reveal) {
    case "top":
      return {
        closed: "inset(0% 0% 100% 0%)",
        teaser: "inset(0% 0% 72% 0%)",
        open: "inset(0% 0% 0% 0%)",
      };

    case "circle":
      return {
        closed: "circle(0% at 50% 50%)",
        teaser: "circle(24% at 50% 50%)",
        open: "circle(150% at 50% 50%)",
      };

    case "bottom":
      return {
        closed: "inset(100% 0% 0% 0%)",
        teaser: "inset(72% 0% 0% 0%)",
        open: "inset(0% 0% 0% 0%)",
      };

    case "diagonal":
      return {
        closed:
          "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        teaser:
          "polygon(0% 0%, 32% 0%, 14% 100%, 0% 100%)",
        open:
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };

    case "left":
    default:
      return {
        closed: "inset(0% 100% 0% 0%)",
        teaser: "inset(0% 72% 0% 0%)",
        open: "inset(0% 0% 0% 0%)",
      };
  }
}

function getImageStartPosition(reveal: RevealType) {
  switch (reveal) {
    case "top":
      return {
        x: 0,
        y: -45,
        scale: 1.08,
        rotate: 0,
      };

    case "circle":
      return {
        x: 0,
        y: 0,
        scale: 1.14,
        rotate: 0,
      };

    case "bottom":
      return {
        x: 0,
        y: 45,
        scale: 1.08,
        rotate: 0,
      };

    case "diagonal":
      return {
        x: -34,
        y: 24,
        scale: 1.1,
        rotate: -1.2,
      };

    case "left":
    default:
      return {
        x: -45,
        y: 0,
        scale: 1.08,
        rotate: 0,
      };
  }
}

type AnimatedImageProps = {
  item: GalleryImage;
  index: number;
  activeIndex: number;
  priority?: boolean;
  sizes: string;
};

function AnimatedImage({
  item,
  index,
  activeIndex,
  priority = false,
  sizes,
}: AnimatedImageProps) {
  const reduceMotion = useReducedMotion();

  const clipPaths = getRevealClipPaths(item.reveal);

  const startPosition =
    getImageStartPosition(item.reveal);

  const isOpened = index <= activeIndex;
  const isNext = index === activeIndex + 1;

  const clipPath = reduceMotion
    ? clipPaths.open
    : isOpened
      ? clipPaths.open
      : isNext
        ? clipPaths.teaser
        : clipPaths.closed;

  const movementAmount = isOpened
    ? 0
    : isNext
      ? 0.45
      : 1;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              clipPath: clipPaths.closed,
              opacity: 0.55,
            }
      }
      animate={{
        clipPath,
        opacity: isOpened || isNext ? 1 : 0.55,
      }}
      transition={{
        clipPath: {
          duration: 1.15,
          ease,
        },
        opacity: {
          duration: 0.55,
          ease,
        },
      }}
      className="absolute inset-0 overflow-hidden bg-[#e8e0d4]"
    >
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                x: startPosition.x,
                y: startPosition.y,
                scale: startPosition.scale,
                rotate: startPosition.rotate,
              }
        }
        animate={{
          x: startPosition.x * movementAmount,
          y: startPosition.y * movementAmount,

          scale: isOpened
            ? 1
            : isNext
              ? 1.035
              : startPosition.scale,

          rotate: isOpened
            ? 0
            : startPosition.rotate * movementAmount,
        }}
        transition={{
          duration: 1.45,
          ease,
        }}
        className="absolute inset-0"
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          priority={priority}
          sizes={sizes}
          draggable={false}
          className="select-none object-cover"
        />
      </motion.div>

      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-t
          from-[#50361f]/10
          via-transparent
          to-[#fff8ed]/5
        "
      />
    </motion.div>
  );
}

type ImagePanelProps = {
  item: GalleryImage;
  index: number;
  activeIndex: number;
  setPanelRef: (
    index: number,
    node: HTMLElement | null,
  ) => void;
};

function ImagePanel({
  item,
  index,
  activeIndex,
  setPanelRef,
}: ImagePanelProps) {
  const isActive = index === activeIndex;

  return (
    <article
      ref={(node) => {
        setPanelRef(index, node);
      }}
      className="
        relative h-full shrink-0
        bg-[#f5f1e9]
        w-[88vw]
        sm:w-[78vw]
        md:w-[70vw]
        lg:w-[59vw]
        xl:w-[53vw]
        2xl:w-[49vw]
      "
    >
      <div
        className="
          relative h-full
          pb-5 pt-24
          sm:pb-7 sm:pt-28
          lg:pb-8 lg:pt-28
        "
      >
        <motion.div
          initial={false}
          animate={{
            y: isActive ? 0 : 12,
            scale: isActive ? 1 : 0.985,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="
            relative h-full w-full
            overflow-visible
            bg-[#e8e0d4]
            shadow-[0_22px_65px_rgba(76,54,31,0.11)]
          "
        >
          <AnimatedImage
            item={item}
            index={index}
            activeIndex={activeIndex}
            priority={index < 2}
            sizes="
              (max-width: 639px) 88vw,
              (max-width: 767px) 78vw,
              (max-width: 1023px) 70vw,
              (max-width: 1279px) 59vw,
              53vw
            "
          />

          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0.4,
              scale: isActive ? 1 : 0.75,
              y: isActive ? [0, -7, 0] : 0,
            }}
            transition={{
              opacity: {
                duration: 0.45,
              },
              scale: {
                duration: 0.45,
                ease,
              },
              y: {
                duration: 2.6,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut",
              },
            }}
            className="
              pointer-events-none
              absolute
              -left-4
              top-1/2
              z-20
              h-10
              w-10
              -translate-y-1/2
              rounded-full
              border
              border-white/80
              bg-[#f5f1e9]/70
              backdrop-blur-md
              shadow-[0_12px_28px_rgba(84,57,31,0.13)]

              sm:-left-6
              sm:h-12
              sm:w-12

              lg:-left-7
              lg:h-14
              lg:w-14
            "
          >
            <span
              className="
                absolute
                left-full
                top-1/2
                h-px
                w-7
                -translate-y-1/2
                bg-[#b88d48]/50
                sm:w-9
              "
            />

            <span
              className="
                absolute
                -bottom-1
                -right-1
                h-3.5
                w-3.5
                rounded-full
                border
                border-white/80
                bg-[#b88d48]
                sm:h-4
                sm:w-4
              "
            />
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}

export default function DivyaDesamVillaShowcase() {

  const sectionRef =
    useRef<HTMLElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const panelRefs =
    useRef<Array<HTMLElement | null>>([]);

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    travelDistance,
    setTravelDistance,
  ] = useState(0);

  const [
    panelCenters,
    setPanelCenters,
  ] = useState<number[]>([]);

  const [
    sectionHeight,
    setSectionHeight,
  ] = useState("500vh");

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
  ] =
    useState<EnquiryFormData>(
      initialFormData,
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    formStatus,
    setFormStatus,
  ] =
    useState<FormStatus>({
      type: null,
      message: "",
    });

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start start",
        "end end",
      ],
    });

  const setPanelRef = (
    index: number,
    node: HTMLElement | null,
  ) => {
    panelRefs.current[index] = node;
  };

  const openModal = () => {
    setFormStatus({
      type: null,
      message: "",
    });

    setIsVillaSelectOpen(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;

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
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

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

    if (isSubmitting) return;

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
      setIsModalOpen(false);

      redirectToDivyaDesamThankYouPage();
    } catch (error) {
      console.error(
        "Site visit popup error:",
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
        setIsVillaSelectOpen(false);
        setIsModalOpen(false);
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

  useEffect(() => {
    const calculateDimensions =
      () => {
        const track =
          trackRef.current;

        if (!track) return;

        const viewportWidth =
          window.innerWidth;

        const trackWidth =
          track.scrollWidth;

        const horizontalTravel =
          Math.max(
            trackWidth -
              viewportWidth,
            0,
          );

        const centers =
          panelRefs.current.map(
            (panel) => {
              if (!panel) return 0;

              return (
                panel.offsetLeft +
                panel.offsetWidth / 2
              );
            },
          );

        setPanelCenters(centers);

        setTravelDistance(
          horizontalTravel,
        );

        setSectionHeight(
          `${
            window.innerHeight +
            horizontalTravel *
              1.08
          }px`,
        );
      };

    calculateDimensions();

    const resizeObserver =
      new ResizeObserver(
        calculateDimensions,
      );

    if (trackRef.current) {
      resizeObserver.observe(
        trackRef.current,
      );
    }

    panelRefs.current.forEach(
      (panel) => {
        if (panel) {
          resizeObserver.observe(
            panel,
          );
        }
      },
    );

    window.addEventListener(
      "resize",
      calculateDimensions,
    );

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        calculateDimensions,
      );
    };
  }, []);

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [
      0,
      -travelDistance,
    ],
  );

  const smoothX = useSpring(
    rawX,
    {
      stiffness: 65,
      damping: 25,
      mass: 0.68,
    },
  );

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (progress) => {
      if (
        !panelCenters.length
      ) {
        return;
      }

      const horizontalPosition =
        progress *
        travelDistance;

      const viewportCenter =
        horizontalPosition +
        window.innerWidth / 2;

      let nearestIndex = 0;

      let nearestDistance =
        Infinity;

      panelCenters.forEach(
        (
          center,
          index,
        ) => {
          const distance =
            Math.abs(
              center -
                viewportCenter,
            );

          if (
            distance <
            nearestDistance
          ) {
            nearestDistance =
              distance;

            nearestIndex =
              index;
          }
        },
      );

      setActiveIndex(
        (current) =>
          current ===
          nearestIndex
            ? current
            : nearestIndex,
      );
    },
  );

  return (
    <>
      <section
        ref={sectionRef}
        id="divya-desam-showcase"
        className="
          relative
          bg-[#f5f1e9]
        "
        style={{
          height: sectionHeight,
          backgroundColor:
            SECTION_BACKGROUND,
        }}
      >
        <div
          className="
            sticky
            top-0
            h-[100svh]
            w-full
            overflow-hidden
            bg-[#f5f1e9]
          "
        >
          <motion.div
            ref={trackRef}
            style={{
              x: smoothX,
            }}
            className="
              flex
              h-full
              w-max
              items-stretch
              gap-3

              sm:gap-4

              lg:gap-5
            "
          >
            {/* FIRST PANEL */}
            <article
              ref={(node) => {
                setPanelRef(
                  0,
                  node,
                );
              }}
              className="
                relative
                h-full
                w-screen
                shrink-0
                overflow-hidden
                bg-[#f5f1e9]
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -left-32
                  top-[44%]
                  h-[420px]
                  w-[420px]
                  -translate-y-1/2
                  rounded-full
                  bg-[#b88d48]/[0.055]
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  z-10
                  mx-auto
                  grid
                  h-full
                  w-full
                  max-w-[1600px]
                  grid-rows-[auto_minmax(0,1fr)]
                  gap-5
                  px-5
                  pb-5
                  pt-24

                  sm:px-8
                  sm:pb-7
                  sm:pt-28

                  lg:grid-cols-[0.52fr_1.48fr]
                  lg:grid-rows-1
                  lg:items-center
                  lg:gap-10
                  lg:px-14
                  lg:pb-8
                  lg:pt-28

                  xl:grid-cols-[0.5fr_1.5fr]
                  xl:gap-14
                  xl:px-20
                "
              >
                {/* LEFT */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -42,
                    filter:
                      "blur(9px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    filter:
                      "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.8,
                    ease,
                  }}
                  className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                    justify-center
                    py-4
                  "
                >
                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      gap-3

                      sm:mb-4
                    "
                  >
                    <span
                      className="
                        h-px
                        w-7
                        bg-[#b78c12]/70
                      "
                    />

                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.2,
                        duration: 0.55,
                        ease,
                      }}
                      className="
                        font-secondary
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.24em]
                        text-[#a77e11]

                        sm:text-[10px]

                        lg:text-[11px]
                      "
                    >
                      Villa, Divya Desam
                    </motion.p>
                  </div>

                  {/* Mobile / Tablet heading: exactly 2 rows */}
                  <h1
                    className="
                      max-w-[470px]
                      font-primary
                      text-[42px]
                      font-bold
                      leading-[0.92]
                      tracking-[-0.06em]
                      text-[#120e0a]

                      sm:text-[50px]

                      lg:hidden
                    "
                  >
                    <span className="block whitespace-nowrap">
                      Where Life
                    </span>

                    <span
                      className="
                        block
                        whitespace-nowrap
                        text-[#bd8d07]
                      "
                    >
                      Feels Complete
                    </span>
                  </h1>

                  {/* Desktop heading: keep existing layout */}
                  <h1
                    className="
                      hidden
                      max-w-[470px]
                      font-primary
                      font-bold
                      leading-[0.9]
                      tracking-[-0.06em]
                      text-[#120e0a]

                      lg:block
                      lg:text-[64px]

                      xl:text-[76px]
                    "
                  >
                    Where
                    <br />
                    Life
                    <br />

                    <span className="text-[#bd8d07]">
                      Feels
                      <br />
                      Complete
                    </span>
                  </h1>

                  <motion.div
                    initial={{
                      scaleX: 0,
                      opacity: 0,
                    }}
                    whileInView={{
                      scaleX: 1,
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.25,
                      duration: 0.7,
                      ease,
                    }}
                    className="
                      mt-6
                      h-px
                      w-full
                      max-w-[390px]
                      origin-left
                      bg-[#cbbda8]/65

                      sm:mt-7
                    "
                  />

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: 0.28,
                      ease,
                    }}
                    className="
                      mt-5
                      flex
                      max-w-[430px]
                      flex-wrap
                      items-end
                      justify-between
                      gap-x-5
                      gap-y-3
                    "
                  >
                    <div>
                      <p
                        className="
                          font-secondary
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-[0.15em]
                          text-[#92887d]

                          sm:text-[11px]
                        "
                      >
                        Residence
                      </p>

                      <p
                        className="
                          mt-1
                          font-secondary
                          text-[15px]
                          font-semibold
                          text-[#2a211b]

                          sm:text-[17px]

                          lg:text-[18px]
                        "
                      >
                        3 &amp; 4 BHK

                        <span
                          className="
                            ml-1
                            text-[#b78908]
                          "
                        >
                          Premium Villas
                        </span>
                      </p>
                    </div>

                    <div
                      className="
                        hidden
                        h-10
                        w-px
                        bg-[#d6ccbf]

                        sm:block
                      "
                    />

                    <div>
                      <p
                        className="
                          font-secondary
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-[0.15em]
                          text-[#92887d]

                          sm:text-[11px]
                        "
                      >
                        Starting From
                      </p>

                      <p
                        className="
                          mt-1
                          font-secondary
                          text-[15px]
                          font-semibold
                          text-[#2a211b]

                          sm:text-[17px]

                          lg:text-[18px]
                        "
                      >
                        ₹1.63 Cr

                        <span
                          className="
                            ml-1
                            text-[11px]
                            font-medium
                            text-[#81776e]

                            sm:text-[12px]
                          "
                        >
                          onwards*
                        </span>
                      </p>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <div
                    className="
                      mt-6
                      flex
                      flex-nowrap
                      items-center
                      gap-2

                      sm:mt-7
                      sm:gap-4
                    "
                  >
                    <motion.button
                      type="button"
                      onClick={openModal}
                      whileHover={{
                        y: -3,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="
                        group
                        inline-flex
                        h-[48px]
                        shrink-0
                        items-center
                        justify-center
                        gap-3
                        rounded-full
                        bg-[#ee5f24]
                        px-6
                        font-secondary
                        text-[12px]
                        font-semibold
                        text-white
                        shadow-[0_12px_30px_rgba(238,95,36,0.24)]
                        transition-all
                        duration-300

                        hover:bg-[#d9511c]
                        hover:shadow-[0_16px_34px_rgba(238,95,36,0.32)]

                        sm:h-[42px]
                        sm:px-3
                        sm:text-[12px]
                      "
                    >
                      Book a Site Visit

                      <span
                        className="
                          flex
                          h-6
                          w-6
                          items-center
                          justify-center
                          rounded-full
                          bg-white/15
                          transition-all
                          duration-300

                          group-hover:translate-x-[2px]
                          group-hover:-translate-y-[2px]
                          group-hover:bg-white/25
                        "
                      >
                        <ArrowUpRight
                          size={14}
                          strokeWidth={2}
                        />
                      </span>
                    </motion.button>

                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-1.5
                        text-[#a97d09]

                        sm:gap-2
                      "
                    >
                      <span
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#b78c12]/20
                          bg-[#b78c12]/[0.06]
                        "
                      >
                        <MapPin
                          size={15}
                          strokeWidth={1.8}
                        />
                      </span>

                      <span
                        className="
                          min-w-0
                          font-secondary
                          text-[11px]
                          font-semibold
                          leading-[1.1]

                          sm:text-[12px]
                          sm:leading-[1.2]
                        "
                      >
                        <span className="block">
                          ECR, Thiruvidandhai,
                        </span>
                        <span className="block">
                          Chennai
                        </span>
                      </span>
                    </div>
                  </div>

                  <p
                    className="
                      mt-4
                      max-w-[410px]
                      font-secondary
                      text-[9px]
                      leading-[1.5]
                      text-[#9a9188]

                      sm:text-[10px]
                    "
                  >
                    *Price is indicative and subject to
                    availability and applicable terms.
                  </p>
                </motion.div>

                {/* IMAGE */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: 48,
                    scale: 0.96,
                    filter:
                      "blur(10px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    filter:
                      "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.08,
                    ease,
                  }}
                  className="
                    relative
                    min-h-0
                    h-full
                    overflow-hidden
                    rounded-[2px]
                    bg-[#e8e0d4]
                    shadow-[0_24px_70px_rgba(76,54,31,0.12)]

                    lg:h-[73svh]
                  "
                >
                  <AnimatedImage
                    item={
                      galleryImages[0]
                    }
                    index={0}
                    activeIndex={
                      activeIndex
                    }
                    priority
                    sizes="
                      (max-width: 1023px) 100vw,
                      66vw
                    "
                  />
                </motion.div>
              </div>
            </article>

            {galleryImages
              .slice(1)
              .map(
                (
                  item,
                  arrayIndex,
                ) => {
                  const actualIndex =
                    arrayIndex + 1;

                  return (
                    <ImagePanel
                      key={item.id}
                      item={item}
                      index={
                        actualIndex
                      }
                      activeIndex={
                        activeIndex
                      }
                      setPanelRef={
                        setPanelRef
                      }
                    />
                  );
                },
              )}

            <div
              aria-hidden="true"
              className="
                h-full
                w-[7vw]
                shrink-0
                bg-[#f5f1e9]
              "
            />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.7,
              ease,
            }}
            className="
              pointer-events-none
              absolute
              bottom-5
              left-1/2
              z-50
              -translate-x-1/2

              sm:bottom-6
            "
          >
            <motion.div
              animate={{
                y: [
                  0,
                  -5,
                  0,
                ],
                scale: [
                  1,
                  1.025,
                  1,
                ],
              }}
              transition={{
                duration: 2,
                repeat:
                  Infinity,
                ease:
                  "easeInOut",
              }}
              className="
                relative
                flex
                items-center
                justify-center
                rounded-full
                border
                border-white/60
                bg-[#8b7a6b]/75
                px-5
                py-2
                backdrop-blur-md
                shadow-[0_10px_28px_rgba(78,55,33,0.18)]
              "
            >
              <span
                className="
                  font-secondary
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white

                  sm:text-[10px]
                "
              >
                Scroll
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
            aria-labelledby="site-visit-modal-title"
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
              {/* Accent */}
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
                disabled={isSubmitting}
                aria-label="Close"
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
                    id="site-visit-modal-title"
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
                    Share your details and our team will
                    contact you to schedule your visit.
                  </p>
                </div>

                {/* Form */}
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
                        htmlFor="popup-name"
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
                        id="popup-name"
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
                        htmlFor="popup-phone"
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
                        id="popup-phone"
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
                      htmlFor="popup-email"
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
                      id="popup-email"
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

                  {/* VILLA */}
                  <div>
                    <label
                      htmlFor="popup-villa"
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

                    <div className="relative w-full">
                      <select
                        id="popup-villa"
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
                          3 BHK Premium Villa
                        </option>

                        <option value="4 BHK Premium Villa">
                          4 BHK Premium Villa
                        </option>
                      </select>

                      <motion.span
                        animate={{
                          rotate: isVillaSelectOpen ? 180 : 0,
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
                          text-[#746a61]
                        "
                      >
                        <ChevronDown
                          size={17}
                          strokeWidth={2}
                        />
                      </motion.span>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label
                      htmlFor="popup-message"
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
                      id="popup-message"
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
                    By submitting, you agree to be contacted
                    regarding your Divya Desam enquiry.
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
