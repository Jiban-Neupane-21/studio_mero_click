export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface ServiceImage {
  id: string;
  url: string;
  alt?: string;
}

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
}

export interface ServiceSpecification {
  key: string;
  value: string;
}

export interface ServiceFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Service {
  id: string;

  // Category
  category: string;

  // Basic Information
  title: string;
  about: string;
  description: string;

  // Pricing
  oldPrice: number;
  newPrice: number;
  discountRate: number;

  // Images
  thumbnail: string;
  image: string; // Main image (optional if using thumbnail)
  images: ServiceImage[];

  // Additional Details
  additionalInfo?: ServiceSpecification[];

  // Features
  features: ServiceFeature[];

  // FAQ
  faq?: ServiceFAQ[];

  // Optional
  isFeatured?: boolean;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
