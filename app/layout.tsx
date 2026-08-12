import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import FloatingContactActions from "@/components/FloatingContactActions";

export const metadata: Metadata = {
  title: "Dev Appartments — Premium Real Estate",
  description:
    "Discover beautifully crafted residential projects by Dev Appartments, Chennai.",

  // Google Search Console verification
  verification: {
    google: "unfPWd_sHzTrsc6oUHWvmUTe7DDHUzm767OkmShhFf8",
  },
};

/* =========================================================
   Breadcrumb Schema
========================================================= */

const breadcrumbSchema = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.devappartments.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://www.devappartments.com/about-us",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Projects",
      item: "https://www.devappartments.com/projects",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Ongoing projects",
      item: "https://www.devappartments.com/projects/ongoing-projects",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Recent projects",
      item: "https://www.devappartments.com/projects/recent-projects",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Completed projects",
      item: "https://www.devappartments.com/projects/completed-projects",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Dream Destination",
      item: "https://www.devappartments.com/dream-destination",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Blog",
      item: "https://www.devappartments.com/blog",
    },
    {
      "@type": "ListItem",
      position: 9,
      name: "Contact",
      item: "https://www.devappartments.com/contact",
    },
  ],
};

/* =========================================================
   Local Business Schema
========================================================= */

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Dev appartments",
  image: "https://www.devappartments.com/logo.png",
  "@id": "",
  url: "https://www.devappartments.com/",
  telephone: "9840333117",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "New No. 15/2, Old No. 7/2, First Main Road, Kasturibai Nagar, Adyar",
    addressLocality: "Chennai",
    postalCode: "600020",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: [
    "https://www.facebook.com/devappartmentss/",
    "https://www.youtube.com/@devappartments6112",
    "https://www.instagram.com/devappartments/",
    "https://www.linkedin.com/in/dev-appartments-2378151b0/",
    "https://www.devappartments.com/",
  ],
};

/* =========================================================
   Organization Schema
========================================================= */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dev appartments",
  url: "https://www.devappartments.com/",
  logo: "https://www.devappartments.com/logo.png",
  sameAs: [
    "https://www.facebook.com/devappartmentss/",
    "https://www.instagram.com/devappartments/",
    "https://www.youtube.com/@devappartments6112",
    "https://www.linkedin.com/in/dev-appartments-2378151b0/",
    "https://www.devappartments.com/",
  ],
};

/* =========================================================
   Website Schema
========================================================= */

const websiteSchema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "Dev appartments",
  url: "https://www.devappartments.com/",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://www.devappartments.com/about-us{search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
              });

              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';

              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TNB4SWFW');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Breadcrumb Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />

        {/* Local Business Schema */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />

        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Website Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TNB4SWFW"
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {children}

        <FloatingContactActions />
      </body>
    </html>
  );
}