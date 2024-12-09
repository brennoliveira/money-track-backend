import { UserDTO } from "../../Models/entities";

export interface IUserRepository {
  createUser(name: String, email: string, password: string): Promise<UserDTO>;
  findUserByEmail(email: string): Promise<UserDTO | null>;
  findUserById(userId: number): Promise<UserDTO | null>;
  getUserBalance(userId: number): Promise<number>;
  updateBalance(userId: number, amount: number): Promise<undefined>;
}