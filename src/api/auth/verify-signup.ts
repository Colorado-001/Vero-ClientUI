import { axiosInstance } from "../client";
import endpoints from "../endpoints";

interface IRequest {
  token: string;
  code: string;
}

interface IResponse {
  access_token: string;
}

export const verify_otp = async (data: IRequest) => {
  return (
    await axiosInstance.post<IResponse>(endpoints.verifyEmailSignup(), data)
  ).data;
};
