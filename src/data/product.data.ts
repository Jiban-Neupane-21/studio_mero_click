import type { NavItem } from "../types/nav.types";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PrintIcon from "@mui/icons-material/Print";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import SchoolIcon from "@mui/icons-material/School";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

export const services: NavItem[] = [
  {
    id: "photography",
    title: "Studio Photography",
    path: "/services/photography",
    icon: PhotoCameraIcon,
    description: "Professional in-studio photoshoots with perfect lighting.",
  },
  {
    id: "printing",
    title: "Photo Printing",
    path: "/services/printing",
    icon: PrintIcon,
    description: "High-quality prints for your photos and documents.",
  },
  {
    id: "frame",
    title: "Photo Frame",
    path: "/services/frame",
    icon: PhotoSizeSelectActualIcon,
    description: "Beautifully crafted frames to display your memories.",
  },
  {
    id: "canvas",
    title: "Canvas Prints",
    path: "/services/canvas",
    icon: ArtTrackIcon,
    description: "Turn your photos into stunning pieces of wall art.",
  },
  {
    id: "cup-print",
    title: "Cup Print",
    path: "/services/cup-print",
    icon: LocalCafeIcon, // or PrintIcon if you prefer
    description:
      "Create personalized photo mugs and custom cup printing for every occasion.",
  },
  {
    id: "graduation",
    title: "Graduation Photography",
    path: "/services/graduation",
    icon: SchoolIcon,
    description: "Commemorate your academic achievements with us.",
  },

  {
    id: "album",
    title: "Photo Album",
    path: "/services/album",
    icon: PhotoAlbumIcon,
    description: "Custom-designed albums to tell your unique story.",
  },
  {
    id: "studio backdrop",
    title: "Studio Backdrop",
    path: "/services/studio-backdrop",
    icon: TheaterComedyIcon,
    description: "A wide variety of backdrops for creative shoots.",
  },
];
