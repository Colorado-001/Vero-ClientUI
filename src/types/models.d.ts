import type { AutoflowFrequency } from "./common";

export type UserDto = {
  id: string;
  email: string;
  username: string | null;
  address: string;
  enabled: boolean;
  deployed: boolean;
  implementation: string;
  pinSetup: boolean;
  qr: string | null;
};

export type AutoflowSavingDto = {
  id: number;
  frequency: AutoflowFrequency;
  name: string;
  dayOfMonth: number;
  amountToSave: number;
  tokenToSave: string;
  userId: string;
  isActive: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: {
    totalSaved: number;
    lastSavedAt: string | null; // ISO string format
    totalExpected: number;
    failedExecutions: number;
    nextScheduledDate: string; // ISO string format
    consecutiveFailures: number;
    successfulExecutions: number;
  };
  nextScheduledDate: Date;
  createdAt: Date;
};

export type DelegationSummaryDto = {
  id: string;
  type: string;
  name: string;
  amountLimit: number;
  status: "active" | "inactive" | "pending";
  createdAt: Date;
  // Allowance specific
  walletAddress?: string;
  frequency?: string;
  startDate?: Date;
  // Group wallet specific
  memberCount?: number;
  approvalThreshold?: number;
};
