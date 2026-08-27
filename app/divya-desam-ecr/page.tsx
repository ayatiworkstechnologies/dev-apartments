

import DivyaDesamFloatingActions from "@/components/Landing-page/DivyaDesamFloatingActions";
import DivyaDesamVillaShowcase from "@/components/Landing-page/DivyaDesamVillaShowcase";
import ExquisiteLivingSection from "@/components/Landing-page/ExquisiteLivingSection";
import FloorPlans from "@/components/Landing-page/FloorPlans";
import Highlights from "@/components/Landing-page/Highlights";

import LandingHeader from "@/components/Landing-page/LandingHeader";
import PremiumLandingFooter from "@/components/Landing-page/PremiumLandingFooter";
import PremiumSpecifications from "@/components/Landing-page/PremiumSpecifications";
import ProjectHighlightsSection from "@/components/Landing-page/ProjectHighlightsSection";

export default function PushpaAvePage() {
  return (
    <>
      <LandingHeader />

      <main >
        <DivyaDesamVillaShowcase />

        <ExquisiteLivingSection />

        <ProjectHighlightsSection />

        <Highlights />

        <PremiumSpecifications />

        <FloorPlans />

        

        
      </main>

      <PremiumLandingFooter />
      <DivyaDesamFloatingActions />
    </>
  );
}