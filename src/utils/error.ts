/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";
import type {
  AppErrorResponse,
  ErrorCodes,
  ErrorHandlerOptions,
} from "../types/error";
import { useAuthStore } from "../store/auth/auth.store";

function parseError(err: unknown): AppErrorResponse {
  if (axios.isAxiosError(err)) {
    const axiosErr = err as AxiosError<any>;

    if (axiosErr.response?.data?.message && axiosErr.response?.data?.error) {
      return {
        message: axiosErr.response.data.message,
        code: axiosErr.response.data.error,
        data: axiosErr.response.data.data,
      };
    }

    return {
      message: axiosErr.message || "Network error",
      code: "AXIOS_ERROR" as ErrorCodes,
      data: {
        status: axiosErr.response?.status,
        url: axiosErr.config?.url,
      },
    };
  }

  if (err instanceof Error) {
    return {
      message: err.message,
      code: "JS_ERROR" as ErrorCodes,
      data: undefined,
    };
  }

  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR" as ErrorCodes,
    data: err,
  };
}

export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  options: ErrorHandlerOptions = {}
): Promise<{ data: T | null; isError: boolean }> {
  try {
    const res = await fn();
    return { isError: false, data: res };
  } catch (err) {
    if (isAxiosError(err) && err.status === 401) {
      useAuthStore.getState().logout();
      return { isError: true, data: null };
    }
    const parsed = parseError(err);

    // Handle specific error codes
    if (options.onError) {
      for (const handler of options.onError) {
        if (parsed.code === handler.code) {
          handler.func(parsed);
          return { isError: true, data: null };
        }
      }
    }

    // Fallback toast
    if (options.showToast !== false) {
      toast.error(parsed.message || "Something went wrong");
    }

    return { isError: true, data: null };
  }
}

export function isErrorCode<C extends ErrorCodes>(
  err: AppErrorResponse,
  code: C
): err is AppErrorResponse<C> {
  return err.code === code;
}
