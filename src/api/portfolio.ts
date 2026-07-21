import { supabase } from '../utils/supabase';
import { PortfolioItem } from '../types';

const mapPortfolioItem = (item: any): PortfolioItem => ({
  id: item.id,
  title: item.title,
  category: item.category,
  imageUrl: item.image_url,
  specLabel: item.spec_label,
  author: item.author,
  description: item.description,
  secondaryImages: item.secondary_images,
});

export const portfolioApi = {
  /**
   * Fetch all portfolio items
   */
  async getPortfolioItems() {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return (data || []).map(mapPortfolioItem);
  },

  /**
   * Fetch a single portfolio item by ID
   */
  async getPortfolioItemById(id: string) {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return mapPortfolioItem(data);
  },

  /**
   * Create a new portfolio item
   */
  async createPortfolioItem(portfolioData: any) {
    const { data, error } = await supabase
      .from('portfolio_items')
      .insert(portfolioData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing portfolio item
   */
  async updatePortfolioItem(id: string, portfolioData: any) {
    const { data, error } = await supabase
      .from('portfolio_items')
      .update(portfolioData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a portfolio item
   */
  async deletePortfolioItem(id: string) {
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  /**
   * Bulk update sort orders for drag-and-drop reordering
   */
  async reorderPortfolioItems(updates: { id: string; sort_order: number }[]) {
    const results = await Promise.all(
      updates.map(u =>
        supabase
          .from('portfolio_items')
          .update({ sort_order: u.sort_order })
          .eq('id', u.id)
      )
    );

    const error = results.find(r => r.error)?.error;
    if (error) throw error;
    return true;
  }
};
