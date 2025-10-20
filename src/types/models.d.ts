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
  id: string;
  frequency: string;
  name: string;
  dayOfMonth: number;
  amountToSave: number;
  tokenToSave: string;
  userId: string;
  isActive: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
  nextScheduledDate: Date;
  createdAt: Date;
};
