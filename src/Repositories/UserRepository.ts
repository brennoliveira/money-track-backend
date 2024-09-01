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
    const user = await this.repository.findUnique({
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
}