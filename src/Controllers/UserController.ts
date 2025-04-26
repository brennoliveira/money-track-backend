import { Request, Response, NextFunction } from "express";
import { UserService } from "../Services";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, email, password } = req.body;
      await this.userService.createUser(name, email, password);
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async findUserByEmail(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email } = req.body;
      const user = await this.userService.findUserByEmail(email);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async findUserById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.user?.userId;
      const user = await this.userService.findUserById(Number(userId));
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserBalance(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.user?.userId;
      const balance = await this.userService.getUserBalance(Number(userId));
      return res.status(200).json({ balance: `R$${balance}` });
    } catch (error) {
      next(error);
    }
  }
}
