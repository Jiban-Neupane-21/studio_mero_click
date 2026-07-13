export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface ProductFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Product {
  id: string;

  // Basic Information
  title: string;
  about: string;

  // Pricing
  oldPrice: number;
  newPrice: number;
  discountRate: number;

  // Images
  thumbnail: string;
  images: ProductImage[];

  // Details
  description: string;
  additionalInfo: ProductSpecification[];

  // Features
  features: ProductFeature[];

  // FAQ
  faq: ProductFAQ[];

  // Optional
  isFeatured?: boolean;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
