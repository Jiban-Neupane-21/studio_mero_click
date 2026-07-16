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
  youtube_id?: string;
  youtubeId?: string;
  facebook_link?: string;
  facebookLink?: string;
  tiktok_link?: string;
  tiktokLink?: string;
  duration?: string;
  upload_date?: string;
  uploadDate?: string;
  views?: string;
  thumbnail?: string;
}

export interface TutorialVideo {
  id: string;
  title: string;
  category: string;
  description: string;
  youtube_id?: string;
  youtubeId?: string;
  facebook_link?: string;
  facebookLink?: string;
  tiktok_link?: string;
  tiktokLink?: string;
  duration?: string;
  upload_date?: string;
  uploadDate?: string;
  published_at?: string;
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
