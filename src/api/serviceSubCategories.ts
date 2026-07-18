import { supabase } from '../utils/supabase';

export const serviceSubCategoriesApi = {
  async getSubCategories() {
    const { data, error } = await supabase
      .from('service_sub_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getSubCategoriesByCategoryId(categoryId: string) {
    const { data, error } = await supabase
      .from('service_sub_categories')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getSubCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('service_sub_categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  async createSubCategory(data: {
    category_id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    sort_order?: number;
  }) {
    const { data: result, error } = await supabase
      .from('service_sub_categories')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async updateSubCategory(id: string, data: Partial<{
    name: string;
    slug: string;
    description: string;
    icon: string;
    sort_order: number;
    is_active: boolean;
  }>) {
    const { data: result, error } = await supabase
      .from('service_sub_categories')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async deleteSubCategory(id: string) {
    const { error } = await supabase
      .from('service_sub_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
