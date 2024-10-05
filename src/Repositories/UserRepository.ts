import { Repositoy } from './Repository';
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "./interfaces";
import { UserMapper } from './mappers';
import { UserDTO } from '../Models/entities';

const prisma = new PrismaClient();

export class UserRepository extends Repositoy implements IUserRepository {
  private readonly repository = this.getRepository().user;
  private readonly userMapper = new UserMapper();

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.repository.findUniqueOrThrow({
      where: {
        email,
      }
    });
    return user ? this.userMapper.toDTO(user) : null;
  }
  
  async createUser(email: string, password: string): Promise<UserDTO> {
    const user = await this.repository.create({
      data: {
        email,
        password,
        balance: 0,
      }
    });
    return this.userMapper.toDTO(user);
  }

  async findUserById(userId: number): Promise<UserDTO | null> {
    try {
      const user = await this.repository.findUniqueOrThrow({
        where: {
          id: userId,
        }
      });

      return user ? this.userMapper.toDTO(user) : null;
    } catch (error) {
      throw new Error(`${error}`); 
    }
  }

  async getUserBalance(userId: number): Promise<number> {
    try {
      const user = await this.repository.findUniqueOrThrow({
        where: {
          id: userId,
        }
      });

      return user.balance;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async updateBalance(userId: number, amount: number): Promise<undefined> {
    try {
      const user = await this.repository.findUniqueOrThrow({ where: { id: userId } });
      await this.repository.update({
        where: { id: userId },
        data: { balance: amount += Number(user?.balance) }
      });

    } catch (error) {
      throw new Error(`${error}`); 
    }
  }
}