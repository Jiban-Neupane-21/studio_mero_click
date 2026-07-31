import type { ComponentType } from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PortraitIcon from "@mui/icons-material/Portrait";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SchoolIcon from "@mui/icons-material/School";
import CakeIcon from "@mui/icons-material/Cake";
import EventIcon from "@mui/icons-material/Event";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export interface PortfolioCategoryNavItem {
  id: string;
  label: string;
  icon: ComponentType<{ fontSize?: "small" }>;
  description: string;
}

export const portfolioCategories: PortfolioCategoryNavItem[] = [
  {
    id: "all",
    label: "All Projects",
    icon: PhotoLibraryIcon,
    description: "Explore our complete portfolio across every category.",
  },
  {
    id: "Portraits",
    label: "Portraits",
    icon: PortraitIcon,
    description: "Timeless portraits capturing personality and expression.",
  },
  {
    id: "Wedding",
    label: "Wedding",
    icon: CelebrationIcon,
    description: "Elegant wedding photography and film.",
  },
  {
    id: "Maternity",
    label: "Maternity",
    icon: ChildFriendlyIcon,
    description: "Beautiful maternity sessions celebrating motherhood.",
  },
  {
    id: "Fashion",
    label: "Fashion",
    icon: CheckroomIcon,
    description: "Editorial and creative fashion shoots.",
  },
  {
    id: "Graduation",
    label: "Graduation",
    icon: SchoolIcon,
    description: "Milestone graduation photo sessions.",
  },
  {
    id: "Cakesmash",
    label: "Cake Smash",
    icon: CakeIcon,
    description: "Fun and playful cake smash celebrations.",
  },
  {
    id: "Events",
    label: "Events",
    icon: EventIcon,
    description: "Complete coverage of events and celebrations.",
  },
  {
    id: "Newborn",
    label: "New Born",
    icon: BabyChangingStationIcon,
    description: "Safe and precious newborn sessions.",
  },
  {
    id: "Product",
    label: "Product",
    icon: ShoppingBagIcon,
    description: "Clean commercial and ecommerce product shots.",
  },
];

export const getPortfolioCategoryPath = (id: string) =>
  id === "all" ? "/portfolio" : `/portfolio?category=${id}`;
