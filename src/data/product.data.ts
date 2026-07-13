import type { Product } from "../types/featureProduct.type";

export const Products: Product[] = [
  {
    id: "1",
    title: "Wedding Photography Package",
    about: "Premium wedding photography and cinematic videography package.",

    oldPrice: 50000,
    newPrice: 40000,
    discountRate: 20,

    thumbnail: "/Images/Product(300x250).jpg",

    images: [
      { id: "1", url: "/Images/Product(300x250).jpg" },
      { id: "2", url: "/Images/Product(300x250).jpg" },
      { id: "3", url: "/Images/Product(300x250).jpg" },
    ],

    description:
      "Capture every unforgettable wedding moment with professional photography, cinematic videography, drone coverage, and premium editing.",

    additionalInfo: [
      { key: "Duration", value: "Full Day" },
      { key: "Delivery", value: "15 Working Days" },
      { key: "Edited Photos", value: "300+" },
      { key: "Video Quality", value: "4K Cinematic" },
    ],

    features: [
      {
        id: "1",
        title: "Professional Photography",
        description: "Unlimited high-resolution photographs.",
      },
      {
        id: "2",
        title: "Drone Coverage",
        description: "Beautiful aerial wedding shots.",
      },
      {
        id: "3",
        title: "Premium Album",
        description: "Luxury printed photo album included.",
      },
    ],

    faq: [
      {
        id: "1",
        question: "How many edited photos are included?",
        answer: "More than 300 professionally edited photos.",
      },
      {
        id: "2",
        question: "Is drone coverage included?",
        answer: "Yes, where local regulations allow.",
      },
    ],

    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-07-12",
    updatedAt: "2026-07-12",
  },

  {
    id: "2",
    title: "Passport & Visa Photo Package",
    about:
      "Professional passport, visa, and ID photos meeting international standards.",

    oldPrice: 1200,
    newPrice: 900,
    discountRate: 25,

    thumbnail: "/images/products/passport-cover.jpg",

    images: [
      { id: "1", url: "/images/products/passport-1.jpg" },
      { id: "2", url: "/images/products/passport-2.jpg" },
      { id: "3", url: "/images/products/passport-3.jpg" },
    ],

    description:
      "Get perfectly sized biometric passport and visa photographs accepted by embassies worldwide.",

    additionalInfo: [
      { key: "Print Size", value: "35×45 mm & Custom Sizes" },
      { key: "Delivery", value: "30 Minutes" },
      { key: "Soft Copy", value: "Included" },
      { key: "Background", value: "White" },
    ],

    features: [
      {
        id: "1",
        title: "Embassy Standard",
        description: "Meets international photo guidelines.",
      },
      {
        id: "2",
        title: "Instant Editing",
        description: "Professional retouching included.",
      },
      {
        id: "3",
        title: "Digital Copy",
        description: "Receive high-resolution digital images.",
      },
    ],

    faq: [
      {
        id: "1",
        question: "Do you provide digital copies?",
        answer: "Yes, every package includes a digital copy.",
      },
      {
        id: "2",
        question: "How long does it take?",
        answer: "Usually within 30 minutes.",
      },
    ],

    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-07-12",
    updatedAt: "2026-07-12",
  },

  {
    id: "3",
    title: "Pre-Wedding Shoot",
    about: "Romantic outdoor and indoor pre-wedding photography session.",

    oldPrice: 30000,
    newPrice: 24000,
    discountRate: 20,

    thumbnail: "/images/products/prewedding-cover.jpg",

    images: [
      { id: "1", url: "/images/products/prewedding-1.jpg" },
      { id: "2", url: "/images/products/prewedding-2.jpg" },
      { id: "3", url: "/images/products/prewedding-3.jpg" },
    ],

    description:
      "Celebrate your love story with stunning cinematic pre-wedding photography and creative concepts.",

    additionalInfo: [
      { key: "Duration", value: "6 Hours" },
      { key: "Locations", value: "Up to 3" },
      { key: "Edited Photos", value: "100+" },
      { key: "Highlight Video", value: "3-5 Minutes" },
    ],

    features: [
      {
        id: "1",
        title: "Creative Direction",
        description: "Professional posing assistance.",
      },
      {
        id: "2",
        title: "Outdoor Locations",
        description: "Beautiful destination shoots.",
      },
      {
        id: "3",
        title: "Cinematic Video",
        description: "Romantic highlight film included.",
      },
    ],

    faq: [
      {
        id: "1",
        question: "Can we choose our location?",
        answer: "Yes, you may choose up to three locations.",
      },
      {
        id: "2",
        question: "Is makeup included?",
        answer: "No, but we can recommend makeup artists.",
      },
    ],

    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-07-12",
    updatedAt: "2026-07-12",
  },

  {
    id: "4",
    title: "Birthday Photography",
    about:
      "Capture unforgettable birthday celebrations with professional photography.",

    oldPrice: 15000,
    newPrice: 12000,
    discountRate: 20,

    thumbnail: "/images/products/birthday-cover.jpg",

    images: [
      { id: "1", url: "/images/products/birthday-1.jpg" },
      { id: "2", url: "/images/products/birthday-2.jpg" },
      { id: "3", url: "/images/products/birthday-3.jpg" },
    ],

    description:
      "Perfect for children's birthdays, family celebrations, and milestone birthday events.",

    additionalInfo: [
      { key: "Coverage", value: "4 Hours" },
      { key: "Edited Photos", value: "150+" },
      { key: "Delivery", value: "7 Days" },
      { key: "Album", value: "Optional" },
    ],

    features: [
      {
        id: "1",
        title: "Event Coverage",
        description: "Complete birthday event photography.",
      },
      {
        id: "2",
        title: "Family Portraits",
        description: "Dedicated family photo session.",
      },
      {
        id: "3",
        title: "Photo Editing",
        description: "Professionally edited images.",
      },
    ],

    faq: [
      {
        id: "1",
        question: "Do you travel outside Kathmandu?",
        answer: "Yes, travel charges may apply.",
      },
      {
        id: "2",
        question: "How many photos are delivered?",
        answer: "Around 150 edited photographs.",
      },
    ],

    isFeatured: false,
    isAvailable: true,
    createdAt: "2026-07-12",
    updatedAt: "2026-07-12",
  },

  {
    id: "5",
    title: "Corporate Event Photography",
    about:
      "Professional photography for conferences, seminars, and business events.",

    oldPrice: 25000,
    newPrice: 20000,
    discountRate: 20,

    thumbnail: "/images/products/corporate-cover.jpg",

    images: [
      { id: "1", url: "/images/products/corporate-1.jpg" },
      { id: "2", url: "/images/products/corporate-2.jpg" },
      { id: "3", url: "/images/products/corporate-3.jpg" },
    ],

    description:
      "High-quality corporate event photography with fast delivery and professional editing.",

    additionalInfo: [
      { key: "Coverage", value: "8 Hours" },
      { key: "Delivery", value: "5 Working Days" },
      { key: "Edited Photos", value: "250+" },
      { key: "Commercial License", value: "Included" },
    ],

    features: [
      {
        id: "1",
        title: "Professional Coverage",
        description: "Complete event documentation.",
      },
      {
        id: "2",
        title: "Same-Day Highlights",
        description: "Quick turnaround for social media.",
      },
      {
        id: "3",
        title: "Commercial Usage",
        description: "Images licensed for business use.",
      },
    ],

    faq: [
      {
        id: "1",
        question: "Can you cover multi-day events?",
        answer: "Yes, customized packages are available.",
      },
      {
        id: "2",
        question: "Do you provide raw photos?",
        answer: "Raw files can be provided upon request.",
      },
    ],

    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-07-12",
    updatedAt: "2026-07-12",
  },
];
