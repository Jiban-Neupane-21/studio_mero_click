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
      .order('sort_order', { ascending: true });

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

  async createProduct(productData: any) {
    const { images, specifications, features, faqs, ...mainData } = productData;

    const { data: product, error } = await supabase
      .from('products')
      .insert(mainData)
      .select()
      .single();

    if (error) throw error;

    // Insert related data if available
    if (images && images.length > 0) {
      await supabase.from('product_images').insert(
        images.map((img: any) => ({ product_id: product.id, url: img.url, alt: img.alt || '' }))
      );
    }
    
    if (specifications && specifications.length > 0) {
      await supabase.from('product_specifications').insert(
        specifications.map((s: any) => ({ product_id: product.id, spec_key: s.key, spec_value: s.value }))
      );
    }

    if (features && features.length > 0) {
      await supabase.from('product_features').insert(
        features.map((f: any) => ({ product_id: product.id, title: f.title, description: f.description }))
      );
    }

    if (faqs && faqs.length > 0) {
      await supabase.from('product_faqs').insert(
        faqs.map((f: any) => ({ product_id: product.id, question: f.question, answer: f.answer }))
      );
    }

    return product;
  },

  /**
   * Update an existing product (main table and related tables)
   */
  async updateProduct(id: string, productData: any) {
    const { images, specifications, features, faqs, ...mainData } = productData;

    const { data: product, error } = await supabase
      .from('products')
      .update(mainData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // For related data, the simplest approach is to delete existing and re-insert
    
    if (images !== undefined) {
      await supabase.from('product_images').delete().eq('product_id', id);
      if (images.length > 0) {
        await supabase.from('product_images').insert(
          images.map((img: any) => ({ product_id: id, url: img.url, alt: img.alt || '' }))
        );
      }
    }

    if (specifications !== undefined) {
      await supabase.from('product_specifications').delete().eq('product_id', id);
      if (specifications.length > 0) {
        await supabase.from('product_specifications').insert(
          specifications.map((s: any) => ({ product_id: id, spec_key: s.key, spec_value: s.value }))
        );
      }
    }

    if (features !== undefined) {
      await supabase.from('product_features').delete().eq('product_id', id);
      if (features.length > 0) {
        await supabase.from('product_features').insert(
          features.map((f: any) => ({ product_id: id, title: f.title, description: f.description }))
        );
      }
    }

    if (faqs !== undefined) {
      await supabase.from('product_faqs').delete().eq('product_id', id);
      if (faqs.length > 0) {
        await supabase.from('product_faqs').insert(
          faqs.map((f: any) => ({ product_id: id, question: f.question, answer: f.answer }))
        );
      }
    }

    return product;
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
  },

  /**
   * Bulk update sort orders for drag-and-drop reordering
   */
  async reorderProducts(updates: { id: string; sort_order: number }[]) {
    const results = await Promise.all(
      updates.map(u =>
        supabase
          .from('products')
          .update({ sort_order: u.sort_order })
          .eq('id', u.id)
      )
    );

    const error = results.find(r => r.error)?.error;
    if (error) throw error;
    return true;
  }
};
