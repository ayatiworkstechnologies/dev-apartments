import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PushpaAveScrollShowcase from "../components/Projects/PushpaAveScrollShowcase";
import Gallery from "../components/Gallery";
import ExquisiteLivingSection from "../components/Projects/ExquisiteLivingSection";
import ProjectHighlightsSection from "../components/Projects/ProjectHighlightsSection";
import Highlights from "../components/Projects/Highlights";
import FloorPlans from "../components/Projects/FloorPlans";
import LocationSection from "../components/Projects/LocationSection";

export default function PushpaAvePage() {
  return (
    <>
      <Navbar />

      <main >
        {/* Pushpa Avenue page content */}
        <PushpaAveScrollShowcase />

        <ExquisiteLivingSection />

        <ProjectHighlightsSection />

        <Highlights />

        <FloorPlans />

        <Gallery />

        <LocationSection />
      </main>

      <Footer />
    </>
  );
}