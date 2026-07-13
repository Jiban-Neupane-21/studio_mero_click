/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OfferAd {
  id: string;
  title: string;
  discount: string;
  description: string;
  terms?: string;
  targetCategory: string;
  image: string;
  accentColor?: string;
  badge?: string;
  validUntil?: string;
}

export * from "./portfolio.type";

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  youtubeId?: string;
  facebookLink?: string;
  tiktokLink?: string;
  duration?: string;
  uploadDate?: string;
  views?: string;
  thumbnail?: string;
}

export interface TutorialVideo {
  id: string;
  title: string;
  category: string;
  description: string;
  youtubeId?: string;
  facebookLink?: string;
  tiktokLink?: string;
  duration?: string;
  uploadDate?: string;
  publishedAt?: string;
}

export interface LearningArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image?: string;
  imageUrl?: string;
}
