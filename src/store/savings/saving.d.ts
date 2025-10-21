import type { ICreateAutoFlowRequest } from "../../api/savings";
import type { AutoflowSavingDto } from "../../types/models";

export type SavingState = {
  autoFlows: AutoflowSavingDto[];
  loadingAutoFlows: boolean;
  creatingAutoFlow: boolean;
  deletingAutoFlow: boolean;
};

export type SavingAction = {
  loadAutoFlows: (refresh: boolean = false) => Promise<void>;
  addAutoFlow: (saving: ICreateAutoFlowRequest) => Promise<void>;
  removeAutoFlow: (id: number) => Promise<void>;
};
