import { supabase } from '../utils/supabase';

export const serviceCategoriesApi = {
  async getCategories() {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  async createCategory(categoryData: { name: string; slug: string; description?: string; icon?: string; sort_order?: number }) {
    const { data, error } = await supabase
      .from('service_categories')
      .insert(categoryData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCategory(id: string, categoryData: Partial<{ name: string; slug: string; description: string; icon: string; sort_order: number; is_active: boolean }>) {
    const { data, error } = await supabase
      .from('service_categories')
      .update(categoryData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCategory(id: string) {
    const { error } = await supabase
      .from('service_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
