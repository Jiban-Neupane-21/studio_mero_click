import type { SocialMediaItem } from "../types/socialmedial.type";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export const socialMediaData: SocialMediaItem[] = [
  {
    id: "facebook",
    name: "Facebook",
    url: "https://facebook.com/studiomeroclick",
    color: "#1877F2",
    icon: FaFacebookF,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/studiomeroclick",
    color: "#E4405F",
    icon: FaInstagram,
  },
  {
    id: "tiktok",
    name: "TikTok",
    url: "https://tiktok.com/@studiomeroclick",
    color: "#000000",
    icon: FaTiktok,
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@studiomeroclick",
    color: "#FF0000",
    icon: FaYoutube,
  },
   {
    id: "whatsapp",
    name: "WhatsApp",
    url: "https://wa.me/9779823367428",
    color: "#25D366",
    icon: FaWhatsapp,
  },
];