import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthState, AuthActions } from "./auth";
import * as authApi from "../../api/auth";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      authLoading: false,

      setIsAuthenticated(value) {
        set({ isAuthenticated: value });
      },

      async emailSignup(email) {
        try {
          set({ authLoading: true });
          const response = await authApi.email_signup({ email });
          return response.token;
        } finally {
          set({ authLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
);
