import type { NavigateFunction } from "react-router-dom";

// Define a generic route type
type AppRoute<T extends object | undefined = undefined> = {
  fn: (data: T extends undefined ? void : T) => string;
};

export type AppRoutes = {
  home: AppRoute;
  createAccountWithEmail: AppRoute;
  login: AppRoute;
  verifyOtp: AppRoute<{ token: string; action: "signup" | "login" }>;
};

export const routes: AppRoutes = {
  home: {
    fn: () => "/dashboard",
  },
  createAccountWithEmail: {
    fn: () => "/signup/email",
  },
  verifyOtp: {
    fn: (input) => `/otp/${input.action}/${input.token}`,
  },
  login: {
    fn: () => "/login",
  },
};

export const appNavigate = <K extends keyof AppRoutes>(
  navigator: NavigateFunction,
  to: K,
  data?: AppRoutes[K] extends AppRoute<infer T>
    ? T extends undefined
      ? void
      : T
    : never
) => {
  const route = routes[to];
  const path =
    typeof data === "undefined"
      ? (route.fn as (data: void) => string)()
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (route.fn as (data: any) => string)(data);

  console.log("navigate", path);

  navigator(path);
};
