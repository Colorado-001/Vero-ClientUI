export type UtilState = {
  hasOnboarded: boolean;
  forceHideFbb: boolean;
  scrollContainerId?: string;
};

export type UtilActions = {
  markOnboarded: () => void;
  setScrollContainerId: (id?: string) => void;
  setForceHideFbb: (val: boolean) => void;
};
