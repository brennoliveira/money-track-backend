import { UserDTO } from "../../Models/entities";

export interface IUserRepository {
  createUser(email: string, password: string): Promise<UserDTO>;
  findUserByEmail(email: string): Promise<UserDTO | null>;
  findUserById(userId: number): Promise<UserDTO | null>;
  updateBalance(userId: number, amount: number): Promise<undefined>;
}