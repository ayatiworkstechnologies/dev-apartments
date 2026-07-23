import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicInnerBanner from "@/components/DynamicInnerBanner";

import DynamicProjectsSection, {
  type DynamicProjectsHeader,
  type DynamicProjectItem,
} from "@/components/Dynamice-Projects-main/DynamicProjectsSection";

/* ======================================================
   DYNAMIC SECTION HEADER CONTENT
====================================================== */

const projectsHeader: DynamicProjectsHeader = {
  titleLines: [
    [
      {
        text: "Your ",
      },
      {
        text: "Dream Address",
        highlight: true,
      },
    ],
    [
      {
        text: "Begins ",
        highlight: true,
      },
      {
        text: "Here",
      },
    ],
  ],

  description:
    "Discover premium villa plots in Vettuvankeni, where excellent connectivity, peaceful surroundings, and future-ready development come together to create the perfect setting for your dream home.",
};

/* ======================================================
   DYNAMIC PROJECT CONTENT
====================================================== */

const projects: DynamicProjectItem[] = [
  {
    id: "luxury-villa-plots",

    title: [
      {
        text: "Luxury ",
      },
      {
        text: "Villa Plots, Vettuvankeni",
        highlight: true,
      },
    ],

    description:
      "Own an approved villa plot in Vettuvankeni and build your dream home along Chennai’s prestigious ECR.",

    details: [
      {
        label: "Location",
        value: "Vettuvankeni, ECR, Chennai",
      },
      {
        label: "Project Type",
        value: "Villa Plots",
      },
    ],

    tags: [
      {
        label: "2 BHK Apartments",
      },
      {
        label: "3 BHK Apartments",
      },
      {
        label: "4 BHK Villas",
      },
      {
        label: "Gated Community",
      },
      {
        label: "World-Class Quality",
      },
      {
        label: "Trusted Builder",
      },
      {
        label: "Quality Construction",
      },
    ],

    buttons: [
      {
        label: "",
        href: "/current-projects/luxury-villa-plots",
        variant: "primary",
        showArrow: true,
      },
      {
        label: "Book Now",
        href: "/contact",
        variant: "outline",
      },
    ],

    images: [
      {
        src: "/images/luxury-villa-plots-01.png",
        alt: "Luxury villa plots in Vettuvankeni",
      },
      {
        src: "/images/luxury-villa-plots-02.png",
        alt: "Premium villa development near ECR",
      },
    ],
  },
];

/* ======================================================
   REMOVE EMPTY BUTTONS

   These will be hidden completely:

   label: ""
   label: " "
   label: "     "
====================================================== */

const filteredProjects: DynamicProjectItem[] =
  projects.map((project) => ({
    ...project,

    buttons: project.buttons?.filter(
      (button) =>
        button.label.trim().length > 0,
    ),
  }));

/* ======================================================
   PAGE
====================================================== */

export default function CurrentProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <DynamicInnerBanner
          eyebrow="Dream Destination"
          image="/images/dream-destination-banner-1.png"
          imageAlt="Modern residential villas in Dev Appartments current projects"
          description="Discover Homes Designed for Tomorrow."
          titleLines={[
            [
              {
                text: "Explore ",
              },
              {
                text: "Today’s Most",
                highlight: true,
              },
            ],
            [
              {
                text: "Promising ",
                highlight: true,
              },
              {
                text: "Addresses.",
              },
            ],
          ]}
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Dream Destination",
            },
          ]}
        />

        <DynamicProjectsSection
          header={projectsHeader}
          projects={filteredProjects}
          accentColor="#B98A49"
          backgroundColor="#F8F8F8"
          cardColor="#FFFFFF"
        />
      </main>

      <Footer />
    </div>
  );
}