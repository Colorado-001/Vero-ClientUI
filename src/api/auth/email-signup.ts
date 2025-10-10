import { axiosInstance } from "../client";
import endpoints from "../endpoints";

interface IRequest {
  email: string;
}

interface IResponse {
  token: string;
}

export const email_signup = async (data: IRequest) => {
  return (
    await axiosInstance.post<IResponse>(endpoints.signupWithEmail(), data)
  ).data;
};
