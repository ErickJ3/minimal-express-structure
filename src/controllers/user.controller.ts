import userService from "../services/user.service";
import Controller from "../utils/controller.decorator";
import { Request, Response } from "express";
import { Get } from "../utils/handlers.decorator";
import { UserNotFound } from "../services/exceptions";
import { NotFound } from "./exceptions";
import jwtMiddleware from "../middlewares/jwt.middleware";

@Controller("/user")
export default class UserController {
  @Get("/profile", [jwtMiddleware])
  async index(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.findUser(req.user_id);
      res.status(200).json({ user });
    } catch (error: Error | any) {
      const { code, message } = error;

      if (error instanceof UserNotFound) {
        const notFound = new NotFound(code, message);

        res.status(notFound.status_code).json({
          ...notFound,
        });
      }
    }
  }
}
