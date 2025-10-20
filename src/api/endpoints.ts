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
  getGas: () => "/v1/transfer/gas",
  sendMoney: () => "/v1/transfer/send",
  autoflow: () => "/v1/savings/autoflow",
  delegations: () => "/v1/savings/delegations",
};
