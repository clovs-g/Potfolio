import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      set({
        user: data.user,
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) throw error;
      set({
        user: data.user,
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({
        user: null,
        isAuthenticated: false
      });
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  initialize: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false
      });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        set({
          user: session?.user ?? null,
          isAuthenticated: !!session?.user
        });
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ isLoading: false });
    }
  }
}));