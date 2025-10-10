import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthState, AuthActions } from "./auth";
import * as authApi from "../../api/auth";
import * as userApi from "../../api/users";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      authLoading: false,
      user: null,

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

      async loadProfile() {
        const oUser = get().user;

        if (!oUser) {
          const user = await userApi.get_profile();
          set({ user: user });
          return user;
        }

        return oUser;
      },

      logout() {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      },

      async verifyEmailSignup(token, code) {
        try {
          set({ authLoading: true });
          const { access_token } = await authApi.verify_otp({ code, token });
          set({ token: access_token });
          await get().loadProfile();
          set({ isAuthenticated: true });
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
