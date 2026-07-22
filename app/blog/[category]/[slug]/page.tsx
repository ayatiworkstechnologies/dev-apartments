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

  const blog = getBlogByRoute(
    category,
    slug,
  );

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

  const blog = getBlogByRoute(
    category,
    slug,
  );

  if (!blog) {
    notFound();
  }

  const relatedBlogs =
    getRelatedBlogs(blog);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-[110px]">
        {/* Article heading */}
        <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-2 text-[12px] text-[#8c847d]">
              <Link
                href={`/blog/${blog.categorySlug}`}
                className="font-semibold text-[#a47b45] transition hover:text-[#e8612c]"
              >
                {blog.category}
              </Link>

              <span>•</span>

              <span>
                {new Date(
                  blog.date,
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <span>•</span>

              <span>By {blog.author}</span>
            </div>

            <h1 className="mx-auto mt-6 max-w-5xl text-[32px] font-semibold leading-[1.15] tracking-[-0.035em] text-[#28211c] sm:text-[44px] lg:text-[56px]">
              {blog.title}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-8 text-[#756e68]">
              {blog.excerpt}
            </p>
          </div>
        </section>

        {/* Hero */}
        <section className="px-4 sm:px-7 lg:px-10">
          <div className="relative mx-auto h-[360px] max-w-[1400px] overflow-hidden rounded-[24px] sm:h-[480px] sm:rounded-[30px] lg:h-[620px]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {(blog.heroLabel ||
              blog.heroText) && (
              <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-14">
                <div className="max-w-4xl">
                  {blog.heroLabel && (
                    <span className="inline-flex rounded-full bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a47b45] backdrop-blur-md">
                      {blog.heroLabel}
                    </span>
                  )}

                  {blog.heroText && (
                    <p className="mt-5 max-w-3xl text-[22px] font-semibold leading-[1.3] text-white sm:text-[32px] lg:text-[42px]">
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
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1fr_290px]">
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
                          mt-5 list-disc
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
                          relative mt-10
                          h-[300px]
                          overflow-hidden
                          rounded-[22px]
                          bg-[#eee9e3]
                          sm:h-[430px]
                        "
                      >
                        <Image
                          src={block.src}
                          alt={block.alt}
                          fill
                          sizes="100vw"
                          className="object-cover object-center"
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

              <div className="mt-14 border-t border-[#e9e2dc] pt-8">
                <Link
                  href="/blog"
                  className="
                    inline-flex items-center
                    gap-2
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#a47b45]
                    transition
                    hover:text-[#e8612c]
                  "
                >
                  ← Back to all articles
                </Link>
              </div>
            </article>

            {/* Categories */}
            <aside className="h-fit rounded-[24px] border border-[#e6ded6] bg-[#f8f6f3] p-6 lg:sticky lg:top-[130px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47b45]">
                Explore
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-[#302922]">
                Categories
              </h3>

              <div className="mt-6 space-y-2">
                <Link
                  href="/blog"
                  className="flex items-center justify-between rounded-[14px] px-4 py-3 text-[14px] text-[#756e68] transition hover:bg-white"
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
                      transition

                      ${
                        item.slug ===
                        blog.categorySlug
                          ? "bg-[#b88d48] font-semibold text-white"
                          : "text-[#756e68] hover:bg-white"
                      }
                    `}
                  >
                    <span>{item.name}</span>
                    <span>{item.count}</span>
                  </Link>
                ))}
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
                        group overflow-hidden
                        rounded-[24px]
                        border border-[#e6ded6]
                        bg-white
                        transition-all duration-500
                        hover:-translate-y-2
                        hover:shadow-[0_22px_55px_rgba(39,26,15,0.1)]
                      "
                    >
                      <div className="relative h-[230px] overflow-hidden bg-[#eee9e3]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a47b45]">
                          {item.category}
                        </p>

                        <h3 className="mt-3 text-[18px] font-semibold leading-[1.35] text-[#302922] transition group-hover:text-[#e8612c]">
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