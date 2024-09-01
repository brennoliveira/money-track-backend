import { Request, Response } from "express";
import { UserService } from "../Services";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const {email, password} = req.body;

      const user = await this.userService.createUser(email, password);

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  }
}