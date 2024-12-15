import { Categories as CategoryPrisma } from "@prisma/client"
import { CategoryDTO } from "../../Models/entities";
import { Mapper } from "./IMapper";

export class CategoryMapper implements Mapper<CategoryDTO, CategoryPrisma> {
  toDTO(persistence: CategoryPrisma): CategoryDTO {
    return new CategoryDTO({
      id        : persistence.id,
      name      : persistence.name,
      createdAt : persistence.createdAt,
      userId    : persistence.userId,
    });
  }

  toDTOList(persistence: CategoryPrisma[]): CategoryDTO[] {
    return persistence.map(this.toDTO);
  }
}