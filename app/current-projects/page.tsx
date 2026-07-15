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
        text: " Your  ",
      },
      {
        text: "Future Home ",
        highlight: true,
      },
    ],
    [
      {
        text: " Is Taking ",
        highlight: true,
      },
      {
        text: "Shape",
      },
    ],
  ],

  description:
    "Be among the first to discover our ongoing residential developments. Thoughtfully designed with premium features and quality construction, these homes are crafted for comfort, convenience, and long-term value.",
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
        label: "Learn More",
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
        src: "/images/luxury-villa-plots-1.png",
        alt: "Luxury villa plots in Vettuvankeni",
      },
      {
        src: "/images/luxury-villa-plots-2.png",
        alt: "Premium villa development near ECR",
      },
    ],
  },

  {
    id: "divya-desam",

    title: [
      {
        text: "Divya ",
      },
      {
        text: "Desam",
        highlight: true,
      },
    ],

    description:
      "Wake up to spacious living, enjoy peaceful surroundings, and create lasting memories in a villa designed for modern family life. Comfort today, value for years to come.",

    details: [
      {
        label: "Location",
        value: "ECR, Chennai",
      },
      {
        label: "Project Type",
        value: "Villa",
      },
    ],

    tags: [
      {
        label: "High-Quality Materials",
      },
      {
        label: "Community Living",
      },
      {
        label: "Exclusive Community",
      },
      {
        label: "CCTV Security",
      },
      {
        label: "24×7 Security",
      },
      {
        label: "Visitor Parking",
      },
      {
        label: "Covered Parking",
      },
      {
        label: "Power Backup",
      },
    ],

    buttons: [
      {
        label: "Learn More",
        href: "/divya-desam",
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
        src: "/images/divya-desam-current-projects-banner.png",
        alt: "Divya Desam premium villa",
      },
      {
        src: "/images/divya-desam-residential-development.png",
        alt: "Divya Desam residential development",
      },
    ],
  },
];

/* ======================================================
   PAGE
====================================================== */

export default function CurrentProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <DynamicInnerBanner
          eyebrow="Current Projects"
          image="/images/currentprojects-banner.png"
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
              label: "Current Projects",
            },
          ]}
        />

        <DynamicProjectsSection
          header={projectsHeader}
          projects={projects}
          accentColor="#B98A49"
          backgroundColor="#F8F8F8"
          cardColor="#FFFFFF"
        />
      </main>

      <Footer />
    </div>
  );
}