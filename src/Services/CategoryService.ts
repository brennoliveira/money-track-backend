import { CategoryDTO } from "../Models/entities";
import { CategoryRepository } from "../Repositories";
import { InternalServerError, NotFoundError } from "../Errors";
import { AppError } from "../Util";

export class CategoryService {
  private readonly categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async findCategoryById(id: number, userId: number): Promise<CategoryDTO> {
    try {
      const category = await this.categoryRepository.getCategoryById(id, userId);
      if (!category) throw new NotFoundError("Category not found");

      return category;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError("Error finding category");
    }
  }

  async findCategoriesByUser(userId: number): Promise<CategoryDTO[]> {
    try {
      const categories = await this.categoryRepository.getUserCategories(userId);
      if (!categories || categories.length === 0) throw new NotFoundError("Category not found");

      return categories;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError("Error retrieving categories");
    }
  }

  async createCategory(name: string, userId: number): Promise<CategoryDTO> {
    try {
      const category = await this.categoryRepository.createCategory(name, userId);
      return category;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError("Error creating category");
    }
  }
}
