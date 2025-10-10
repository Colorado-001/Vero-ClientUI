import { axiosInstance } from "../client";
import endpoints from "../endpoints";

interface IResponse {
  isAvailable: boolean;
  isYou: boolean;
}

export const is_username_available = async (
  username: string,
  signal: AbortSignal
) => {
  return (
    await axiosInstance.get<IResponse>(
      endpoints.usernameIsAvailable(username),
      {
        signal,
      }
    )
  ).data;
};
