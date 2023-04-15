import { HttpError } from "../../utils/errors";

export class NotFound extends HttpError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 404, details);
  }
}
