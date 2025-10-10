export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
};

export type AuthActions = {
  setIsAuthenticated: (value: boolean) => void;
};
