import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const projects = [
  {
    number: "",
    title: "Ongoing Projects",
    subtitle: "Currently under development",
    description:
      "Explore our active residential developments designed for modern living.",
    href: "/projects/ongoing-projects",
    icon: Clock3,
  },
  {
    number: "",
    title: "Recent Projects",
    subtitle: "Our latest developments",
    description:
      "Discover recently introduced homes created with comfort and quality.",
    href: "/projects/recent-projects",
    icon: Building2,
  },
  {
    number: "",
    title: "Completed Projects",
    subtitle: "Successfully delivered",
    description:
      "View completed communities that reflect our commitment to trusted delivery.",
    href: "/projects/completed-projects",
    icon: CheckCircle2,
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#f8f6f3]">
        {/* Hero */}
        <section className="relative px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32 lg:px-12 lg:pt-36">
          <div className="pointer-events-none absolute -right-32 top-10 h-[340px] w-[340px] rounded-full bg-[#b88d48]/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-[#b88d48]/20 bg-white px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a7440] shadow-sm">
                Our Portfolio
              </span>

              <h1 className="mt-5 max-w-3xl text-[38px] font-semibold leading-[1.05] tracking-[-0.035em] text-[#28211c] sm:text-5xl lg:text-[58px]">
                Explore our residential
                <span className="block text-[#a47b45]">
                  developments
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[#756e68] sm:text-[15px] sm:leading-7">
                Discover our ongoing, recent and completed
                projects, thoughtfully created for modern
                living.
              </p>
            </div>
          </div>
        </section>

        {/* Project cards */}
        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const Icon = project.icon;

                return (
                  <Link
                    key={project.href}
                    href={project.href}
                    className="
                      group relative min-h-[320px]
                      overflow-hidden rounded-[26px]
                      border border-[#e6ded6]
                      bg-white p-6
                      shadow-[0_16px_45px_rgba(39,26,15,0.06)]
                      transition-all duration-500
                      hover:-translate-y-2
                      hover:border-[#c9ab7a]
                      hover:shadow-[0_26px_65px_rgba(39,26,15,0.12)]
                      sm:p-7
                    "
                  >
                    {/* Decorative number */}
                    <div className="pointer-events-none absolute -bottom-10 -right-3 text-[120px] font-semibold leading-none text-[#211914]/[0.035] transition-transform duration-700 group-hover:-translate-x-3">
                      {project.number}
                    </div>

                    {/* Top row */}
                    <div className="relative flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5efe8] text-[#9a7440] transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-[#b88d48] group-hover:text-white">
                        <Icon
                          size={21}
                          strokeWidth={1.7}
                        />
                      </div>

                      <span className="text-[11px] font-semibold tracking-[0.16em] text-[#b5aaa1]">
                        {project.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative mt-12">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47b45]">
                        {project.subtitle}
                      </p>

                      <h2 className="mt-3 text-[24px] font-semibold leading-tight tracking-[-0.02em] text-[#302922] sm:text-[26px]">
                        {project.title}
                      </h2>

                      <p className="mt-4 text-[14px] leading-7 text-[#7b746d]">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom action */}
                    <div className="relative mt-10 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#e8612c]">
                        View Projects
                      </span>

                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ded6ce] bg-[#faf8f5] text-[#302922] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#e8612c] group-hover:bg-[#e8612c] group-hover:text-white">
                        <ArrowUpRight
                          size={17}
                          strokeWidth={1.8}
                        />
                      </span>
                    </div>

                    {/* Hover line */}
                    <div className="absolute bottom-0 left-0 h-[4px] w-0 bg-[#e8612c] transition-all duration-500 group-hover:w-full" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}