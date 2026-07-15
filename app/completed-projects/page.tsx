import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicInnerBanner from "@/components/DynamicInnerBanner";
import CreativeProjects from "@/components/Dynamice-Projects-main/CreativeProjects";

export default function CompletedProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <DynamicInnerBanner
          eyebrow="Completed Projects"
          image="/images/completed-projects-banner-1.png"
          imageAlt="Completed residential projects by Dev Appartments"
          description="Quality Homes Delivered, Trust Built."
          titleLines={[
            [
              {
                text: "Delivered With ",
              },
              {
                text: "Quality,",
                highlight: true,
              },
            ],
            [
              {
                text: "Trusted ",
                highlight: true,
              },
              {
                text: "Forever.",
              },
            ],
          ]}
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Completed Project",
            },
          ]}
        />


        {/* {projects section} */}
        <CreativeProjects />
      </main>

      <Footer />
    </div>
  );
}