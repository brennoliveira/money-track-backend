import { Request, Response } from "express";
import { UserService } from "../Services";
import { error } from "console";

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

  async findUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      const user = await this.userService.findUserByEmail(email);

      if (user) return res.status(200).json(user);

      return res.status(404).json({ error: "User not found" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to retrieve user" });
    }
  }

  async findUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      const user = await this.userService.findUserById(Number(userId));

      if (user) return res.status(200).json(user);

      return res.status(404).json({ error: "User not found" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to retrieve user" });
    }
  }

  async getUserBalance(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      const balance = await this.userService.getUserBalance(Number(userId));

      if (balance) return res.status(200).json(balance);

      return res.status(404).json({ error: "Balance not found" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to retrieve balance" });
    }
  }
}