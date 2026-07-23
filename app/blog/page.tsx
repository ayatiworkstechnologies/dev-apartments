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
import DynamicInnerBanner from "@/components/DynamicInnerBanner";

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

  const scrollToBlogSection = () => {
    const section =
      blogSectionRef.current;

    if (!section) return;

    const headerOffset = 110;

    const sectionTop =
      section.getBoundingClientRect().top +
      window.scrollY;

    window.scrollTo({
      top: sectionTop - headerOffset,
      behavior: "smooth",
    });
  };

  const handleCategoryChange = (
    categorySlug: string,
  ) => {
    setActiveCategory(categorySlug);
    setPage(1);

    window.requestAnimationFrame(() => {
      scrollToBlogSection();
    });
  };

  const goToPage = (
    pageNumber: number,
  ) => {
    const nextPage = Math.min(
      Math.max(pageNumber, 1),
      totalPages,
    );

    setPage(nextPage);

    window.requestAnimationFrame(() => {
      scrollToBlogSection();
    });
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-white">
        <DynamicInnerBanner
          eyebrow="Our Blog"
          image="/images/blog-banner.png"
          imageAlt="Dev Appartments property insights"
          description="Property insights, villa-buying guidance and practical advice for confident homebuyers."
          titleLines={[
            [
              {
                text: "Ideas for ",
              },
              {
                text: "Smarter",
                highlight: true,
              },
            ],
            [
              {
                text: "Property ",
                highlight: true,
              },
              {
                text: "Decisions.",
              },
            ],
          ]}
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Blog",
            },
          ]}
        />

        <section
          ref={blogSectionRef}
          className="
            relative bg-[#f8f6f3]
            px-4 py-14
            sm:px-7 sm:py-18
            lg:px-10 lg:py-20
            xl:px-12 xl:py-24
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -left-44 top-20
              h-[380px] w-[380px]
              rounded-full
              bg-[#b88d48]/[0.055]
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-44 bottom-20
              h-[360px] w-[360px]
              rounded-full
              bg-[#e8612c]/[0.035]
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-7xl">
            {/* Heading */}
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
                filter: "blur(7px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
                ease: smoothEase,
              }}
              className="mb-10 max-w-4xl sm:mb-12"
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

              <h1
                className="
                  mt-4 font-primary
                  text-[32px] font-black
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-[#28211c]
                  sm:text-[42px]
                  lg:text-[50px]
                "
              >
                Latest property insights
              </h1>

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
                ownership, legal verification, builder
                credibility, construction quality and
                long-term property value.
              </p>
            </motion.div>

            <div
              className="
                grid grid-cols-1
                items-start gap-10
                lg:grid-cols-[minmax(0,1fr)_300px]
                xl:gap-12
              "
            >
              {/* Blog list */}
              <div className="min-w-0">
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
                              y: 28,
                              filter:
                                "blur(7px)",
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
                          className="
                            group min-w-0
                          "
                        >
                          <Link
                            href={`/blog/${blog.categorySlug}/${blog.slug}`}
                            className="
                              flex h-full
                              min-w-0 flex-col
                              overflow-hidden
                              rounded-[26px]
                              border border-[#e6ded6]
                              bg-white
                              p-3
                              shadow-[0_14px_45px_rgba(39,26,15,0.055)]
                              transition-all duration-500
                              hover:-translate-y-2
                              hover:border-[#c9ab7a]
                              hover:shadow-[0_25px_65px_rgba(39,26,15,0.11)]
                            "
                          >
                            {/* Exact 850 × 520 image ratio */}
                            <div
                              className="
                                relative w-full
                                overflow-hidden
                                rounded-[20px]
                                bg-[#eee9e3]
                              "
                            >
                              <Image
                                src={blog.image}
                                alt={blog.title}
                                width={850}
                                height={520}
                                priority={
                                  blog.id ===
                                  visibleBlogs[0]?.id
                                }
                                sizes="
                                  (max-width: 767px) 100vw,
                                  (max-width: 1023px) 50vw,
                                  35vw
                                "
                                className="
                                  block h-auto w-full
                                  object-contain
                                  transition-transform
                                  duration-[900ms]
                                  ease-out
                                  group-hover:scale-[1.015]
                                "
                              />

                              {/* Category on right */}
                              <div
                                className="
                                  absolute right-3
                                  top-3 z-10
                                  max-w-[calc(100%-24px)]
                                  rounded-full
                                  border border-white/50
                                  bg-white/95
                                  px-3.5 py-2
                                  shadow-[0_8px_22px_rgba(0,0,0,0.08)]
                                  backdrop-blur-md
                                  sm:right-4
                                  sm:top-4
                                  sm:px-4
                                  sm:py-2.5
                                "
                              >
                                <span
                                  className="
                                    block truncate
                                    text-[8px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.15em]
                                    text-[#a47b45]
                                    sm:text-[9px]
                                  "
                                >
                                  {blog.category}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div
                              className="
                                flex flex-1
                                flex-col
                                px-3 pb-3 pt-6
                                sm:px-4 sm:pb-4
                              "
                            >
                              <div
                                className="
                                  flex flex-wrap
                                  items-center gap-2
                                  text-[11px]
                                  font-medium
                                  text-[#958d85]
                                "
                              >
                                <span>
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
                                </span>

                                <span className="text-[#c5a66f]">
                                  •
                                </span>

                                <span>
                                  {blog.author}
                                </span>
                              </div>

                              <h2
                                className="
                                  mt-3 line-clamp-3
                                  font-primary
                                  text-[20px]
                                  font-bold
                                  leading-[1.3]
                                  tracking-[-0.02em]
                                  text-[#302922]
                                  transition-colors
                                  duration-300
                                  group-hover:text-[#a47b45]
                                  sm:text-[21px]
                                "
                              >
                                {blog.title}
                              </h2>

                              <p
                                className="
                                  mt-4 line-clamp-3
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
                                  mt-6 flex
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
                                    shrink-0 items-center
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
                      bg-white px-6 py-16
                      text-center
                    "
                  >
                    <h2 className="text-2xl font-semibold text-[#302922]">
                      No articles found
                    </h2>

                    <p className="mt-3 text-[14px] text-[#756e68]">
                      No articles are currently available
                      in this category.
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
                        font-semibold text-white
                        transition-colors
                        hover:bg-[#d65322]
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
                        border border-[#ddd5cd]
                        bg-white
                        text-[#514941]
                        transition-all duration-300
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
                            rounded-full border
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
                        border border-[#ddd5cd]
                        bg-white
                        text-[#514941]
                        transition-all duration-300
                        hover:border-[#b88d48]
                        hover:text-[#b88d48]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <ArrowRight size={16} />
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
                    mt-3 font-primary
                    text-[27px] font-bold
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
                          <span className="min-w-0 truncate pr-3">
                            {category.name}
                          </span>

                          <span
                            className={`
                              flex min-w-7
                              shrink-0
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
                    Explore Divya Desam villas.
                  </p>

                  <Link
                    href="/divya-desam"
                    className="
                      mt-4 inline-flex
                      items-center gap-2
                      text-[12px]
                      font-semibold
                      text-[#d7b37a]
                      transition-colors
                      hover:text-white
                    "
                  >
                    View Project

                    <ArrowRight size={14} />
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