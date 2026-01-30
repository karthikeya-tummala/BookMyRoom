export const ERROR_CODES = {
  INVALID_CREDENTIALS: {
    status: 401,
    message: "Invalid login credentials",
  },

  VALIDATION_ERROR: {
    status: 400,
    message: "Invalid Request Payload",
  },

  EMAIL_ALREADY_IN_USE: {
    status: 409,
    message: "Email ID already in use",
  },

  INTERNAL: {
    status: 500,
    message: "Internal Server Error"
  }

} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

export class ApiError extends Error {
    statusCode: number;
    errorType: ErrorCode;

  constructor(errorType: ErrorCode) {
    super(ERROR_CODES[errorType].message);
    this.statusCode = ERROR_CODES[errorType].status;
    this.errorType = errorType
    console.log("Type:", this.errorType);
    console.log("StatusCode:", this.statusCode);
  }
}