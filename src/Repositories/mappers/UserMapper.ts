import { Users as UserPrisma } from "@prisma/client"
import { Mapper } from "./IMapper";
import { UserDTO } from "../../Models/entities";

export class UserMapper implements Mapper<UserDTO, UserPrisma> {
  toDTOList(persistence: { name: string; id: number; email: string; password: string; balance: number; createdAt: Date; updatedAt: Date; }[]): UserDTO[] {
    throw new Error("Method not implemented.");
  }
  toPersistence?(DTO: UserDTO): { name: string; id: number; email: string; password: string; balance: number; createdAt: Date; updatedAt: Date; } {
    throw new Error("Method not implemented.");
  }
  toDTO(persistence: UserPrisma): UserDTO {
    return new UserDTO({
      id        : persistence.id,
      name      : persistence.name,
      email     : persistence.email,
      password  : persistence.password,
      createdAt : persistence.createdAt,
      updatedAt : persistence.updatedAt
    });
  }

  // toPersistence(dto: UserDTO): UserPrisma {
  //   return {
  //     id : dto.id ,
  //     email: dto.email,
  //     password: dto.password,
  //     createdAt: dto.createdAt,
  //     updatedAt: dto.updatedAt
  //   }
  // }
}
