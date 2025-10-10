import type { IUpdateProfileRequest } from "../../types/common";
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
  login: (email: string) => Promise<string>;
  verifyLogin: (token: string, code: string) => Promise<void>;
  loadProfile: () => Promise<UserDto>;
  verifyEmailSignup: (token: string, code: string) => Promise<void>;
  logout: () => void;
  updateProfile: (input: IUpdateProfileRequest) => Promise<void>;
};
