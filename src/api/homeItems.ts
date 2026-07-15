import { supabase } from '../utils/supabase';

export const homeItemsApi = {
  /**
   * Fetch all home items
   */
  async getHomeItems() {
    const { data, error } = await supabase
      .from('home_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map((item: any) => ({
      id: item.id,
      imageUrl: item.image_url,
      createdAt: item.created_at,
    }));
  },

  /**
   * Fetch a single home item by ID
   */
  async getHomeItemById(id: string) {
    const { data, error } = await supabase
      .from('home_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return {
      id: data.id,
      imageUrl: data.image_url,
      createdAt: data.created_at,
    };
  },

  /**
   * Create a new home item
   */
  async createHomeItem(homeData: any) {
    const { data, error } = await supabase
      .from('home_items')
      .insert(homeData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing home item
   */
  async updateHomeItem(id: string, homeData: any) {
    const { data, error } = await supabase
      .from('home_items')
      .update(homeData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a home item
   */
  async deleteHomeItem(id: string) {
    const { error } = await supabase
      .from('home_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
