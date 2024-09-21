import { CategoryDTO } from "../Models/entities";
import { CategoryRepository } from "../Repositories";

export class CategoryService {
  private readonly categoryRepository: CategoryRepository;

  constructor(){
    this.categoryRepository = new CategoryRepository();
  }

  async findCategoryById(id: number, userId: number): Promise<CategoryDTO | null>{
    const category = await this.categoryRepository.getCategoryById(id, userId);

    if (!category) throw new Error('Category not found');

    return category;
  }

  async findCategoriesByUser(userId: number): Promise<CategoryDTO[] | null> {
    const categories = await this.categoryRepository.getUserCategories(userId);

    return categories;
  }

  async createCategory(name: string, userId: number): Promise<CategoryDTO> {
    const category = await this.categoryRepository.createCategory(name, userId);

    return category;
  }
}