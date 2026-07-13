import { supabase } from '../utils/supabase';

export const portfolioApi = {
  /**
   * Fetch all portfolio items
   */
  async getPortfolioItems() {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
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
    return data;
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
  }
};
