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
        balance: 0,
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

  async getUserBalance(userId: number): Promise<number> {
    try {
      const user = await this.repository.findUnique({
        where: {
          id: userId,
        }
      });

      return user?.balance ?? 0;
    } catch (error) {
      throw new InternalServerError(`${error}`);
    }
  }

  async updateBalance(userId: number, amount: number): Promise<undefined> {
    try {
      const user = await this.repository.findUnique({ where: { id: userId } });
      if (user) {
        await this.repository.update({
          where: { id: userId },
          data: { balance: amount + user.balance }
        });
      }
    } catch (error) {
      throw new InternalServerError(`${error}`);
    }
  }

  // Exemplo de função para consultar SQL dinâmico
  async customQueryExample(userId: number) {
    const query = await this.createQuery('queries/customQuery.sql', [
      { key: '$userId', value: userId },
    ]);

    // Processar o resultado da query (dependerá do formato da consulta SQL)
    return query;
  }
}
