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