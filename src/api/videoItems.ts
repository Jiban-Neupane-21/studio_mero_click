import { supabase } from '../utils/supabase';

export const videoItemsApi = {
  /**
   * Fetch all video items
   */
  async getVideoItems() {
    const { data, error } = await supabase
      .from('video_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single video item by ID
   */
  async getVideoItemById(id: string) {
    const { data, error } = await supabase
      .from('video_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new video item
   */
  async createVideoItem(videoData: any) {
    const { data, error } = await supabase
      .from('video_items')
      .insert(videoData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing video item
   */
  async updateVideoItem(id: string, videoData: any) {
    const { data, error } = await supabase
      .from('video_items')
      .update(videoData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a video item
   */
  async deleteVideoItem(id: string) {
    const { error } = await supabase
      .from('video_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
