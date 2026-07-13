import { supabase } from '../utils/supabase';

export const servicesApi = {
  /**
   * Fetch all services with their related data
   */
  async getServices() {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        service_images (*),
        service_specifications (*),
        service_features (*),
        service_faqs (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single service by ID with related data
   */
  async getServiceById(id: string) {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        service_images (*),
        service_specifications (*),
        service_features (*),
        service_faqs (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new service (main table only)
   * Note: Related items (images, faqs, etc.) must be inserted separately
   */
  async createService(serviceData: any) {
    const { data, error } = await supabase
      .from('services')
      .insert(serviceData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing service (main table only)
   */
  async updateService(id: string, serviceData: any) {
    const { data, error } = await supabase
      .from('services')
      .update(serviceData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a service
   * Note: Related items will be deleted automatically due to ON DELETE CASCADE
   */
  async deleteService(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
