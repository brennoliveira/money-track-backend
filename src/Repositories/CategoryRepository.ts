import { CategoryDTO } from "../Models/entities";
import { ICategoryRepository } from "./interfaces";
import { CategoryMapper } from "./mappers";
import { Repositoy } from "./Repository";

export class CategoryRepository extends Repositoy implements ICategoryRepository {
  private readonly repository = this.getRepository().category;
  private readonly categoryMapper = new CategoryMapper();

  async getCategoryById(id: number, userId: number): Promise<CategoryDTO | null> {
    try {
      const category = await this.repository.findUniqueOrThrow({
        where: {
          id,
          userId,
        }
      });
      return category ? this.categoryMapper.toDTO(category) : null;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getUserCategories(userId: number): Promise<CategoryDTO[] | null> {
    try {
      const categories = await this.repository.findMany({
        where: {  
          userId,
        }
      });
  
      return categories ? this.categoryMapper.toDTOList(categories) : null;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async createCategory(name: string, userId: number): Promise<CategoryDTO> {
    try {
      const category = await this.repository.create({
        data: {
          name,
          userId,
        }
      });
      return this.categoryMapper.toDTO(category);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}