import HeroImage from "../components/homepage/HeroImage";
import ServiceGrid from "../components/homepage/Servicesgrid";
import FeatureProduct from "../components/homepage/FeaturedProductGrid";
import RestorationShowcase from "../components/homepage/RestorationShowcase";
import SpecialitySection from "../components/Speciality";
import FaqSection from "../components/FaqSection";
import PortraitsGrid from "../components/homepage/PortraitsGrid";
import ScrollReveal from "../components/common/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <ScrollReveal animation="scaleUp">
        <HeroImage />
      </ScrollReveal>
      <ScrollReveal animation="fadeUp" delay={0.1}>
        <ServiceGrid />
      </ScrollReveal>
      <ScrollReveal animation="fadeUp" delay={0.1}>
        <FeatureProduct />
      </ScrollReveal>
      <ScrollReveal animation="fadeUp" delay={0.1}>
        <RestorationShowcase />
      </ScrollReveal>
      <ScrollReveal animation="fadeUp" delay={0.1}>
        <PortraitsGrid />
      </ScrollReveal>
      <ScrollReveal animation="fadeUp" delay={0.1}>
        <SpecialitySection />
      </ScrollReveal>
      <ScrollReveal animation="fadeUp" delay={0.1}>
        <FaqSection />
      </ScrollReveal>
    </>
  );
}
