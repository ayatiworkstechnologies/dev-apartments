import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurHistory from "@/components/About-us/OurHistory";
import FoundersDesk from "@/components/About-us/FoundersDesk";
import VisionMission from "@/components/About-us/VisionMission";
import DynamicInnerBanner from "@/components/DynamicInnerBanner";

export default function AboutUsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main>
                {/* About Us content */}

                <DynamicInnerBanner
                    eyebrow="About"
                    image="/images/about-banner-1.png"
                    imageAlt="Modern Dev Appartments residential community"
                    description="Comfort. Style. Space. Life. Elevated."
                    titleLines={[
                        [
                            {
                                text: "Where ",
                            },
                            {
                                text: "Comfort Meets",
                                highlight: true,
                            },
                        ],
                        [
                            {
                                text: "Contemporary",
                                highlight: true,
                            },
                            {
                                text: " Living.",
                            },
                        ],
                    ]}
                    breadcrumbs={[
                        {
                            label: "Home",
                            href: "/",
                        },
                        {
                            label: "About",
                        },
                    ]}
                />

                {/* {Ourstory section} */}
                <OurHistory />
                {/* {founder section} */}
                <FoundersDesk />
                {/* {vision and mission section} */}
                <VisionMission />
            </main>

            <Footer />
        </div>
    );
}