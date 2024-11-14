import { create } from 'zustand';
import { signInWithEmail as firebaseSignInWithEmail, signOut as firebaseSignOut, type UserData } from '../services/firebase/auth';

interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<UserData>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signInWithEmail: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const userData = await firebaseSignInWithEmail(email, password);
      set({ user: userData, loading: false });
      return userData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign in';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },
  signOut: async () => {
    set({ loading: true, error: null });
    try {
      await firebaseSignOut();
      set({ user: null, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign out';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  }
}));