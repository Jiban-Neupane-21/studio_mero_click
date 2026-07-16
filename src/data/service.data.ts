import type { NavItem } from "../types/nav.types";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PrintIcon from "@mui/icons-material/Print";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import SchoolIcon from "@mui/icons-material/School";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

export const services: NavItem[] = [
  {
    id: "photography",
    title: "Studio Photography",
    path: "/services/photography",
    icon: PhotoCameraIcon,
    description: "Professional in-studio photoshoots with perfect lighting.",
  },
  {
    id: "wedding",
    title: "Wedding Photography",
    path: "/services/wedding",
    icon: FavoriteIcon,
    description: "Capturing the magic of your special day with elegance.",
  },
  {
    id: "printing",
    title: "Printing",
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
    id: "maternity",
    title: "Maternity Photography",
    path: "/services/maternity",
    icon: PregnantWomanIcon,
    description: "Celebrate the beauty of pregnancy with a special photoshoot.",
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
