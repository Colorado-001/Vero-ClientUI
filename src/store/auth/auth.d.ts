export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  authLoading: boolean;
};

export type AuthActions = {
  setIsAuthenticated: (value: boolean) => void;
  emailSignup: (email: string) => Promise<string>;
};
