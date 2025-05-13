import { Repositoy } from './Repository';
import { PrismaClient } from '@prisma/client';
import { IUserRepository } from './interfaces';
import { UserMapper } from './mappers';
import { UserDTO } from '../Models/entities';
import { InternalServerError } from '../Errors';

export class UserRepository extends Repositoy implements IUserRepository {
  private readonly repository = this.getRepository().users;
  private readonly userMapper = new UserMapper();

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.repository.findUnique({
      where: {
        email,
      }
    });
    return user ? this.userMapper.toDTO(user) : null;
  }
  
  async createUser(name: string, email: string, password: string): Promise<UserDTO> {
    const user = await this.repository.create({
      data: {
        name,
        email,
        password,
      }
    });
    return this.userMapper.toDTO(user);
  }

  async findUserById(userId: number): Promise<UserDTO | null> {
    try {
      const user = await this.repository.findUnique({
        where: {
          id: userId,
        }
      });

      return user ? this.userMapper.toDTO(user) : null;
    } catch (error) {
      throw new InternalServerError(`${error}`); 
    }
  }
}
