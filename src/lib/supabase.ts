import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Helpful flag consumers can use to detect misconfiguration in environments like Vercel
export const supabaseConfigured = (
  !!import.meta.env.VITE_SUPABASE_URL &&
  !!import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'placeholder-key'
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function supabaseConfigWarning(): string | null {
  if (supabaseConfigured) return null;
  return 'Supabase appears to be unconfigured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment (e.g. Vercel Environment Variables).';
}

// Database helper functions
export const projectsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(project: Omit<any, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<any>) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const experienceService = {
  async getAll() {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(experience: Omit<any, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('experience')
      .insert([experience])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<any>) {
    const { data, error } = await supabase
      .from('experience')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const aboutService = {
  async get() {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  async update(updates: Partial<any>) {
    const { data, error } = await supabase
      .from('about')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

export const documentsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getByType(type: 'cv' | 'certificate') {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getCV() {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('type', 'cv')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async create(document: { type: 'cv' | 'certificate'; title: string; file_url: string; file_name: string; file_size: number }) {
    const { data, error } = await supabase
      .from('documents')
      .insert([document])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async uploadFile(file: File, type: 'cv' | 'certificate') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `${type}s/${fileName}`;

    const { data, error } = await supabase.storage
      .from('documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    return { publicUrl, fileName: file.name, fileSize: file.size };
  }
};