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
      const { userId } = req.params;

      const transactions = await this.transactionService.getUserTransactions(Number(userId));

      if (!transactions) return res.status(404).json({ error: 'Transactions not found' });

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve transactions' });
    }
  }

  async getTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, transactionId } = req.params;

      const transaction = await this.transactionService.getTransaction(Number(userId), Number(transactionId));

      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async createTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { amount, type, categoryId } = req.body;
      
      const { userId } = req.params;

      const transaction = await this.transactionService.createTransaction({
        amount,
        type: type as TransactionTypes,
        userId: Number(userId),
        categoryId,
      });

      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async deleteTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, transactionId } = req.params;

      await this.transactionService.deleteTransaction(Number(userId), Number(transactionId));

      return res.status(201);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}