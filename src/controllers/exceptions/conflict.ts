import { HttpError } from "../../utils/errors";

export class Conflict extends HttpError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 409, details);
  }
}
