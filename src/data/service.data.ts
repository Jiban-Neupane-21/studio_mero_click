import type { Service } from "../types/service.type"; // adjust the import path to wherever ServiceInterface lives

export const services: Service[] = [
  {
    id: "svc-001",
    category: "Wedding Photography",
    title: "Full Day Wedding Photography Package",
    about: "Complete wedding day coverage from preparation to reception.",
    description:
      "Our full day wedding photography package captures every important moment of your special day, from the bride and groom getting ready to the final dance at the reception. Includes two professional photographers, edited high-resolution images, and an online gallery.",
    oldPrice: 85000,
    newPrice: 65000,
    discountRate: 23,
    thumbnail:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
    images: [
      {
        id: "img-001-1",
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
        alt: "Bride getting ready",
      },
      {
        id: "img-001-2",
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
        alt: "Wedding ceremony",
      },
      {
        id: "img-001-3",
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
        alt: "Reception dance",
      },
    ],
    additionalInfo: [
      { key: "Duration", value: "10-12 hours" },
      { key: "Photographers", value: "2" },
      { key: "Delivery Time", value: "3-4 weeks" },
      { key: "Format", value: "Digital + Optional Album" },
    ],
    features: [
      {
        id: "feat-001-1",
        title: "Two Photographers",
        description: "Dual coverage ensures no moment is missed.",
      },
      {
        id: "feat-001-2",
        title: "Edited Gallery",
        description: "Professionally color-graded and retouched photos.",
      },
      {
        id: "feat-001-3",
        title: "Online Delivery",
        description: "Private online gallery to view and download images.",
      },
    ],
    faq: [
      {
        id: "faq-001-1",
        question: "Do you travel outside Kathmandu Valley?",
        answer: "Yes, travel charges apply outside the valley.",
      },
      {
        id: "faq-001-2",
        question: "Can we get printed albums?",
        answer: "Yes, premium albums are available as an add-on.",
      },
    ],
    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-01-15T09:00:00Z",
    updatedAt: "2026-06-20T14:30:00Z",
  },
  {
    id: "svc-002",
    category: "Portrait Photography",
    title: "Individual Portrait Session",
    about: "Studio or outdoor portrait session tailored to your style.",
    description:
      "A one-hour portrait session designed to capture your personality, whether for professional headshots, personal branding, or a creative shoot. Includes wardrobe consultation and multiple edited images.",
    oldPrice: 8000,
    newPrice: 6000,
    discountRate: 25,
    thumbnail:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1200",
    images: [
      {
        id: "img-002-1",
        url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800",
        alt: "Studio portrait",
      },
      {
        id: "img-002-2",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
        alt: "Outdoor portrait",
      },
    ],
    additionalInfo: [
      { key: "Duration", value: "1 hour" },
      { key: "Location", value: "Studio or Outdoor" },
      { key: "Edited Photos", value: "10-15" },
    ],
    features: [
      {
        id: "feat-002-1",
        title: "Wardrobe Consultation",
        description: "Guidance on outfits before the shoot.",
      },
      {
        id: "feat-002-2",
        title: "Retouched Images",
        description: "Skin and lighting retouching included.",
      },
    ],
    isFeatured: false,
    isAvailable: true,
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-05-18T11:00:00Z",
  },
  {
    id: "svc-003",
    category: "Wedding Photography",
    title: "Corporate Event Coverage",
    about:
      "Professional photography for conferences, launches, and corporate gatherings.",
    description:
      "Comprehensive coverage for corporate events including keynote sessions, networking moments, and branded backdrops. Fast-turnaround delivery for immediate PR and social media use.",
    oldPrice: 30000,
    newPrice: 24000,
    discountRate: 20,
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
    images: [
      {
        id: "img-003-1",
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
        alt: "Conference stage",
      },
      {
        id: "img-003-2",
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
        alt: "Networking session",
      },
    ],
    additionalInfo: [
      { key: "Duration", value: "Up to 6 hours" },
      { key: "Delivery Time", value: "48 hours" },
    ],
    features: [
      {
        id: "feat-003-1",
        title: "Same-Day Preview",
        description: "A curated set of shots delivered within hours.",
      },
      {
        id: "feat-003-2",
        title: "Branded Coverage",
        description: "Focus on brand visibility and key sponsors.",
      },
    ],
    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-03-10T08:00:00Z",
  },
  {
    id: "svc-004",
    category: "Wedding Photography",
    title: "Maternity Photo Session",
    about: "Celebrate motherhood with a gentle, elegant photo session.",
    description:
      "A relaxed studio or outdoor session designed to celebrate this special stage of life, with soft lighting, flowing fabrics, and optional partner and family shots.",
    oldPrice: 12000,
    newPrice: 9500,
    discountRate: 21,
    thumbnail:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200",
    images: [
      {
        id: "img-004-1",
        url: "https://images.unsplash.com/photo-1584582397869-5e0a5c1a2b8b?w=800",
        alt: "Maternity portrait",
      },
    ],
    features: [
      {
        id: "feat-004-1",
        title: "Partner & Family Shots",
        description: "Optional inclusion of family members.",
      },
      {
        id: "feat-004-2",
        title: "Gentle Styling",
        description: "Soft fabrics and props provided in-studio.",
      },
    ],
    faq: [
      {
        id: "faq-004-1",
        question: "What trimester is best for this session?",
        answer: "We recommend 28-34 weeks for the best results.",
      },
    ],
    isFeatured: false,
    isAvailable: true,
    createdAt: "2026-01-25T12:00:00Z",
    updatedAt: "2026-04-02T09:15:00Z",
  },
  {
    id: "svc-005",
    category: "Product Photography",
    title: "E-commerce Product Shoot",
    about: "Clean, high-quality product images for online stores.",
    description:
      "Studio-quality product photography with white background and lifestyle setups, optimized for e-commerce platforms and social media marketing.",
    oldPrice: 15000,
    newPrice: 11000,
    discountRate: 27,
    thumbnail:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200",
    images: [
      {
        id: "img-005-1",
        url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800",
        alt: "Product on white background",
      },
      {
        id: "img-005-2",
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        alt: "Lifestyle product shot",
      },
    ],
    additionalInfo: [
      { key: "Products per Session", value: "Up to 20" },
      { key: "Background Options", value: "White, Lifestyle, Custom" },
    ],
    features: [
      {
        id: "feat-005-1",
        title: "White Background Shots",
        description: "Standard e-commerce ready images.",
      },
      {
        id: "feat-005-2",
        title: "Lifestyle Setups",
        description: "Contextual shots for marketing use.",
      },
    ],
    isFeatured: false,
    isAvailable: true,
    createdAt: "2026-02-14T07:30:00Z",
  },
  {
    id: "svc-006",
    category: "Birthday & Party Photography",
    title: "Kids Birthday Party Coverage",
    about: "Candid and fun photography for children's birthday celebrations.",
    description:
      "Capture the joy and energy of your child's birthday party, from cake cutting to games and guest candids, delivered in a vibrant edited gallery.",
    oldPrice: 10000,
    newPrice: 7500,
    discountRate: 25,
    thumbnail:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200",
    images: [
      {
        id: "img-006-1",
        url: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800",
        alt: "Birthday cake cutting",
      },
    ],
    features: [
      {
        id: "feat-006-1",
        title: "Candid Coverage",
        description: "Natural, unposed moments throughout the event.",
      },
      {
        id: "feat-006-2",
        title: "Vibrant Editing",
        description: "Bright, colorful edits suited for celebrations.",
      },
    ],
    isFeatured: false,
    isAvailable: true,
    createdAt: "2026-03-01T13:00:00Z",
    updatedAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "svc-007",
    category: "Fashion Photography",
    title: "Fashion Lookbook Shoot",
    about: "Editorial-style photography for fashion brands and models.",
    description:
      "A creative fashion shoot designed for lookbooks, campaigns, or portfolio building, with professional lighting setups and styling collaboration.",
    oldPrice: 25000,
    newPrice: 19000,
    discountRate: 24,
    thumbnail:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200",
    images: [
      {
        id: "img-007-1",
        url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
        alt: "Fashion editorial shot",
      },
      {
        id: "img-007-2",
        url: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800",
        alt: "Studio fashion shoot",
      },
    ],
    additionalInfo: [
      { key: "Looks Covered", value: "Up to 5" },
      { key: "Styling Support", value: "Available on request" },
    ],
    features: [
      {
        id: "feat-007-1",
        title: "Editorial Lighting",
        description: "Dramatic, magazine-style lighting setups.",
      },
      {
        id: "feat-007-2",
        title: "Multiple Looks",
        description: "Coverage across several outfit changes.",
      },
    ],
    faq: [
      {
        id: "faq-007-1",
        question: "Can you provide a makeup artist?",
        answer: "Yes, MUA services can be added for an extra fee.",
      },
    ],
    isFeatured: true,
    isAvailable: false,
    createdAt: "2026-01-05T15:00:00Z",
    updatedAt: "2026-06-01T16:45:00Z",
  },
  {
    id: "svc-008",
    category: "Real Estate Photography",
    title: "Property Photography Package",
    about: "High-quality visuals for real estate listings.",
    description:
      "Professional interior and exterior shots of residential or commercial properties, optimized to attract buyers and renters on listing platforms.",
    oldPrice: 18000,
    newPrice: 14000,
    discountRate: 22,
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    images: [
      {
        id: "img-008-1",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        alt: "Living room interior",
      },
      {
        id: "img-008-2",
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        alt: "House exterior",
      },
    ],
    additionalInfo: [
      { key: "Rooms Covered", value: "Up to 10" },
      { key: "Drone Shots", value: "Optional add-on" },
    ],
    features: [
      {
        id: "feat-008-1",
        title: "Wide-Angle Shots",
        description: "Captures full room space effectively.",
      },
      {
        id: "feat-008-2",
        title: "Twilight Exteriors",
        description: "Optional dusk shots for premium listings.",
      },
    ],
    isFeatured: false,
    isAvailable: true,
    createdAt: "2026-02-20T06:00:00Z",
  },
  {
    id: "svc-009",
    category: "Pre-Wedding Photography",
    title: "Pre-Wedding Couple Shoot",
    about: "Romantic outdoor or studio session before the big day.",
    description:
      "A dedicated couple's session at scenic locations around Kathmandu Valley, capturing your love story before the wedding with cinematic edits.",
    oldPrice: 20000,
    newPrice: 15000,
    discountRate: 25,
    thumbnail:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200",
    images: [
      {
        id: "img-009-1",
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
        alt: "Couple at sunset",
      },
      {
        id: "img-009-2",
        url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800",
        alt: "Couple walking outdoors",
      },
    ],
    additionalInfo: [
      { key: "Duration", value: "3-4 hours" },
      { key: "Locations", value: "Up to 2" },
    ],
    features: [
      {
        id: "feat-009-1",
        title: "Cinematic Editing",
        description: "Film-inspired color grading and tone.",
      },
      {
        id: "feat-009-2",
        title: "Location Scouting",
        description: "We help pick the best spots around the valley.",
      },
    ],
    faq: [
      {
        id: "faq-009-1",
        question: "Can we choose our own location?",
        answer: "Absolutely, we're happy to shoot at your preferred spot.",
      },
    ],
    isFeatured: true,
    isAvailable: true,
    createdAt: "2026-03-22T11:30:00Z",
    updatedAt: "2026-06-10T09:00:00Z",
  },
  {
    id: "svc-010",
    category: "Food Photography",
    title: "Restaurant Menu Photography",
    about: "Appetizing food photography for menus and social media.",
    description:
      "Styled food photography designed to make each dish look irresistible, ideal for restaurant menus, delivery apps, and Instagram marketing.",
    oldPrice: 14000,
    newPrice: 10500,
    discountRate: 25,
    thumbnail:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
    images: [
      {
        id: "img-010-1",
        url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
        alt: "Plated dish",
      },
      {
        id: "img-010-2",
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
        alt: "Restaurant table setting",
      },
    ],
    additionalInfo: [
      { key: "Dishes per Session", value: "Up to 15" },
      { key: "Styling", value: "Included" },
    ],
    features: [
      {
        id: "feat-010-1",
        title: "Food Styling",
        description: "Professional plating and prop arrangement.",
      },
      {
        id: "feat-010-2",
        title: "Natural Light Setup",
        description: "Bright, appetizing natural lighting.",
      },
    ],
    isFeatured: false,
    isAvailable: true,
    createdAt: "2026-04-05T08:45:00Z",
  },
];

export default services;
