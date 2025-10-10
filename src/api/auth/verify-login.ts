import { axiosInstance } from "../client";
import endpoints from "../endpoints";

interface IRequest {
  token: string;
  code: string;
}

interface IResponse {
  access_token: string;
}

export const verify_login = async (data: IRequest) => {
  return (await axiosInstance.post<IResponse>(endpoints.loginVerify(), data))
    .data;
};
