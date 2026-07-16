export interface RestorationImage {
  id: string;
  title: string;
  description: string;
  before_image_url: string;
  after_image_url: string;
  old_price?: number;
  new_price?: number;
  discount_rate?: number;
  created_at?: string;
}
