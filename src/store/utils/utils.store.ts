import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UtilActions, UtilState } from "./utils";

export const useUtilStore = create<UtilState & UtilActions>()(
  persist(
    (set) => ({
      hasOnboarded: false,

      markOnboarded() {
        set({ hasOnboarded: true });
      },
    }),
    {
      name: "util-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        hasOnboarded: state.hasOnboarded,
      }),
    }
  )
);
