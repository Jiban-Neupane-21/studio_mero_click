export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "booking" | "studio" | "pricing";
}