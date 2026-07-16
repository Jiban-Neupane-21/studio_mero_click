import { supabase } from '../utils/supabase';

function dbToClient(row: any) {
  if (!row) return row;
  return {
    id: row.id,
    title: row.title,
    discount: row.discount,
    description: row.description,
    terms: row.terms,
    targetCategory: row.target_category,
    image: row.image,
    accentColor: row.accent_color,
    badge: row.badge,
    validUntil: row.valid_until,
    createdAt: row.created_at,
  };
}

function clientToDb(offer: any) {
  const db: any = {};
  if (offer.title !== undefined) db.title = offer.title;
  if (offer.discount !== undefined) db.discount = offer.discount;
  if (offer.description !== undefined) db.description = offer.description;
  if (offer.terms !== undefined) db.terms = offer.terms;
  if (offer.targetCategory !== undefined) db.target_category = offer.targetCategory;
  if (offer.image !== undefined) db.image = offer.image;
  if (offer.accentColor !== undefined) db.accent_color = offer.accentColor;
  if (offer.badge !== undefined) db.badge = offer.badge;
  if (offer.validUntil !== undefined) db.valid_until = offer.validUntil;
  return db;
}

export const offerAdsApi = {
  async getOfferAds() {
    const { data, error } = await supabase
      .from('offer_ads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(dbToClient);
  },

  async getOfferAdById(id: string) {
    const { data, error } = await supabase
      .from('offer_ads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return dbToClient(data);
  },

  async createOfferAd(offerData: any) {
    const { data, error } = await supabase
      .from('offer_ads')
      .insert(clientToDb(offerData))
      .select()
      .single();

    if (error) throw error;
    return dbToClient(data);
  },

  async updateOfferAd(id: string, offerData: any) {
    const { data, error } = await supabase
      .from('offer_ads')
      .update(clientToDb(offerData))
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return dbToClient(data);
  },

  async deleteOfferAd(id: string) {
    const { error } = await supabase
      .from('offer_ads')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
