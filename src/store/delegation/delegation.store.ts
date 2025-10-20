import { create } from "zustand";
import type { DelegationAction, DelegationState } from "./delegation";
import * as delegationApi from "../../api//delegation";

export const useDelegationStore = create<DelegationState & DelegationAction>()(
  (set, get) => ({
    delegations: [],
    loadingDelegations: false,
    creatingDelegation: false,

    async addDelegation(data) {
      try {
        set({ creatingDelegation: true });

        const result = await delegationApi.createDelegation(data);
        console.log(result);
      } finally {
        set({ creatingDelegation: false });
      }
    },

    async loadDelegations(refresh = false) {
      const { delegations } = get();
      if (delegations.length > 0 && !refresh) {
        return;
      }

      try {
        set({ loadingDelegations: true });
        // const result = await savingApi.getAutoFlows();
        // set({ autoFlows: result });
      } finally {
        set({ loadingDelegations: false });
      }
    },
  })
);
