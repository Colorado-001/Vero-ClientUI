import { create } from "zustand";
import type { SavingAction, SavingState } from "./saving";
import * as savingApi from "../../api/savings";

export const useSavingStore = create<SavingState & SavingAction>()(
  (set, get) => ({
    autoFlows: [],
    loadingAutoFlows: false,
    creatingAutoFlow: false,
    deletingAutoFlow: false,

    async removeAutoFlow(id) {
      try {
        set({ deletingAutoFlow: true });

        await savingApi.deleteAutoFlow(id);
        const { autoFlows } = get();

        set({ autoFlows: autoFlows.filter((af) => af.id !== id) });
      } finally {
        set({ deletingAutoFlow: false });
      }
    },

    async addAutoFlow(data) {
      try {
        set({ creatingAutoFlow: true });

        const result = await savingApi.createAutoFlow(data);
        const { autoFlows } = get();

        set({ autoFlows: [result, ...autoFlows] });
      } finally {
        set({ creatingAutoFlow: false });
      }
    },

    async loadAutoFlows(refresh = false) {
      const { autoFlows } = get();
      if (autoFlows.length > 0 && !refresh) {
        return;
      }

      try {
        set({ loadingAutoFlows: true });
        const result = await savingApi.getAutoFlows();
        set({ autoFlows: result });
      } finally {
        set({ loadingAutoFlows: false });
      }
    },
  })
);
