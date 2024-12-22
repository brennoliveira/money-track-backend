import { Request, Response } from "express";
import { TransactionService } from "../Services";
import { TransactionTypes } from "../Models/enums";

export class TransactionController {
  private readonly transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  async getUserTransactions(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.userId;

      const transactions = await this.transactionService.getUserTransactions(Number(userId));

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve transactions' });
    }
  }

  async getTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { transactionId } = req.params;
      const userId = req.user?.userId;

      const transaction = await this.transactionService.getTransaction(Number(userId), Number(transactionId));

      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async createTransaction(req: Request, res: Response): Promise<Response> {
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

      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async deleteTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { transactionId } = req.params;
      const userId = req.user?.userId;

      await this.transactionService.deleteTransaction(Number(userId), Number(transactionId));
      return res.status(201).json({ message: "Transação excluída" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}