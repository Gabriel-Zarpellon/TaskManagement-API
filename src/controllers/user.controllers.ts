import { Request, Response } from "express";
import { iUserControllers } from "../interfaces/user.interface";
import { inject, injectable } from "tsyringe";
import { UserServices } from "../services/user.services";

@injectable()
export class UserControllers implements iUserControllers {
  constructor(@inject("UserServices") private userServices: UserServices) {}
  async register(req: Request, res: Response): Promise<Response> {
    const response = await this.userServices.register(req.body);

    return res.status(201).json(response);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const response = await this.userServices.login(res.locals.user);

    return res.status(200).json(response);
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const id = res.locals.decode.id;

    const response = await this.userServices.getUser(id);

    return res.status(200).json(response);
  }
}
