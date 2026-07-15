import { supabase } from '../utils/supabase';
import type { OfferItem } from '../types/offer.type';

export const offerAdsApi = {
  /**
   * Fetch all offer ads
   */
  async getOfferAds() {
    const { data, error } = await supabase
      .from('offer_ads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single offer ad by ID
   */
  async getOfferAdById(id: string) {
    const { data, error } = await supabase
      .from('offer_ads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new offer ad
   */
  async createOfferAd(offerData: any) {
    const { data, error } = await supabase
      .from('offer_ads')
      .insert(offerData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing offer ad
   */
  async updateOfferAd(id: string, offerData: any) {
    const { data, error } = await supabase
      .from('offer_ads')
      .update(offerData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete an offer ad
   */
  async deleteOfferAd(id: string) {
    const { error } = await supabase
      .from('offer_ads')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
