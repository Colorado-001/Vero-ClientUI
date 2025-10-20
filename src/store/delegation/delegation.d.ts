import type { CreateDelegationSchema } from "../../features/delegation/types";
import type { DelegationSummaryDto } from "../../types/models";

export type DelegationState = {
  delegations: DelegationSummaryDto[];
  loadingDelegations: boolean;
  creatingDelegation: boolean;
};

export type DelegationAction = {
  loadDelegations: (refresh: boolean = false) => Promise<void>;
  addDelegation: (saving: CreateDelegationSchema) => Promise<void>;
};
