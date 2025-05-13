import { Request, Response, NextFunction } from "express";
import { UserService } from "../Services";
import { CreatedResponse, OkResponse } from "../Responses";
import { HTTP_STATUS } from "../constants";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      return res.status(HTTP_STATUS.SUCCESS.OK).json(new OkResponse({token}));
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, email, password } = req.body;
      await this.userService.createUser(name, email, password);
      return res.status(HTTP_STATUS.SUCCESS.CREATED).json(new CreatedResponse({ message: "User created successfully" }));
    } catch (error) {
      next(error);
    }
  }

  async findUserByEmail(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email } = req.body;
      const user = await this.userService.findUserByEmail(email);
      return res.status(HTTP_STATUS.SUCCESS.CREATED).json(new OkResponse(user));
    } catch (error) {
      next(error);
    }
  }

  async findUserById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.user?.userId;
      const user = await this.userService.findUserById(Number(userId));
      return res.status(HTTP_STATUS.SUCCESS.OK).json(new OkResponse(user));
    } catch (error) {
      next(error);
    }
  }

  async getUserBalance(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.user?.userId;
      const balance = await this.userService.getUserBalance(Number(userId));
      return res.status(HTTP_STATUS.SUCCESS.OK).json(new OkResponse({ balance }));
    } catch (error) {
      next(error);
    }
  }
}
