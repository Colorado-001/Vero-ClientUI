export type UtilState = {
  hasOnboarded: boolean;
  scrollContainerId?: string;
};

export type UtilActions = {
  markOnboarded: () => void;
  setScrollContainerId: (id?: string) => void;
};
