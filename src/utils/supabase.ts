/* eslint-disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferAd, PortfolioItem, VideoItem } from "../types";
import { PortfolioItems } from "../data/portfolio.data";

const mockTutorials = [
  {
    id: "1",
    title: "Cinematic Lighting Masterclass",
    category: "Tutorials",
    description: "Learn how to use three-point lighting for professional portraits.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "15",
    uploadDate: "2024-01-15"
  },
  {
    id: "2",
    title: "Passport & Biometric Guidelines",
    category: "Embassy",
    description: "Crucial dimensions and specifications for visa photo success.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "8",
    uploadDate: "2024-02-10"
  }
];

const mockArticles = [
  {
    id: "1",
    title: "Embassy Photo Guidelines 2026",
    category: "Guidelines",
    excerpt: "A comprehensive manual for US, Schengen, and Canadian visa photo specifications.",
    content: "### Introduction\nEmbassy photo requirements are highly specific...\n\n### Requirements\n- White background\n- No smiling\n- 2x2 inches for US Visa",
    author: "Jiban Neupane",
    publishedAt: "2026-06-01",
    readTime: "5 mins"
  }
];

export const supabase = {
  from: (table: string) => ({
    select: (...args: any[]) => ({
      order: (...args: any[]) => Promise.resolve({ data: table === 'tutorials' ? mockTutorials : mockArticles, error: null })
    })
  })
};

export const apiService = {
  getOffers: async (): Promise<OfferAd[]> => {
    return [
      {
        id: "1",
        title: "Grand Wedding Season Special",
        discount: "20% OFF",
        description: "Complete photography & videography coverage of your dream day. Premium package includes digital gallery and custom wood frame prints.",
        targetCategory: "Wedding",
        image: "/Images/Grand_1200x800.jpg"
      },
      {
        id: "2",
        title: "Professional Studio Portraiture",
        discount: "15% OFF",
        description: "Elevate your corporate, personal, or family portfolio with professional lighting and high-end styling sessions.",
        targetCategory: "Portrait",
        image: "/Images/Product(300x250).jpg"
      }
    ];
  },
  getPortfolioItems: async (): Promise<PortfolioItem[]> => {
    return PortfolioItems;
  },
  getVideoItems: async (): Promise<VideoItem[]> => {
    return [
      {
        id: "v1",
        title: "Stunning Wedding Reel 2026",
        category: "Wedding Reel",
        description: "A cinematic walkthrough of traditional and modern wedding highlights across Kathmandu valley.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "4:15",
        uploadDate: "2026-01-05",
        views: "12K"
      },
      {
        id: "v2",
        title: "Fashion & Aesthetics BTS",
        category: "Behind the Scenes",
        description: "Go behind the lenses to see how our team directs professional fashion models and handles natural lighting.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "12:40",
        uploadDate: "2026-04-18",
        views: "5.4K"
      }
    ];
  }
};
