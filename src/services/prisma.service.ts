import { PrismaClient } from "@prisma/client";

class PrismaService {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public instance(): PrismaClient {
    return this.client;
  }
}

export default new PrismaService();
