import { CategoryDTO } from "../../Models/entities";

export interface ICategoryRepository {
  getCategoryById(id: number, userId: number): Promise<CategoryDTO | null>;
  getUserCategories(userId: number): Promise<CategoryDTO[] | null>;
  createCategory(name: string, userId: number): Promise<CategoryDTO>;
}