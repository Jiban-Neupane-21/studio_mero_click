import { supabase } from '../utils/supabase';

export const tutorialVideosApi = {
  /**
   * Fetch all tutorial videos
   */
  async getTutorialVideos() {
    const { data, error } = await supabase
      .from('tutorial_videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single tutorial video by ID
   */
  async getTutorialVideoById(id: string) {
    const { data, error } = await supabase
      .from('tutorial_videos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new tutorial video
   */
  async createTutorialVideo(tutorialData: any) {
    const { data, error } = await supabase
      .from('tutorial_videos')
      .insert(tutorialData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing tutorial video
   */
  async updateTutorialVideo(id: string, tutorialData: any) {
    const { data, error } = await supabase
      .from('tutorial_videos')
      .update(tutorialData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a tutorial video
   */
  async deleteTutorialVideo(id: string) {
    const { error } = await supabase
      .from('tutorial_videos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
