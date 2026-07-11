import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import DynamicInnerBanner from "@/components/DynamicInnerBanner";
import StartConversation from "@/components/Contact-us/StartConversation";
import ContactConnectForm from "@/components/Contact-us/ContactConnectForm";
import FindUsHereSection from "@/components/Contact-us/FindUsHereSection";

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main>
                {/* About Us content */}

                <DynamicInnerBanner
                    eyebrow="Contact Us"
                    image="/images/contact-banner.png"
                    imageAlt="Contact Dev Appartments"
                    description="Reach Out. Find Your Home."
                    titleLines={[
                        [
                            {
                                text: "Let’s Create Your ",
                            },
                            {
                                text: "Dream Home",
                                highlight: true,
                                
                            },
                        ],
                        [
                            {
                                text: "Together.",
                            },
                        ],
                    ]}
                    breadcrumbs={[
                        {
                            label: "Home",
                            href: "/",
                        },
                        {
                            label: "Contact Us",
                        },
                    ]}
                />


                {/* {start conversation section} */}
                <StartConversation />

                {/* {lets connection section} */}
                <ContactConnectForm />

                {/* {map section } */}
                <FindUsHereSection />



            </main>

            <Footer />
        </div>
    );
}