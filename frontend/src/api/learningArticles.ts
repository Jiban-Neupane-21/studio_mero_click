import { supabase } from '../utils/supabase';

export const learningArticlesApi = {
  /**
   * Fetch all learning articles
   */
  async getLearningArticles() {
    const { data, error } = await supabase
      .from('learning_articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single learning article by ID
   */
  async getLearningArticleById(id: string) {
    const { data, error } = await supabase
      .from('learning_articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new learning article
   */
  async createLearningArticle(articleData: any) {
    const { data, error } = await supabase
      .from('learning_articles')
      .insert(articleData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing learning article
   */
  async updateLearningArticle(id: string, articleData: any) {
    const { data, error } = await supabase
      .from('learning_articles')
      .update(articleData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a learning article
   */
  async deleteLearningArticle(id: string) {
    const { error } = await supabase
      .from('learning_articles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
