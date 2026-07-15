import HeroImage from "../components/homepage/HeroImage";
import ServiceGrid from "../components/homepage/Servicesgrid";
import FeatureProduct from "../components/homepage/FeaturedProductGrid";
import RestorationShowcase from "../components/homepage/RestorationShowcase";
import SpecialitySection from "../components/Speciality";
import FaqSection from "../components/FaqSection";
import PortraitsGrid from "../components/homepage/PortraitsGrid";

export default function HomePage() {
  return (
    <>
      <HeroImage />
      <ServiceGrid />
      <FeatureProduct />
      <RestorationShowcase />
      <PortraitsGrid />
      <SpecialitySection />
      <FaqSection />
    </>
  );
}
