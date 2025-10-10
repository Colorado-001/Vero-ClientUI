import { axiosInstance } from "../client";
import endpoints from "../endpoints";

interface IRequest {
  email: string;
}

interface IResponse {
  token: string;
}

export const login = async (data: IRequest) => {
  return (await axiosInstance.post<IResponse>(endpoints.login(), data)).data;
};
