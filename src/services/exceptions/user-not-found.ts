import { CodedError } from "../../utils/errors";

export class UserNotFound extends CodedError {
  constructor(details?: Record<string, any>) {
    super("USER_NOT_FOUND", "user not found", details);
  }
}
