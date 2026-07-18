import type { NavItem } from "../types/nav.types";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PrintIcon from "@mui/icons-material/Print";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DescriptionIcon from "@mui/icons-material/Description";

export const services: NavItem[] = [
  {
    id: "photo-printings",
    title: "Photo Printings",
    path: "/services/photo-printings",
    icon: PrintIcon,
    description:
      "High-quality photo printing on premium paper with vibrant colors.",
  },
  {
    id: "photo-restoration",
    title: "Photo Repair & Restoration",
    path: "/services/photo-restoration",
    icon: AutoFixHighIcon,
    description:
      "Restore old, damaged, or faded photos to their original glory.",
  },
  {
    id: "photo-framing",
    title: "Photo Framing",
    path: "/services/photo-framing",
    icon: PhotoSizeSelectActualIcon,
    description: "Elegant custom frames crafted to preserve your precious memories.",
  },
  {
    id: "canvas-printings",
    title: "Canvas Printings",
    path: "/services/canvas-printings",
    icon: ArtTrackIcon,
    description: "Turn your favorite photos into stunning gallery-wrapped canvas art.",
  },
  {
    id: "dubo-mala-preservation",
    title: "Dubo Mala Preservation",
    path: "/services/dubo-mala-preservation",
    icon: WorkspacePremiumIcon,
    description:
      "Expert preservation of your cherished dubo mala with lasting quality.",
  },
  {
    id: "designs-prints",
    title: "Designs & Prints",
    path: "/services/designs-prints",
    icon: DesignServicesIcon,
    description: "Custom graphic design and print solutions for any occasion.",
  },
  {
    id: "photo-album",
    title: "Photo Album",
    path: "/services/photo-album",
    icon: PhotoAlbumIcon,
    description: "Beautifully designed photo albums that tell your unique story.",
  },
  {
    id: "studio-photography",
    title: "Studio Photography",
    path: "/services/studio-photography",
    icon: PhotoCameraIcon,
    description: "Professional studio photography with flawless lighting and setup.",
  },
  {
    id: "outdoor-photography",
    title: "Outdoor Photography",
    path: "/services/outdoor-photography",
    icon: CameraAltIcon,
    description: "Capture breathtaking moments in natural outdoor settings.",
  },
  {
    id: "printing-documentation",
    title: "Printing and Documentation",
    path: "/services/printing-documentation",
    icon: DescriptionIcon,
    description:
      "Reliable printing and documentation services for personal and business needs.",
  },
];
