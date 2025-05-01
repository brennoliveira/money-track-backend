import { Request, Response, NextFunction } from "express";
import { TransactionService } from "../Services";
import { TransactionTypes } from "../Models/enums";
import { CreatedResponse, OkResponse } from "../Responses";

export class TransactionController {
  private readonly transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  async getUserTransactions(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.user?.userId;
      const transactions = await this.transactionService.getUserTransactions(Number(userId));
      return res.status(200).json(new OkResponse(transactions));
    } catch (error) {
      next(error);
    }
  }

  async getTransaction(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { transactionId } = req.params;
      const userId = req.user?.userId;
      const transaction = await this.transactionService.getTransaction(Number(userId), Number(transactionId));
      return res.status(200).json(new OkResponse(transaction));
    } catch (error) {
      next(error);
    }
  }

  async createTransaction(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { title, amount, type, categoryId, transactionDate, description } = req.body;
      const userId = req.user?.userId;

      const transaction = await this.transactionService.createTransaction({
        title,
        amount: Number(amount),
        type: type as TransactionTypes,
        userId: Number(userId),
        categoryId: Number(categoryId),
        transactionDate: new Date(transactionDate),
        description,
      });

      return res.status(201).json(new CreatedResponse(transaction));
    } catch (error) {
      next(error);
    }
  }

  async deleteTransaction(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { transactionId } = req.params;
      const userId = req.user?.userId;

      await this.transactionService.deleteTransaction(Number(userId), Number(transactionId));
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async updateTransaction(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { title, amount, type, categoryId, transactionDate, description } = req.body;
      const { transactionId } = req.params;
      const userId = req.user?.userId;

      await this.transactionService.updateTransaction(Number(userId), {
        id: Number(transactionId),
        title,
        amount: Number(amount),
        description,
        categoryId: Number(categoryId),
        transactionDate: new Date(transactionDate),
        type: type as TransactionTypes,
        userId: Number(userId),
      });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
