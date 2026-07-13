// src/data/nav.data.ts

import HomeIcon from "@mui/icons-material/Home";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";

import type { NavItem } from "../types/nav.types";

export const navItems: NavItem[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    id: "services",
    title: "Services",
    path: "/services",
    icon: DesignServicesIcon,
  },
  {
    id: "portfolio",
    title: "Portfolio Gallery",
    path: "/portfolio",
    icon: PhotoLibraryIcon,
  },
  {
    id: "videos",
    title: "Videos",
    path: "/videos",
    icon: VideoLibraryIcon,
  },
  {
    id: "learn",
    title: "Learn From Us",
    path: "/learn",
    icon: SchoolIcon,
  },
  {
    id: "contact",
    title: "Contact",
    path: "/contact",
    icon: ContactMailIcon,
  },
  {
    id: "about",
    title: "About Us",
    path: "/about",
    icon: InfoIcon,
  },
];
