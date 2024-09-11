import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { iUserServices } from "../interfaces/user.interface";
import {
  tUserBody,
  userReturnSchema,
  tUserReturn,
  tLoginReturn,
  tUser,
} from "../schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@injectable()
export class UserServices implements iUserServices {
  async register(body: tUserBody): Promise<tUserReturn> {
    const hashPassword = await bcrypt.hash(body.password, 10);

    const data = await prisma.user.create({
      data: { ...body, password: hashPassword },
    });

    return userReturnSchema.parse(data);
  }

  async login(user: tUser): Promise<tLoginReturn> {
    const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET as string);

    return {
      accessToken: token,
      user: userReturnSchema.parse(user),
    };
  }

  async getUser(id: number): Promise<tUserReturn> {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    return userReturnSchema.parse(user);
  }
}
