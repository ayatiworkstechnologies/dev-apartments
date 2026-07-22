"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import {
  categories,
  sortedBlogs,
} from "@/data/blogs";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BLOGS_PER_PAGE = 6;

const smoothEase: [
  number,
  number,
  number,
  number,
] = [0.16, 1, 0.3, 1];

export default function BlogPage() {
  const blogSectionRef =
    useRef<HTMLElement>(null);

  const [page, setPage] = useState(1);
  const [
    activeCategory,
    setActiveCategory,
  ] = useState("all");

  const filteredBlogs = useMemo(() => {
    if (activeCategory === "all") {
      return sortedBlogs;
    }

    return sortedBlogs.filter(
      (blog) =>
        blog.categorySlug ===
        activeCategory,
    );
  }, [activeCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredBlogs.length /
        BLOGS_PER_PAGE,
    ),
  );

  const visibleBlogs = filteredBlogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE,
  );

  const scrollToBlogs = () => {
    const element =
      blogSectionRef.current;

    if (!element) return;

    const headerOffset = 110;
    const elementPosition =
      element.getBoundingClientRect().top +
      window.scrollY;

    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: "smooth",
    });
  };

  const handleCategoryChange = (
    categorySlug: string,
  ) => {
    setActiveCategory(categorySlug);
    setPage(1);

    window.requestAnimationFrame(
      scrollToBlogs,
    );
  };

  const goToPage = (
    pageNumber: number,
  ) => {
    const safePage = Math.min(
      Math.max(pageNumber, 1),
      totalPages,
    );

    setPage(safePage);

    window.requestAnimationFrame(
      scrollToBlogs,
    );
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#f8f6f3]">
        {/* Blog hero */}
        <section
          className="
            relative
            px-5 pb-14 pt-32
            sm:px-8 sm:pb-16 sm:pt-36
            lg:px-12 lg:pb-20 lg:pt-44
          "
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-40 top-10
              h-[420px] w-[420px]
              rounded-full
              bg-[#b88d48]/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -left-44 bottom-0
              h-[340px] w-[340px]
              rounded-full
              bg-[#e8612c]/[0.05]
              blur-3xl
            "
          />

          <div
            className="
              relative mx-auto
              grid max-w-7xl
              items-center gap-10
              lg:grid-cols-[0.88fr_1.12fr]
              lg:gap-16
            "
          >
            {/* Hero content */}
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.85,
                ease: smoothEase,
              }}
            >
              <span
                className="
                  inline-flex rounded-full
                  border border-[#b88d48]/20
                  bg-white px-4 py-2
                  text-[10px] font-semibold
                  uppercase tracking-[0.22em]
                  text-[#9a7440]
                  shadow-sm
                "
              >
                Dev Appartments Blog
              </span>

              <h1
                className="
                  mt-6 max-w-3xl
                  font-primary
                  text-[38px] font-black
                  leading-[1.06]
                  tracking-[-0.04em]
                  text-[#28211c]
                  sm:text-5xl
                  lg:text-[58px]
                "
              >
                Ideas for smarter
                <span className="block text-[#b88d48]">
                  home investments
                </span>
              </h1>

              <p
                className="
                  mt-5 max-w-2xl
                  font-secondary
                  text-[14px] leading-7
                  text-[#756e68]
                  sm:text-[15px]
                  sm:leading-8
                "
              >
                Explore villa-buying guidance,
                real estate insights, construction
                advice and practical information
                created to help you make confident
                property decisions.
              </p>

              <button
                type="button"
                onClick={scrollToBlogs}
                className="
                  group mt-7 inline-flex
                  min-h-[46px]
                  items-center justify-center
                  gap-2 rounded-full
                  bg-[#e8612c]
                  px-6
                  text-[13px] font-semibold
                  text-white
                  shadow-[0_12px_28px_rgba(232,97,44,0.22)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-[#d65322]
                "
              >
                Explore Articles

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{
                opacity: 0,
                x: 35,
                scale: 0.97,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: smoothEase,
              }}
              className="
                relative h-[300px]
                overflow-hidden
                rounded-[24px]
                bg-[#e9e2da]
                shadow-[0_22px_65px_rgba(39,26,15,0.12)]
                sm:h-[390px]
                sm:rounded-[30px]
                lg:h-[470px]
              "
            >
              <Image
                src="/images/blogs/villa-buyers-guide.jpg"
                alt="Dev Appartments villa buying guide"
                fill
                priority
                sizes="
                  (max-width: 1024px) 100vw,
                  55vw
                "
                className="
                  object-cover object-center
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/55
                  via-black/[0.08]
                  to-transparent
                "
              />

              <div
                className="
                  absolute bottom-5
                  left-5 right-5
                  rounded-[18px]
                  border border-white/30
                  bg-white/90 p-5
                  shadow-xl
                  backdrop-blur-xl
                  sm:bottom-7
                  sm:left-7 sm:right-7
                  sm:p-6
                "
              >
                <p
                  className="
                    text-[10px]
                    font-semibold uppercase
                    tracking-[0.18em]
                    text-[#a47b45]
                  "
                >
                  Featured Guide
                </p>

                <p
                  className="
                    mt-2 max-w-xl
                    text-[18px] font-semibold
                    leading-[1.3]
                    text-[#302922]
                    sm:text-[23px]
                  "
                >
                  The Smart Buyer&apos;s Guide
                  to Buying a Villa
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog listing */}
        <section
          ref={blogSectionRef}
          className="
            relative px-5 pb-24
            sm:px-8
            lg:px-12 lg:pb-32
          "
        >
          <div className="relative mx-auto max-w-7xl">
            {/* Section heading */}
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                filter: "blur(7px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.8,
                ease: smoothEase,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="
                mb-10 max-w-4xl
                sm:mb-12
              "
            >
              <p
                className="
                  text-[10px] font-semibold
                  uppercase tracking-[0.22em]
                  text-[#a47b45]
                "
              >
                Knowledge &amp; Guidance
              </p>

              <h2
                className="
                  mt-4
                  font-primary
                  text-[30px] font-black
                  leading-[1.12]
                  tracking-[-0.035em]
                  text-[#28211c]
                  sm:text-[40px]
                  lg:text-[48px]
                "
              >
                Latest property insights
              </h2>

              <p
                className="
                  mt-4 max-w-3xl
                  font-secondary
                  text-[14px] leading-7
                  text-[#756e68]
                  sm:text-[15px]
                "
              >
                Helpful articles covering villa
                ownership, legal verification,
                builder credibility, construction
                quality and long-term property value.
              </p>
            </motion.div>

            <div
              className="
                grid grid-cols-1
                items-start gap-10
                lg:grid-cols-[1fr_300px]
                xl:gap-12
              "
            >
              {/* Blog content */}
              <div>
                {visibleBlogs.length > 0 ? (
                  <motion.div
                    key={`${activeCategory}-${page}`}
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.12,
                        },
                      },
                    }}
                    className="
                      grid grid-cols-1
                      gap-7 md:grid-cols-2
                    "
                  >
                    {visibleBlogs.map(
                      (blog) => (
                        <motion.article
                          key={blog.id}
                          variants={{
                            hidden: {
                              opacity: 0,
                              y: 30,
                              filter:
                                "blur(8px)",
                            },
                            show: {
                              opacity: 1,
                              y: 0,
                              filter:
                                "blur(0px)",
                              transition: {
                                duration: 0.75,
                                ease:
                                  smoothEase,
                              },
                            },
                          }}
                          className="group"
                        >
                          <Link
                            href={`/blog/${blog.categorySlug}/${blog.slug}`}
                            className="
                              block h-full
                              overflow-hidden
                              rounded-[26px]
                              border border-[#e6ded6]
                              bg-white
                              shadow-[0_14px_45px_rgba(39,26,15,0.055)]
                              transition-all duration-500
                              hover:-translate-y-2
                              hover:border-[#c9ab7a]
                              hover:shadow-[0_25px_65px_rgba(39,26,15,0.11)]
                            "
                          >
                            {/* Card image */}
                            <div
                              className="
                                relative m-3
                                h-[240px]
                                overflow-hidden
                                rounded-[20px]
                                bg-[#eee9e3]
                                sm:h-[280px]
                              "
                            >
                              <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                sizes="
                                  (max-width: 768px)
                                  100vw,
                                  50vw
                                "
                                className="
                                  object-cover
                                  object-center
                                  transition-transform
                                  duration-[900ms]
                                  ease-out
                                  group-hover:scale-105
                                "
                              />

                              <div
                                aria-hidden="true"
                                className="
                                  absolute inset-0
                                  bg-gradient-to-t
                                  from-black/65
                                  via-black/[0.05]
                                  to-transparent
                                "
                              />

                              <div
                                className="
                                  absolute left-4
                                  top-4
                                  rounded-full
                                  border border-white/40
                                  bg-white/90
                                  px-3.5 py-2
                                  backdrop-blur-md
                                "
                              >
                                <span
                                  className="
                                    text-[9px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.16em]
                                    text-[#a47b45]
                                  "
                                >
                                  {blog.category}
                                </span>
                              </div>

                              <div
                                className="
                                  absolute bottom-4
                                  left-4 right-4
                                "
                              >
                                <p
                                  className="
                                    text-[11px]
                                    font-medium
                                    text-white/85
                                  "
                                >
                                  {new Date(
                                    blog.date,
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month:
                                        "long",
                                      year: "numeric",
                                    },
                                  )}

                                  <span className="mx-2 text-[#d7b37a]">
                                    •
                                  </span>

                                  {blog.author}
                                </p>
                              </div>
                            </div>

                            {/* Card content */}
                            <div
                              className="
                                flex h-[calc(100%-264px)]
                                flex-col
                                px-6 pb-6 pt-3
                              "
                            >
                              <h3
                                className="
                                  font-primary
                                  text-[21px]
                                  font-bold
                                  leading-[1.28]
                                  tracking-[-0.02em]
                                  text-[#302922]
                                  transition-colors
                                  duration-300
                                  group-hover:text-[#a47b45]
                                "
                              >
                                {blog.title}
                              </h3>

                              <p
                                className="
                                  mt-4
                                  line-clamp-3
                                  font-secondary
                                  text-[14px]
                                  leading-7
                                  text-[#756e68]
                                "
                              >
                                {blog.excerpt}
                              </p>

                              <div
                                className="
                                  mt-auto flex
                                  items-center
                                  justify-between
                                  border-t
                                  border-[#eee8e2]
                                  pt-5
                                "
                              >
                                <span
                                  className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#e8612c]
                                  "
                                >
                                  Read Article
                                </span>

                                <span
                                  className="
                                    flex h-9 w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#f5efe8]
                                    text-[#a47b45]
                                    transition-all
                                    duration-300
                                    group-hover:bg-[#e8612c]
                                    group-hover:text-white
                                  "
                                >
                                  <ArrowRight
                                    size={15}
                                  />
                                </span>
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      ),
                    )}
                  </motion.div>
                ) : (
                  <div
                    className="
                      rounded-[26px]
                      border border-[#e6ded6]
                      bg-white
                      px-6 py-16
                      text-center
                    "
                  >
                    <h3
                      className="
                        text-2xl font-semibold
                        text-[#302922]
                      "
                    >
                      No articles found
                    </h3>

                    <p
                      className="
                        mt-3 text-[14px]
                        text-[#756e68]
                      "
                    >
                      There are currently no
                      articles available in this
                      category.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleCategoryChange(
                          "all",
                        )
                      }
                      className="
                        mt-6 rounded-full
                        bg-[#e8612c]
                        px-6 py-3
                        text-[13px]
                        font-semibold
                        text-white
                      "
                    >
                      View All Articles
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div
                    className="
                      mt-12 flex flex-wrap
                      items-center
                      justify-center gap-2
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        goToPage(page - 1)
                      }
                      disabled={page === 1}
                      aria-label="Previous page"
                      className="
                        flex h-10 w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#ddd5cd]
                        bg-white
                        text-[#514941]
                        transition-all
                        duration-300
                        hover:border-[#b88d48]
                        hover:text-[#b88d48]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <ArrowLeft size={16} />
                    </button>

                    {Array.from({
                      length: totalPages,
                    }).map((_, index) => {
                      const pageNumber =
                        index + 1;

                      const isActive =
                        page === pageNumber;

                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() =>
                            goToPage(
                              pageNumber,
                            )
                          }
                          aria-current={
                            isActive
                              ? "page"
                              : undefined
                          }
                          className={`
                            flex h-10 w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            text-[13px]
                            font-semibold
                            transition-all
                            duration-300

                            ${
                              isActive
                                ? `
                                  border-[#b88d48]
                                  bg-[#b88d48]
                                  text-white
                                `
                                : `
                                  border-[#ddd5cd]
                                  bg-white
                                  text-[#514941]
                                  hover:border-[#b88d48]
                                  hover:text-[#b88d48]
                                `
                            }
                          `}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() =>
                        goToPage(page + 1)
                      }
                      disabled={
                        page === totalPages
                      }
                      aria-label="Next page"
                      className="
                        flex h-10 w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#ddd5cd]
                        bg-white
                        text-[#514941]
                        transition-all
                        duration-300
                        hover:border-[#b88d48]
                        hover:text-[#b88d48]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <ArrowRight
                        size={16}
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* Categories */}
              <motion.aside
                initial={{
                  opacity: 0,
                  y: 28,
                  filter: "blur(7px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.8,
                  ease: smoothEase,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                className="
                  h-fit self-start
                  rounded-[24px]
                  border border-[#e6ded6]
                  bg-white p-6
                  shadow-[0_14px_45px_rgba(39,26,15,0.045)]
                  lg:sticky
                  lg:top-[130px]
                "
              >
                <p
                  className="
                    text-[10px]
                    font-semibold uppercase
                    tracking-[0.2em]
                    text-[#a47b45]
                  "
                >
                  Browse By
                </p>

                <h2
                  className="
                    mt-3
                    font-primary
                    text-[27px]
                    font-bold
                    tracking-[-0.025em]
                    text-[#302922]
                  "
                >
                  Categories
                </h2>

                <div className="mt-6 space-y-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryChange(
                        "all",
                      )
                    }
                    className={`
                      flex w-full
                      items-center
                      justify-between
                      rounded-[14px]
                      px-4 py-3.5
                      text-left
                      text-[14px]
                      font-medium
                      transition-all
                      duration-300

                      ${
                        activeCategory ===
                        "all"
                          ? `
                            bg-[#b88d48]
                            text-white
                          `
                          : `
                            bg-[#f8f5f1]
                            text-[#756e68]
                            hover:bg-[#f2ece6]
                            hover:text-[#302922]
                          `
                      }
                    `}
                  >
                    <span>All Articles</span>

                    <span
                      className={`
                        flex min-w-7
                        items-center
                        justify-center
                        rounded-full
                        px-2 py-1
                        text-[11px]

                        ${
                          activeCategory ===
                          "all"
                            ? "bg-white/15"
                            : "bg-white"
                        }
                      `}
                    >
                      {sortedBlogs.length}
                    </span>
                  </button>

                  {categories.map(
                    (category) => {
                      const isActive =
                        activeCategory ===
                        category.slug;

                      return (
                        <button
                          key={category.slug}
                          type="button"
                          onClick={() =>
                            handleCategoryChange(
                              category.slug,
                            )
                          }
                          className={`
                            flex w-full
                            items-center
                            justify-between
                            rounded-[14px]
                            px-4 py-3.5
                            text-left
                            text-[14px]
                            font-medium
                            transition-all
                            duration-300

                            ${
                              isActive
                                ? `
                                  bg-[#b88d48]
                                  text-white
                                `
                                : `
                                  bg-[#f8f5f1]
                                  text-[#756e68]
                                  hover:bg-[#f2ece6]
                                  hover:text-[#302922]
                                `
                            }
                          `}
                        >
                          <span>
                            {category.name}
                          </span>

                          <span
                            className={`
                              flex min-w-7
                              items-center
                              justify-center
                              rounded-full
                              px-2 py-1
                              text-[11px]

                              ${
                                isActive
                                  ? "bg-white/15"
                                  : "bg-white"
                              }
                            `}
                          >
                            {category.count}
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>

                <div
                  className="
                    mt-6 rounded-[18px]
                    bg-[#28211c]
                    p-5 text-white
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-semibold uppercase
                      tracking-[0.18em]
                      text-[#d7b37a]
                    "
                  >
                    Looking for a home?
                  </p>

                  <p
                    className="
                      mt-3 text-[17px]
                      font-semibold
                      leading-[1.35]
                    "
                  >
                    Explore Divya Desam
                    villas.
                  </p>

                  <Link
                    href="/divya-desam"
                    className="
                      mt-4 inline-flex
                      items-center gap-2
                      text-[12px]
                      font-semibold
                      text-[#d7b37a]
                      transition
                      hover:text-white
                    "
                  >
                    View Project

                    <ArrowRight
                      size={14}
                    />
                  </Link>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}