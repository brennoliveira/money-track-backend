import { Request, Response } from "express";
import { UserService } from "../Services";
import { BcryptService, JWTService } from "../Utils";

export class UserController {
  private readonly userService: UserService;
  private readonly bcryptService: BcryptService;
  private readonly jwtService: JWTService;

  constructor() {
    this.userService = new UserService();
    this.bcryptService = new BcryptService();
    this.jwtService = new JWTService();
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });

      const isPasswordValid = await this.bcryptService.compareValues(password, String(user.password));
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

      const token = this.jwtService.generateToken(Number(user.id));

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Error during login' });
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const {name, email, password} = req.body;

      const user = await this.userService.createUser(name, email, password);

      // const token = this.jwtService.generateToken(Number(user.id));

      return res.status(201).json({ message: "User Registered" });
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
      const userId = req.user?.userId;

      const user = await this.userService.findUserById(Number(userId));

      if (user) return res.status(200).json(user);

      return res.status(404).json({ error: "User not found" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to retrieve user" });
    }
  }

  async getUserBalance(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.userId;

      const balance = await this.userService.getUserBalance(Number(userId));

      return res.status(200).json({balance: `R$${balance}`});
    } catch (error) {
      return res.status(500).json({ error: "Failed to retrieve balance" });
    }
  }
}