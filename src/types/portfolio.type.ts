export const PORTFOLIO_CATEGORIES = [
  "Portraits",
  "Fashion",
  "Events",
  "Maternity",
  "Wedding",
  "Cakesmash",
  "Graduation",
  "Product",
  "Newborn",
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