export type ErrorCodes =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION_ERROR"
  | "INTERNAL_SERVER_ERROR"
  | "VALUE"
  | "AXIOS_ERROR"
  | "JS_ERROR"
  | "UNKNOWN_ERROR"
  | "HIGH_RISK_OPERATION";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ErrorDataMap = {};

export type AppErrorResponse<C extends ErrorCodes = ErrorCodes> = {
  message: string;
  code: C;
  data: ErrorDataMap[C];
};

export type ErrorHandlerOptions = {
  onError?: Array<{
    code: ErrorCodes;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    func: (err: AppErrorResponse<any>) => void;
  }>;
  showToast?: boolean;
};
