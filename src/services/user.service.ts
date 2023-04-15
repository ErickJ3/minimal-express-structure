import prismaService from "./prisma.service";
import { UserNotFound } from "./exceptions";
import { User } from "@prisma/client";

class UserService {
  async findUser(id: string): Promise<Partial<User> | null> {
    const user = await prismaService.instance().user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}

export default new UserService();
