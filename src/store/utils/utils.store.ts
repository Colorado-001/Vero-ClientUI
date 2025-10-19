import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UtilActions, UtilState } from "./utils";

export const useUtilStore = create<UtilState & UtilActions>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      scrollContainerId: undefined,

      markOnboarded() {
        set({ hasOnboarded: true });
      },

      setScrollContainerId(id) {
        set({ scrollContainerId: id });
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
