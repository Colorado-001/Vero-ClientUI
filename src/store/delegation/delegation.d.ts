import type { CreateDelegationSchema } from "../../features/delegation/types";

export type DelegationState = {
  delegations: unknown[];
  loadingDelegations: boolean;
  creatingDelegation: boolean;
};

export type DelegationAction = {
  loadDelegations: (refresh: boolean = false) => Promise<void>;
  addDelegation: (saving: CreateDelegationSchema) => Promise<void>;
};
