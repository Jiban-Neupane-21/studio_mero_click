import HeroImage from "../components/homepage/HeroImage";
import ServiceGrid from "../components/homepage/Servicesgrid";
import FeatureProduct from "../components/homepage/FeaturedProductGrid";
import SpecialitySection from "../components/Speciality";
import FaqSection from "../components/FaqSection";

export default function HomePage() {
  return (
    <>
      <HeroImage />
      <ServiceGrid />
      <FeatureProduct />
      <SpecialitySection />
      <FaqSection />
    </>
  );
}
