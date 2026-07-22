import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import CompletedProjects from "@/components/CompletedProjects";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import DivyaDesamFeature from "@/components/DivyaDesamFeature";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ProjectsCarousel />
        <WhyChooseUs />
        <DivyaDesamFeature />
        <CompletedProjects />
        {/* <Gallery /> */}
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
