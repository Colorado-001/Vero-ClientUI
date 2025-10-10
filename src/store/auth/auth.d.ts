import type { UserDto } from "../../types/models";

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  authLoading: boolean;
  user: UserDto | null;
};

export type AuthActions = {
  setIsAuthenticated: (value: boolean) => void;
  emailSignup: (email: string) => Promise<string>;
  loadProfile: () => Promise<UserDto>;
  verifyEmailSignup: (token: string, code: string) => Promise<void>;
};
