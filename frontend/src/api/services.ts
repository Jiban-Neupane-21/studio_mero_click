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
      .order('sort_order', { ascending: true });

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

  async createService(serviceData: any) {
    const { images, specifications, features, faqs, ...mainData } = serviceData;

    const { data: service, error } = await supabase
      .from('services')
      .insert(mainData)
      .select()
      .single();

    if (error) throw error;

    // Insert related data if available
    if (images && images.length > 0) {
      await supabase.from('service_images').insert(
        images.map((img: any) => ({ service_id: service.id, url: img.url, alt: img.alt || '' }))
      );
    }
    
    if (specifications && specifications.length > 0) {
      await supabase.from('service_specifications').insert(
        specifications.map((s: any) => ({ service_id: service.id, spec_key: s.key, spec_value: s.value }))
      );
    }

    if (features && features.length > 0) {
      await supabase.from('service_features').insert(
        features.map((f: any) => ({ service_id: service.id, title: f.title, description: f.description }))
      );
    }

    if (faqs && faqs.length > 0) {
      await supabase.from('service_faqs').insert(
        faqs.map((f: any) => ({ service_id: service.id, question: f.question, answer: f.answer }))
      );
    }

    return service;
  },

  /**
   * Update an existing service (main table and related tables)
   */
  async updateService(id: string, serviceData: any) {
    const { images, specifications, features, faqs, ...mainData } = serviceData;

    const { data: service, error } = await supabase
      .from('services')
      .update(mainData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // For related data, the simplest approach is to delete existing and re-insert
    
    if (images !== undefined) {
      await supabase.from('service_images').delete().eq('service_id', id);
      if (images.length > 0) {
        await supabase.from('service_images').insert(
          images.map((img: any) => ({ service_id: id, url: img.url, alt: img.alt || '' }))
        );
      }
    }

    if (specifications !== undefined) {
      await supabase.from('service_specifications').delete().eq('service_id', id);
      if (specifications.length > 0) {
        await supabase.from('service_specifications').insert(
          specifications.map((s: any) => ({ service_id: id, spec_key: s.key, spec_value: s.value }))
        );
      }
    }

    if (features !== undefined) {
      await supabase.from('service_features').delete().eq('service_id', id);
      if (features.length > 0) {
        await supabase.from('service_features').insert(
          features.map((f: any) => ({ service_id: id, title: f.title, description: f.description }))
        );
      }
    }

    if (faqs !== undefined) {
      await supabase.from('service_faqs').delete().eq('service_id', id);
      if (faqs.length > 0) {
        await supabase.from('service_faqs').insert(
          faqs.map((f: any) => ({ service_id: id, question: f.question, answer: f.answer }))
        );
      }
    }

    return service;
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
  },

  /**
   * Bulk update sort orders for drag-and-drop reordering
   */
  async reorderServices(updates: { id: string; sort_order: number }[]) {
    const results = await Promise.all(
      updates.map(u =>
        supabase
          .from('services')
          .update({ sort_order: u.sort_order })
          .eq('id', u.id)
      )
    );

    const error = results.find(r => r.error)?.error;
    if (error) throw error;
    return true;
  }
};
