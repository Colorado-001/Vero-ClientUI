import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ExplorerActions, ExplorerState } from "./explorer";
import { loadSavingsActivity } from "../../api/load-savings-activity";

// const _mockData = [
//   {
//     user: "0x742E4C4B4B4B4B4B4B4B4B4B4B4B4B4B4B4B4B4B4B",
//     amount: "1000000000000000000 wei",
//     newBalance: "5000000000000000000 wei",
//     timestamp: "2024-01-15T10:30:00Z",
//   },
//   {
//     user: "0x842E4C4B4B4B4B4B4B4B4B4B4B4B4B4B4B4B4B4B4B",
//     amount: "250000000000000000 wei",
//     newBalance: "3250000000000000000 wei",
//     timestamp: "2024-01-15T11:45:00Z",
//   },
// ];

export const useExplorerStore = create<ExplorerState & ExplorerActions>()(
  persist(
    (set, get) => ({
      data: [],
      loading: false,
      lastUpdated: null,

      async loadData(refresh) {
        const { data } = get();

        if (data.length > 0 && !refresh) {
          return;
        }

        try {
          set({ loading: true });
          const result = await loadSavingsActivity();
          set({ data: result, lastUpdated: new Date().toISOString() });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "explorer-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        data: state.data,
      }),
    }
  )
);
