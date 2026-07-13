export const PORTFOLIO_CATEGORIES = [
  "Wedding",
  "Maternity",
  "Cake Smash",
  "Fashion",
  "Portrait",
  "Identity Photo",
  "Commercial",
  "Customize Gifts",
] as const;

export type PortfolioCategory =
  (typeof PORTFOLIO_CATEGORIES)[number];

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  imageUrl: string;
  specLabel?: string;
  author?: string;
  description?: string;
  secondaryImages?: string[];
}