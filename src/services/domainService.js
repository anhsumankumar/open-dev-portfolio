import { supabase } from '../lib/supabase';

export const domainService = {
  async getDomains() {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getDomain(id) {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },

  async createDomain(domain) {
    const { data, error } = await supabase
      .from('domains')
      .insert([domain])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  async updateDomain(id, updates) {
    const { data, error } = await supabase
      .from('domains')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  async deleteDomain(id) {
    const { error } = await supabase
      .from('domains')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  }
};
