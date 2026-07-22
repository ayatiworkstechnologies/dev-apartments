import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicInnerBanner from "@/components/DynamicInnerBanner";

import DynamicProjectsSection, {
  type DynamicProjectsHeader,
  type DynamicProjectItem,
} from "@/components/Dynamice-Projects-main/DynamicProjectsSection";

/* ======================================================
   RECENT PROJECTS SECTION HEADER
====================================================== */

const recentProjectsHeader: DynamicProjectsHeader = {
  titleLines: [
    [
      {
        text: "Showcasing ",
      },
      {
        text: "Our Landmark ",
        highlight: true,
      },
    ],
    [
      {
        text: "Projects ",

      },

    ],
  ],

  description:
    "Take a look at our latest residential projects, where modern design meets superior construction. Each development showcases our dedication to creating comfortable, elegant, and future-ready homes.",
};

/* ======================================================
   RECENT PROJECTS CONTENT
====================================================== */

const recentProjects: DynamicProjectItem[] = [
  {
    id: "dev-pristine-villa",

    title: [
      {
        text: "Dev ",
      },
      {
        text: "Pristine Villa",
        highlight: true,
      },
    ],

    description:
      "Dev Pristine Villa offers exclusive 4 BHK independent homes in Neelankarai, blending elegant design, privacy, security, and effortless coastal living.",

    details: [
      {
        label: "Location",
        value: "Neelankarai, ECR, Chennai",
      },
      {
        label: "Project Type",
        value: "Villa",
      },
    ],

    tags: [
      {
        label: "4 BHK Villa",
      },
      {
        label: "Luxury Residences",
      },
      {
        label: "2800+ Sq. Ft.",
      },
      {
        label: "Private Garden",
      },
      {
        label: "Premium Interiors",
      },
      {
        label: "Covered Car Parking",
      },
      {
        label: "Ready to Move",
      },
      {
        label: "CMDA Approved",
      },
    ],

    buttons: [
      {
        label: "Learn More",
        href: "#/recent-projects/dev-pristine-villa",
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
        src: "/images/dev-pristine-villa-01.png",
        alt: "Dev Pristine Villa in Neelankarai",
        objectPosition: "center",
      },
      {
        src: "/images/dev-pristine-villa-02.png",
        alt: "Dev Pristine Villa independent homes",
        objectPosition: "center",
      },
    ],
  },

  {
    id: "dev-peacock-enclave",

    title: [
      {
        text: "Dev ",
      },
      {
        text: "Peacock Enclave",
        highlight: true,
      },
    ],

    description:
      "Dev Peacock Enclave offers luxurious 4 BHK independent villas featuring premium interiors, landscaped surroundings, secure gated living, and convenient access to ECR and the beach.",

    details: [
      {
        label: "Location",
        value: "Neelankarai, ECR, Chennai",
      },
      {
        label: "Project Type",
        value: "Villa",
      },
    ],

    tags: [
      {
        label: "4 BHK Villa",
      },
      {
        label: "Exclusive Community",
      },
      {
        label: "Elegant Design",
      },
      {
        label: "Premium Finishes",
      },
      {
        label: "Smart Floor Plan",
      },
      {
        label: "Spacious Interiors",
      },
      {
        label: "Trusted Since 1981",
      },
    ],

    buttons: [
      {
        label: "Learn More",
        href: "#/recent-projects/dev-peacock-enclave",
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
        src: "/images/dev-peacock-enclave-1.png",
        alt: "Dev Peacock Enclave luxury villas",
        objectPosition: "center",
      },
      {
        src: "/images/dev-peacock-enclave-2.png",
        alt: "Dev Peacock Enclave residential development",
        objectPosition: "center",
      },
    ],
  },
];

/* ======================================================
   RECENT PROJECTS PAGE
====================================================== */

export default function RecentProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Recent projects banner */}
        <DynamicInnerBanner
          eyebrow="Recent Project"
          image="/images/recent-projects-banner.png"
          imageAlt="Recent residential projects by Dev Appartments"
          description="Showcasing spaces built for tomorrow."
          titleLines={[
            [
              {
                text: "Built ",
              },
              {
                text: "Today. Designed for",
                highlight: true,
              },
            ],
            [
              {
                text: "Tomorrow.",
              },
            ],
          ]}
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Recent Project",
            },
          ]}
        />

        {/* Dynamic recent projects */}
        <DynamicProjectsSection
          header={recentProjectsHeader}
          projects={recentProjects}
          accentColor="#B98A49"
          backgroundColor="#F8F8F8"
          cardColor="#FFFFFF"
        />
      </main>

      <Footer />
    </div>
  );
}