import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../Services";

export class CategoryController {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  // Ainda sem rota definida
  async findCategoryById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { categoryId } = req.params;
      const userId = req.user?.userId;

      const category = await this.categoryService.findCategoryById(Number(categoryId), Number(userId));
      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  async findCategoriesByUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.user?.userId;

      const categories = await this.categoryService.findCategoriesByUser(Number(userId));
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name } = req.body;
      const userId = req.user?.userId;

      const category = await this.categoryService.createCategory(name, Number(userId));
      return res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
}
