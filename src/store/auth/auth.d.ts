export type AuthState = {
  isAuthenticated: boolean;
};

export type AuthActions = {
  setIsAuthenticated: (value: boolean) => void;
};
