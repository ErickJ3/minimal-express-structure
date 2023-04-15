export abstract class CodedError extends Error {
  code: string;

  details?: Record<string, any>;

  constructor(code: string, message: string, details?: Record<string, any>) {
    super(message);
    this.code = code;
    this.details = details;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      details: this.details,
    };
  }
}

export class HttpError extends CodedError {
  status_code: number;

  constructor(
    code: string,
    message: string,
    status_code: number,
    details?: Record<string, any>
  ) {
    super(code, message, details);
    this.status_code = status_code;
  }
}
