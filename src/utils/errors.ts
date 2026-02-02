export const ERROR_CODES = {

  VALIDATION_ERROR: {
    status: 400,
    message: "Invalid Request Payload",
  },

  INVALID_CREDENTIALS: {
    status: 401,
    message: "Invalid login credentials",
  },

  NOT_FOUND: {
    status: 404,
    message: "Resource not found",
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
    errors: any;

  constructor(errorType: ErrorCode, errors?: any) {
    super(ERROR_CODES[errorType].message);
    this.statusCode = ERROR_CODES[errorType].status;
    this.errorType = errorType
    this.errors = errors
  }
}

