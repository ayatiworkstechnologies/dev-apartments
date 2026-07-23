import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  blogs,
  categories,
  getBlogByRoute,
  getRelatedBlogs,
  sortedBlogs,
} from "@/data/blogs";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type BlogDetailsPageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogs.map((blog) => ({
    category: blog.categorySlug,
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { category, slug } = await params;

  const blog = getBlogByRoute(category, slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Dev Appartments",
    };
  }

  return {
    title:
      blog.metaTitle ??
      `${blog.title} | Dev Appartments`,

    description:
      blog.metaDescription ?? blog.excerpt,

    openGraph: {
      title:
        blog.metaTitle ?? blog.title,

      description:
        blog.metaDescription ?? blog.excerpt,

      type: "article",

      images: [
        {
          url: blog.image,
          width: 820,
          height: 430,
          alt: blog.title,
        },
      ],
    },
  };
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { category, slug } = await params;

  const blog = getBlogByRoute(category, slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-[110px]">
        {/* Article heading */}
        <section
          className="
    px-4 py-10
    sm:px-8 sm:py-12
    lg:px-12 lg:py-14
    xl:py-16
  "
        >
          <div className="mx-auto w-full max-w-[1380px] text-center">
            {/* Meta information */}
            <div
              className="
        flex flex-wrap
        items-center justify-center
        gap-x-2 gap-y-1
        text-[10px]
        leading-5
        text-[#8c847d]

        sm:text-[12px]
      "
            >
              <Link
                href={`/blog/${blog.categorySlug}`}
                className="
          font-semibold
          text-[#a47b45]
          transition-colors
          duration-300
          hover:text-[#e8612c]
        "
              >
                {blog.category}
              </Link>

              <span aria-hidden="true">•</span>

              <span>
                {new Date(blog.date).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </span>

              <span aria-hidden="true">•</span>

              <span>By {blog.author}</span>
            </div>

            {/* Title */}      
            <h1
              className="
        mx-auto mt-4
        max-w-[1200px]
        px-1
        text-[26px]
        font-semibold
        leading-[1.14]
        tracking-[-0.035em]
        text-[#28211c]

        sm:mt-5
        sm:px-0
        sm:text-[36px]
        sm:leading-[1.12]

        md:text-[42px]

        lg:mt-6
        lg:text-[47px]
        lg:leading-[1.1]

        xl:text-[51px]
      "
            >
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p
              className="
        mx-auto mt-4
        max-w-[1200px]
        px-2
        text-[12px]
        leading-6
        text-[#756e68]

        sm:mt-5
        sm:px-0
        sm:text-[14px]
        sm:leading-7

        lg:text-[15px]
        lg:leading-8
      "
            >
              {blog.excerpt}
            </p>
          </div>
        </section>

        {/* Responsive banner */}
        <section className="px-4 sm:px-7 lg:px-10">
          <div
            className="
              relative mx-auto
              w-full
              max-w-[1400px]
              overflow-hidden
              rounded-[20px]
              border border-[#e5ddd5]
              bg-[#eee9e3]
              shadow-[0_20px_65px_rgba(39,26,15,0.12)]

              sm:rounded-[26px]

              lg:rounded-[30px]
            "
          >
            {/* Natural 820 × 430 ratio */}
            <Image
              src={blog.image}
              alt={blog.title}
              width={820}
              height={430}
              priority
              sizes="
                (max-width: 640px) calc(100vw - 32px),
                (max-width: 1024px) calc(100vw - 56px),
                1400px
              "
              className="
                block
                h-auto
                w-full
              "
            />

            {/* Soft overlay */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-t
                from-black/55
                via-black/[0.05]
                to-transparent
              "
            />

            {/* Hero content */}
            {(blog.heroLabel ||
              blog.heroText) && (
                <div
                  className="
                  absolute inset-0
                  flex items-end
                  p-4

                  sm:p-7

                  lg:p-10

                  xl:p-12
                "
                >
                  <div className="w-full max-w-4xl">
                    {blog.heroLabel && (
                      <span
                        className="
                        inline-flex
                        rounded-full
                        border border-white/50
                        bg-white/95
                        px-3 py-2
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-[#a47b45]
                        shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                        backdrop-blur-md

                        sm:px-4
                        sm:text-[10px]
                      "
                      >
                        {blog.heroLabel}
                      </span>
                    )}

                    {blog.heroText && (
                      <p
                        className="
                        mt-3
                        max-w-3xl
                        text-[16px]
                        font-semibold
                        leading-[1.3]
                        tracking-[-0.02em]
                        text-white
                        drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]

                        sm:mt-4
                        sm:text-[24px]

                        md:text-[30px]

                        lg:mt-5
                        lg:text-[38px]

                        xl:text-[42px]
                      "
                      >
                        {blog.heroText}
                      </p>
                    )}
                  </div>
                </div>
              )}
          </div>
        </section>

        {/* Content */}
        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_290px]">
            {/* Main article */}
            <article className="mx-auto w-full max-w-4xl">
              {blog.content.map(
                (block, index) => {
                  if (
                    block.type === "heading"
                  ) {
                    return (
                      <h2
                        key={`${block.type}-${index}`}
                        className="
                          mt-11
                          text-[25px]
                          font-semibold
                          leading-[1.3]
                          tracking-[-0.02em]
                          text-[#302922]
                          first:mt-0

                          sm:text-[31px]
                        "
                      >
                        {block.text}
                      </h2>
                    );
                  }

                  if (
                    block.type === "list"
                  ) {
                    return (
                      <ul
                        key={`${block.type}-${index}`}
                        className="
                          mt-5
                          list-disc
                          space-y-3
                          pl-6
                          text-[15px]
                          leading-8
                          text-[#6f6861]
                          marker:text-[#b88d48]

                          sm:text-[16px]
                        "
                      >
                        {block.items.map(
                          (item) => (
                            <li key={item}>
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                    );
                  }

                  if (
                    block.type === "image"
                  ) {
                    return (
                      <div
                        key={`${block.type}-${index}`}
                        className="
                          mt-10
                          w-full
                          overflow-hidden
                          rounded-[22px]
                          border border-[#e5ddd5]
                          bg-[#eee9e3]
                        "
                      >
                        <Image
                          src={block.src}
                          alt={block.alt}
                          width={820}
                          height={430}
                          sizes="
                            (max-width: 1024px) calc(100vw - 40px),
                            850px
                          "
                          className="
                            block
                            h-auto
                            w-full
                          "
                        />
                      </div>
                    );
                  }

                  return (
                    <p
                      key={`${block.type}-${index}`}
                      className="
                        mt-5
                        text-[15px]
                        leading-[1.95]
                        text-[#6f6861]

                        sm:text-[16px]
                      "
                    >
                      {block.text}
                    </p>
                  );
                },
              )}

              {/* Back link */}
              <div className="mt-14 border-t border-[#e9e2dc] pt-8">
                <Link
                  href="/blog"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#a47b45]
                    transition-colors
                    duration-300
                    hover:text-[#e8612c]
                  "
                >
                  ← Back to all articles
                </Link>
              </div>
            </article>

            {/* Categories */}
            <aside
              className="
                h-fit
                rounded-[24px]
                border border-[#e6ded6]
                bg-[#f8f6f3]
                p-6

                lg:sticky
                lg:top-[130px]
              "
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47b45]">
                Explore
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-[#302922]">
                Categories
              </h3>

              <div className="mt-6 space-y-2">
                <Link
                  href="/blog"
                  className="
                    flex items-center
                    justify-between
                    rounded-[14px]
                    px-4 py-3
                    text-[14px]
                    text-[#756e68]
                    transition-colors
                    duration-300
                    hover:bg-white
                  "
                >
                  <span>All Articles</span>

                  <span>
                    {sortedBlogs.length}
                  </span>
                </Link>

                {categories.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className={`
                      flex items-center
                      justify-between
                      rounded-[14px]
                      px-4 py-3
                      text-[14px]
                      transition-all
                      duration-300

                      ${item.slug ===
                        blog.categorySlug
                        ? `
                            bg-[#b88d48]
                            font-semibold
                            text-white
                          `
                        : `
                            text-[#756e68]
                            hover:bg-white
                          `
                      }
                    `}
                  >
                    <span className="min-w-0 truncate pr-3">
                      {item.name}
                    </span>

                    <span className="shrink-0">
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 rounded-[18px] bg-[#28211c] p-5 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7b37a]">
                  Looking for a home?
                </p>

                <p className="mt-3 text-[17px] font-semibold leading-[1.35]">
                  Explore Divya Desam villas.
                </p>

                <Link
                  href="/divya-desam"
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    text-[12px]
                    font-semibold
                    text-[#d7b37a]
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  View Project
                  <span aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Related blogs */}
        {relatedBlogs.length > 0 && (
          <section className="bg-[#f8f6f3] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-7xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47b45]">
                Continue Reading
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#302922] sm:text-4xl">
                Related Articles
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-3">
                {relatedBlogs.map(
                  (item) => (
                    <Link
                      key={item.id}
                      href={`/blog/${item.categorySlug}/${item.slug}`}
                      className="
                        group
                        overflow-hidden
                        rounded-[24px]
                        border border-[#e6ded6]
                        bg-white
                        transition-all
                        duration-500
                        hover:-translate-y-2
                        hover:shadow-[0_22px_55px_rgba(39,26,15,0.1)]
                      "
                    >
                      {/* Natural image ratio */}
                      <div className="w-full overflow-hidden bg-[#eee9e3]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={820}
                          height={430}
                          sizes="
                            (max-width: 768px) calc(100vw - 40px),
                            33vw
                          "
                          className="
                            block
                            h-auto
                            w-full
                            transition-transform
                            duration-700
                            group-hover:scale-[1.015]
                          "
                        />
                      </div>

                      <div className="p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a47b45]">
                          {item.category}
                        </p>

                        <h3 className="mt-3 text-[18px] font-semibold leading-[1.35] text-[#302922] transition-colors duration-300 group-hover:text-[#e8612c]">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}