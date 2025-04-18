import { Request, Response } from "express";
import { CategoryService } from "../Services";

export class CategoryController {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  //No Route Yet
  async findCategoryById(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId, userId } = req.body;

      const category = await this.categoryService.findCategoryById(categoryId, userId);

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async findCategoriesByUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.userId;

      const categories = await this.categoryService.findCategoriesByUser(Number(userId));

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async createCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const userId = req.user?.userId;

      const category = await this.categoryService.createCategory(name, Number(userId));

      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}