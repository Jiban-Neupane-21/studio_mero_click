import { supabase } from '../utils/supabase';
import { RestorationImage } from '../types/restoration.type';

export const restorationApi = {
  /**
   * Fetch all restoration images
   */
  async getRestorations(): Promise<RestorationImage[]> {
    const { data, error } = await supabase
      .from('restoration_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single restoration image by ID
   */
  async getRestorationById(id: string): Promise<RestorationImage> {
    const { data, error } = await supabase
      .from('restoration_images')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new restoration image
   */
  async createRestoration(restorationData: Partial<RestorationImage>): Promise<RestorationImage> {
    const { data, error } = await supabase
      .from('restoration_images')
      .insert(restorationData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing restoration image
   */
  async updateRestoration(id: string, restorationData: Partial<RestorationImage>): Promise<RestorationImage> {
    const { data, error } = await supabase
      .from('restoration_images')
      .update(restorationData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a restoration image
   */
  async deleteRestoration(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('restoration_images')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
