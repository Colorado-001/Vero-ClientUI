export default {
  signupWithEmail: () => "/v1/auth/signup/email",
  verifyEmailSignup: () => "/v1/auth/signup/email/verify",
  login: () => "/v1/auth/login",
  loginVerify: () => "/v1/auth/login/verify",
  me: () => "/v1/users/me",
  usernameIsAvailable: (username: string) =>
    `/v1/users/username-check/${encodeURIComponent(username)}`,
  pinSetup: () => "/v1/users/me/setup-pin",
  getPortfolio: () => "/v1/wallet/portfolio",
};
