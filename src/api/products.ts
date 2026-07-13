import { supabase } from '../utils/supabase';

export const productsApi = {
  /**
   * Fetch all products with their related data
   */
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (*),
        product_specifications (*),
        product_features (*),
        product_faqs (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single product by ID with related data
   */
  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (*),
        product_specifications (*),
        product_features (*),
        product_faqs (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new product (main table only)
   * Note: Related items (images, faqs, etc.) must be inserted separately
   */
  async createProduct(productData: any) {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing product (main table only)
   */
  async updateProduct(id: string, productData: any) {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a product
   * Note: Related items will be deleted automatically due to ON DELETE CASCADE
   */
  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
