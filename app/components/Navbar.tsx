"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  {
    label: "Home",
    href: "#",
  },
  {
    label: "About Us",
    href: "#about",
  },
  {
    label: "Current Projects",
    href: "#projects",
  },
  {
    label: "Recent Projects",
    href: "#recent",
  },
  {
    label: "Completed Projects",
    href: "#completed",
  },
];

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Close menu on outside click */
  useEffect(() => {
    if (!menuOpen) return;

    const handler = (event: MouseEvent) => {
      const header = document.getElementById(
        "site-header",
      );

      if (
        header &&
        !header.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener(
        "mousedown",
        handler,
      );
    };
  }, [menuOpen]);

  /* Close menu using Escape */
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [menuOpen]);

  /* Close menu when entering desktop width */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  return (
    <motion.header
      id="site-header"
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.7,
        ease,
      }}
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500

        ${
          scrolled
            ? "py-2 sm:py-3"
            : "py-3 sm:py-4"
        }
      `}
    >
      <div
        className="
          mx-auto w-full max-w-[1440px]
          px-3 sm:px-5 lg:px-8
        "
      >
        <motion.div
          animate={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.96)"
              : "rgba(255,255,255,0.88)",

            boxShadow: scrolled
              ? "0 16px 45px rgba(39,26,15,0.13)"
              : "0 8px 28px rgba(39,26,15,0.07)",
          }}
          transition={{
            duration: 0.35,
            ease,
          }}
          className="
            relative overflow-hidden
            rounded-[20px]
            border border-white/80
            backdrop-blur-xl
            lg:rounded-full
          "
        >
          {/* Soft gold background glow */}
          <div
            className="
              pointer-events-none absolute
              left-[-70px] top-[-85px]
              h-[170px] w-[170px]
              rounded-full bg-[#b88d48]/10
              blur-3xl
            "
          />

          {/* Navbar row */}
          <div
            className="
              relative flex h-[62px]
              items-center justify-between
              gap-4 px-4

              sm:h-[68px]
              sm:px-5

              md:px-6

              lg:h-[72px]
              lg:px-7

              xl:px-9
            "
          >
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{
                scale: 1.025,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="relative z-10 shrink-0"
              aria-label="Dev Appartments home"
            >
              <img
                src="/logo.png"
                alt="Dev Appartments"
                draggable={false}
                className="
                  h-9 w-auto
                  select-none object-contain

                  sm:h-10
                  lg:h-11
                "
              />
            </motion.a>

            {/* Desktop navigation: laptop and larger only */}
            <nav
              className="
                absolute left-1/2
                hidden -translate-x-1/2
                items-center gap-1
                lg:flex
              "
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => {
                const isActive =
                  active === link.label;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() =>
                      setActive(link.label)
                    }
                    whileHover={{
                      y: -1,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className={`
                      relative flex h-10
                      items-center justify-center
                      whitespace-nowrap rounded-full
                      px-4

                      text-[12px] font-medium
                      transition-colors duration-300

                      xl:px-5
                      xl:text-[13px]

                      ${
                        isActive
                          ? "text-[#201710]"
                          : "text-[#716a63] hover:text-[#201710]"
                      }
                    `}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 28,
                        }}
                        className="
                          absolute inset-0
                          rounded-full
                          border border-[#b88d48]/45
                          bg-[#b88d48]/10
                          shadow-[0_5px_16px_rgba(184,141,72,0.10)]
                        "
                      />
                    )}

                    <span className="relative z-10">
                      {link.label}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            {/* Desktop contact button */}
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.04,
                y: -1,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 18,
              }}
              className="
                hidden shrink-0 items-center
                justify-center rounded-full

                bg-[#e8612c]
                px-6 py-2.5

                text-[13px] font-semibold
                text-white

                shadow-[0_10px_25px_rgba(232,97,44,0.28)]

                transition-colors duration-300
                hover:bg-[#d65322]

                lg:inline-flex
              "
            >
              Contact
            </motion.a>

            {/* Mobile and tablet hamburger */}
            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              onClick={() =>
                setMenuOpen((previous) => !previous)
              }
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="responsive-navigation"
              className="
                relative z-10 flex
                h-10 w-10 items-center
                justify-center rounded-full

                border border-[#ded6cd]
                bg-white/85 text-[#2a2018]

                shadow-[0_6px_18px_rgba(0,0,0,0.06)]

                transition-all duration-300

                hover:border-[#b88d48]/60
                hover:bg-[#b88d48]/10

                lg:hidden
              "
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.span
                  key={
                    menuOpen
                      ? "close-icon"
                      : "menu-icon"
                  }
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.6,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  {menuOpen ? (
                    <X
                      size={20}
                      strokeWidth={1.9}
                    />
                  ) : (
                    <Menu
                      size={20}
                      strokeWidth={1.9}
                    />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile and tablet menu */}
          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.div
                id="responsive-navigation"
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease,
                }}
                className="
                  overflow-hidden
                  border-t border-[#ece6df]
                  bg-white/95
                  lg:hidden
                "
              >
                <div
                  className="
                    px-3 pb-4 pt-3
                    sm:px-4 sm:pb-5
                  "
                >
                  <nav
                    className="flex flex-col gap-1"
                    aria-label="Responsive navigation"
                  >
                    {navLinks.map(
                      (link, index) => {
                        const isActive =
                          active === link.label;

                        return (
                          <motion.a
                            key={link.label}
                            href={link.href}
                            onClick={() => {
                              setActive(link.label);
                              setMenuOpen(false);
                            }}
                            initial={{
                              opacity: 0,
                              x: -18,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.045,
                              ease,
                            }}
                            className={`
                              flex min-h-[50px]
                              items-center
                              rounded-[14px]
                              px-4

                              text-[14px] font-medium

                              transition-all duration-300

                              ${
                                isActive
                                  ? "bg-[#b88d48]/10 text-[#241a12]"
                                  : "text-[#746d66] hover:bg-[#f8f5f1] hover:text-[#241a12]"
                              }
                            `}
                          >
                            {link.label}
                          </motion.a>
                        );
                      },
                    )}
                  </nav>

                  {/* Responsive contact button */}
                  <motion.a
                    href="#contact"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    initial={{
                      opacity: 0,
                      y: 14,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: 0.2,
                      ease,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      mt-3 flex h-[50px]
                      items-center justify-center
                      rounded-full

                      bg-[#e8612c]

                      text-[14px] font-semibold
                      text-white

                      shadow-[0_9px_24px_rgba(232,97,44,0.25)]

                      transition-colors duration-300
                      hover:bg-[#d65322]
                    "
                  >
                    Contact Us
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.header>
  );
}