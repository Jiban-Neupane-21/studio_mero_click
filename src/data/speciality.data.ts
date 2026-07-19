import type { SpecialityItem } from "../types/speciality.type";
import { Wand2, Camera, BookImage, ImagePlus, Zap, ScanFace, Lock } from "lucide-react";

export const specialityData: SpecialityItem[] = [
  {
    id: 1,
    iconComponent: Wand2,
    altText: "Wand icon representing photo editing and retouching services",
    title: "Professional Photo Editing & Retouching",
  },
  {
    id: 2,
    iconComponent: Camera,
    altText: "Camera icon representing studio photo shoots",
    title: "High-Quality Studio Shoots",
  },
  {
    id: 3,
    iconComponent: BookImage,
    altText: "Photo album icon representing custom album making",
    title: "Custom Photo Albums & Layflat Books",
  },
  {
    id: 4,
    iconComponent: ImagePlus,
    altText: "Canvas print icon representing wall art",
    title: "Canvas & Acrylic Prints",
  },
  {
    id: 5,
    iconComponent: Zap,
    altText: "Lightning bolt icon representing fast turnaround",
    title: "Fast Turnaround — proofs in 48 hrs",
  },
  {
    id: 6,
    iconComponent: ScanFace,
    altText: "Scan icon representing passport and ID photo services",
    title: "Passport & ID Photo Services",
  },
  {
    id: 7,
    iconComponent: Lock,
    altText: "Lock icon representing secure online gallery",
    title: "Free Online Gallery — private & secure",
  },
];
