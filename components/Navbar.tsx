"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ChevronDown,
  Menu,
  Phone,
  X,
} from "lucide-react";

type ProjectLink = {
  label: string;
  href: string;
};

type NavigationLink = {
  label: string;
  href: string;
  children?: ProjectLink[];
};

const navLinks: NavigationLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      {
        label: "Ongoing Projects",
        href: "/projects/ongoing-projects",
      },
      {
        label: "Recent Projects",
        href: "/projects/recent-projects",
      },
      {
        label: "Completed Projects",
        href: "/projects/completed-projects",
      },
    ],
  },
  {
    label: "Dream Destination",
    href: "/dream-destination",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const PHONE_NUMBER = "9840333117";
const PHONE_LINK = `tel:+91${PHONE_NUMBER}`;

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

function normalizePath(path: string): string {
  const normalizedPath = path.replace(/\/+$/, "");

  return normalizedPath || "/";
}

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] =
    useState(false);

  const currentPath = normalizePath(pathname || "/");

  const isLinkActive = (href: string): boolean => {
    const targetPath = normalizePath(href);

    if (targetPath === "/") {
      return currentPath === "/";
    }

    return (
      currentPath === targetPath ||
      currentPath.startsWith(`${targetPath}/`)
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileProjectsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMobileProjectsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
        setMobileProjectsOpen(false);
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
          mx-auto w-full max-w-[1500px]
          px-3 sm:px-5 lg:px-7
        "
      >
        <motion.div
          animate={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.97)"
              : "rgba(255,255,255,0.90)",
            boxShadow: scrolled
              ? "0 16px 45px rgba(39,26,15,0.13)"
              : "0 8px 28px rgba(39,26,15,0.07)",
          }}
          transition={{
            duration: 0.35,
            ease,
          }}
          className="
            relative
            rounded-[20px]
            border border-white/80
            backdrop-blur-xl
            lg:rounded-full
          "
        >
          <div
            className="
              pointer-events-none absolute
              left-[-70px] top-[-85px]
              h-[170px] w-[170px]
              rounded-full
              bg-[#b88d48]/10
              blur-3xl
            "
          />

          <div
            className="
              relative flex h-[62px]
              items-center justify-between
              gap-4 px-4
              sm:h-[68px] sm:px-5
              lg:h-[72px] lg:px-7
              xl:px-8
            "
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Dev Apartments home"
              className="
                relative z-20 shrink-0
                transition-transform duration-300
                hover:scale-[1.025]
                active:scale-[0.98]
              "
            >
              <img
                src="/logo.png"
                alt="Dev Apartments"
                draggable={false}
                className="
                  h-9 w-auto
                  select-none object-contain
                  sm:h-10
                  lg:h-11
                "
              />
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Primary navigation"
              className="
                absolute left-1/2
                hidden -translate-x-1/2
                items-center gap-0.5
                lg:flex
              "
            >
              {navLinks.map((link) => {
                const active = isLinkActive(
                  link.href,
                );

                if (link.children) {
                  return (
                    <div
                      key={link.href}
                      className="group relative"
                    >
                      <Link
                        href={link.href}
                        aria-current={
                          active
                            ? "page"
                            : undefined
                        }
                        className={`
                          relative flex h-10
                          items-center justify-center
                          gap-1 whitespace-nowrap
                          rounded-full px-3
                          text-[11px] font-medium
                          transition-all duration-300
                          hover:-translate-y-[1px]
                          xl:px-4
                          xl:text-[12px]

                          ${
                            active
                              ? `
                                border
                                border-[#b88d48]/45
                                bg-[#b88d48]/10
                                text-[#201710]
                              `
                              : `
                                border
                                border-transparent
                                text-[#716a63]
                                hover:text-[#201710]
                              `
                          }
                        `}
                      >
                        {link.label}

                        <ChevronDown
                          size={14}
                          strokeWidth={1.8}
                          className="
                            transition-transform
                            duration-300
                            group-hover:rotate-180
                          "
                        />
                      </Link>

                      {/* Desktop dropdown */}
                      <div
                        className="
                          invisible absolute
                          left-1/2 top-full
                          z-50 w-[235px]
                          -translate-x-1/2
                          pt-3 opacity-0
                          transition-all duration-200
                          group-hover:visible
                          group-hover:opacity-100
                        "
                      >
                        <div
                          className="
                            overflow-hidden
                            rounded-[18px]
                            border border-[#e8e0d7]
                            bg-white/95 p-2
                            shadow-[0_20px_50px_rgba(39,26,15,0.16)]
                            backdrop-blur-xl
                          "
                        >
                          {link.children.map(
                            (child) => {
                              const childActive =
                                isLinkActive(
                                  child.href,
                                );

                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`
                                    flex min-h-[48px]
                                    items-center
                                    rounded-[12px]
                                    px-4
                                    text-[13px]
                                    font-medium
                                    transition-all
                                    duration-300

                                    ${
                                      childActive
                                        ? `
                                          bg-[#b88d48]/10
                                          text-[#201710]
                                        `
                                        : `
                                          text-[#716a63]
                                          hover:bg-[#f8f4ef]
                                          hover:pl-5
                                          hover:text-[#201710]
                                        `
                                    }
                                  `}
                                >
                                  {child.label}
                                </Link>
                              );
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={
                      active
                        ? "page"
                        : undefined
                    }
                    className={`
                      relative flex h-10
                      items-center justify-center
                      whitespace-nowrap
                      rounded-full px-3
                      text-[11px] font-medium
                      transition-all duration-300
                      hover:-translate-y-[1px]
                      xl:px-4
                      xl:text-[12px]

                      ${
                        active
                          ? `
                            border
                            border-[#b88d48]/45
                            bg-[#b88d48]/10
                            text-[#201710]
                          `
                          : `
                            border
                            border-transparent
                            text-[#716a63]
                            hover:text-[#201710]
                          `
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop phone */}
            <a
              href={PHONE_LINK}
              aria-label={`Call ${PHONE_NUMBER}`}
              className="
                relative z-20 hidden
                shrink-0 items-center
                justify-center gap-2
                rounded-full
                bg-[#e8612c]
                px-4 py-2.5
                text-[12px] font-semibold
                text-white
                shadow-[0_10px_25px_rgba(232,97,44,0.28)]
                transition-all duration-300
                hover:-translate-y-[1px]
                hover:bg-[#d65322]
                active:scale-[0.97]
                lg:inline-flex
                xl:px-5
                xl:text-[13px]
              "
            >
              <Phone
                size={15}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span>{PHONE_NUMBER}</span>
            </a>

            {/* Mobile menu button */}
            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              onClick={() => {
                setMenuOpen(
                  (previous) => !previous,
                );
              }}
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="
                relative z-20 flex
                h-10 w-10 items-center
                justify-center rounded-full
                border border-[#ded6cd]
                bg-white/90
                text-[#2a2018]
                shadow-sm
                transition-all duration-300
                hover:border-[#b88d48]/50
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
                      ? "close"
                      : "menu"
                  }
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  {menuOpen ? (
                    <X size={20} />
                  ) : (
                    <Menu size={20} />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile navigation */}
          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.div
                id="mobile-navigation"
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
                <div className="px-3 pb-4 pt-3 sm:px-4">
                  <nav
                    className="flex flex-col gap-1"
                    aria-label="Mobile navigation"
                  >
                    {navLinks.map(
                      (link, index) => {
                        const active =
                          isLinkActive(link.href);

                        if (link.children) {
                          return (
                            <motion.div
                              key={link.href}
                              initial={{
                                opacity: 0,
                                x: -15,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                duration: 0.3,
                                delay:
                                  index * 0.04,
                                ease,
                              }}
                            >
                              {/* Mobile Projects button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setMobileProjectsOpen(
                                    (
                                      previous,
                                    ) =>
                                      !previous,
                                  );
                                }}
                                aria-label={
                                  mobileProjectsOpen
                                    ? "Close Projects menu"
                                    : "Open Projects menu"
                                }
                                aria-expanded={
                                  mobileProjectsOpen
                                }
                                className={`
                                  flex min-h-[52px]
                                  w-full items-center
                                  justify-between
                                  rounded-[14px]
                                  border px-4
                                  text-left
                                  text-[14px]
                                  font-medium
                                  transition-all
                                  duration-300

                                  ${
                                    active
                                      ? `
                                        border-[#b88d48]/25
                                        bg-[#b88d48]/10
                                        text-[#241a12]
                                      `
                                      : `
                                        border-transparent
                                        text-[#746d66]
                                        hover:bg-[#f8f5f1]
                                        hover:text-[#241a12]
                                      `
                                  }
                                `}
                              >
                                <span>
                                  {link.label}
                                </span>

                                <span
                                  className="
                                    flex h-9 w-9
                                    shrink-0 items-center
                                    justify-center
                                    rounded-full
                                    bg-white/70
                                  "
                                >
                                  <ChevronDown
                                    size={18}
                                    strokeWidth={1.9}
                                    className={`
                                      transition-transform
                                      duration-300

                                      ${
                                        mobileProjectsOpen
                                          ? "rotate-180"
                                          : ""
                                      }
                                    `}
                                  />
                                </span>
                              </button>

                              {/* Mobile Projects submenu */}
                              <AnimatePresence
                                initial={false}
                              >
                                {mobileProjectsOpen && (
                                  <motion.div
                                    initial={{
                                      opacity: 0,
                                      height: 0,
                                      y: -5,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      height:
                                        "auto",
                                      y: 0,
                                    }}
                                    exit={{
                                      opacity: 0,
                                      height: 0,
                                      y: -5,
                                    }}
                                    transition={{
                                      duration: 0.25,
                                      ease,
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div
                                      className="
                                        ml-4 mt-2
                                        flex flex-col gap-1
                                        border-l
                                        border-[#ded6cd]
                                        pb-1 pl-3
                                      "
                                    >
                                      {/* Main Projects page */}
                                      <Link
                                        href={
                                          link.href
                                        }
                                        onClick={() => {
                                          setMenuOpen(
                                            false,
                                          );
                                          setMobileProjectsOpen(
                                            false,
                                          );
                                        }}
                                        aria-current={
                                          currentPath ===
                                          link.href
                                            ? "page"
                                            : undefined
                                        }
                                        className={`
                                          flex
                                          min-h-[44px]
                                          items-center
                                          rounded-[12px]
                                          px-4
                                          text-[13px]
                                          font-semibold
                                          transition-all
                                          duration-300

                                          ${
                                            currentPath ===
                                            link.href
                                              ? `
                                                bg-[#b88d48]/10
                                                text-[#241a12]
                                              `
                                              : `
                                                text-[#e8612c]
                                                hover:bg-[#f8f5f1]
                                              `
                                          }
                                        `}
                                      >
                                        View All Projects
                                      </Link>

                                      {/* Inner project pages */}
                                      {link.children.map(
                                        (
                                          child,
                                        ) => {
                                          const childActive =
                                            isLinkActive(
                                              child.href,
                                            );

                                          return (
                                            <Link
                                              key={
                                                child.href
                                              }
                                              href={
                                                child.href
                                              }
                                              onClick={() => {
                                                setMenuOpen(
                                                  false,
                                                );
                                                setMobileProjectsOpen(
                                                  false,
                                                );
                                              }}
                                              aria-current={
                                                childActive
                                                  ? "page"
                                                  : undefined
                                              }
                                              className={`
                                                flex
                                                min-h-[44px]
                                                items-center
                                                rounded-[12px]
                                                px-4
                                                text-[13px]
                                                font-medium
                                                transition-all
                                                duration-300

                                                ${
                                                  childActive
                                                    ? `
                                                      bg-[#b88d48]/10
                                                      text-[#241a12]
                                                    `
                                                    : `
                                                      text-[#746d66]
                                                      hover:bg-[#f8f5f1]
                                                      hover:text-[#241a12]
                                                    `
                                                }
                                              `}
                                            >
                                              {
                                                child.label
                                              }
                                            </Link>
                                          );
                                        },
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        }

                        return (
                          <motion.div
                            key={link.href}
                            initial={{
                              opacity: 0,
                              x: -15,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              duration: 0.3,
                              delay:
                                index * 0.04,
                              ease,
                            }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => {
                                setMenuOpen(
                                  false,
                                );
                                setMobileProjectsOpen(
                                  false,
                                );
                              }}
                              aria-current={
                                active
                                  ? "page"
                                  : undefined
                              }
                              className={`
                                flex min-h-[50px]
                                items-center
                                rounded-[14px]
                                border px-4
                                text-[14px]
                                font-medium
                                transition-all
                                duration-300

                                ${
                                  active
                                    ? `
                                      border-[#b88d48]/25
                                      bg-[#b88d48]/10
                                      text-[#241a12]
                                    `
                                    : `
                                      border-transparent
                                      text-[#746d66]
                                      hover:bg-[#f8f5f1]
                                      hover:text-[#241a12]
                                    `
                                }
                              `}
                            >
                              {link.label}
                            </Link>
                          </motion.div>
                        );
                      },
                    )}
                  </nav>

                  {/* Mobile phone button */}
                  <a
                    href={PHONE_LINK}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileProjectsOpen(false);
                    }}
                    aria-label={`Call ${PHONE_NUMBER}`}
                    className="
                      mt-3 flex h-[50px]
                      items-center justify-center
                      gap-2 rounded-full
                      bg-[#e8612c]
                      text-[14px] font-semibold
                      text-white
                      shadow-[0_9px_24px_rgba(232,97,44,0.25)]
                      transition-all duration-300
                      hover:bg-[#d65322]
                      active:scale-[0.98]
                    "
                  >
                    <Phone
                      size={17}
                      strokeWidth={2}
                      aria-hidden="true"
                    />

                    Call {PHONE_NUMBER}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.header>
  );
}