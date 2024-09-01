import { User as UserPrisma } from "@prisma/client"
import { Mapper } from "./IMapper";
import { UserDTO } from "../../Models/entities";

export class UserMapper implements Mapper<UserDTO, UserPrisma> {
  toDTO(persistence: UserPrisma): UserDTO {
    return new UserDTO({
      email     : persistence.email,
      balance   : persistence.balance,
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
