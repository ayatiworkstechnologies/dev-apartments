import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getBlogsByCategory,
  getCategoryBySlug,
  sortedBlogs,
} from "@/data/blogs";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData =
    getCategoryBySlug(category);

  if (!categoryData) {
    return {
      title:
        "Category Not Found | Dev Appartments",
    };
  }

  return {
    title: `${categoryData.name} Articles | Dev Appartments`,
    description: `Explore ${categoryData.name} articles, villa buying advice and real estate insights from Dev Appartments.`,
  };
}

export default async function BlogCategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const categoryData =
    getCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  const categoryBlogs =
    getBlogsByCategory(category);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f6f3] pb-24 pt-[120px]">
        <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <Link
                href="/blog"
                className="
                  text-[11px] font-semibold
                  uppercase tracking-[0.2em]
                  text-[#a47b45]
                  transition-colors
                  hover:text-[#e8612c]
                "
              >
                ← Back to all articles
              </Link>

              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.035em] text-[#28211c] sm:text-5xl lg:text-6xl">
                {categoryData.name}
              </h1>

              <p className="mt-5 text-[15px] leading-7 text-[#756e68]">
                Showing {categoryBlogs.length} article
                {categoryBlogs.length === 1
                  ? ""
                  : "s"}{" "}
                in {categoryData.name}.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_290px]">
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                {categoryBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="
                      group overflow-hidden
                      rounded-[26px]
                      border border-[#e6ded6]
                      bg-white
                      shadow-[0_16px_45px_rgba(39,26,15,0.06)]
                      transition-all duration-500
                      hover:-translate-y-2
                      hover:border-[#c9ab7a]
                      hover:shadow-[0_26px_65px_rgba(39,26,15,0.12)]
                    "
                  >
                    <Link
                      href={`/blog/${blog.categorySlug}/${blog.slug}`}
                      className="block"
                    >
                      <div className="relative m-3 h-[270px] overflow-hidden rounded-[20px] bg-[#eee9e3]">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a47b45] backdrop-blur-md">
                          {blog.category}
                        </span>
                      </div>

                      <div className="p-6 pt-3">
                        <p className="text-[12px] font-medium text-[#938b84]">
                          {new Date(
                            blog.date,
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </p>

                        <h2 className="mt-3 text-[22px] font-semibold leading-[1.3] text-[#302922] transition-colors group-hover:text-[#a47b45]">
                          {blog.title}
                        </h2>

                        <p className="mt-4 line-clamp-3 text-[14px] leading-7 text-[#7b746d]">
                          {blog.excerpt}
                        </p>

                        <div className="mt-6 flex items-center justify-between border-t border-[#eee8e2] pt-5">
                          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#e8612c]">
                            Read article
                          </span>

                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5efe8] text-[#a47b45] transition-all group-hover:bg-[#e8612c] group-hover:text-white">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              <aside className="h-fit rounded-[24px] border border-[#e6ded6] bg-white p-6 lg:sticky lg:top-[130px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47b45]">
                  Explore
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-[#302922]">
                  Categories
                </h2>

                <div className="mt-6 space-y-2">
                  <Link
                    href="/blog"
                    className="flex items-center justify-between rounded-[14px] px-4 py-3 text-[14px] font-medium text-[#756e68] transition hover:bg-[#f8f5f1]"
                  >
                    <span>All Articles</span>
                    <span>{sortedBlogs.length}</span>
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
                        font-medium
                        transition

                        ${
                          item.slug === category
                            ? "bg-[#b88d48] text-white"
                            : "text-[#756e68] hover:bg-[#f8f5f1]"
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}