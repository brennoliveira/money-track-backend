import { InternalServerError, NotFoundError } from '../Errors';
import { TransactionDTO } from '../Models/entities';
import { TransactionRepository } from '../Repositories';
import { AppError } from '../Utils';

export class TransactionService {
  private readonly transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async getUserTransactions(userId: number): Promise<TransactionDTO[] | null> {
    try {
      return await this.transactionRepository.getUserTransactions(userId);
    } catch (err) {
      throw new InternalServerError('Failed to retrieve transactions');
    }
  }

  async getTransaction(userId: number, transactionId: number): Promise<TransactionDTO> {
    try {
      const transaction = await this.transactionRepository.getTransaction(userId, transactionId);
      if (!transaction) throw new NotFoundError('Transaction not found');
      return transaction;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError('Error fetching transaction');
    }
  }

  async createTransaction(data: TransactionDTO): Promise<TransactionDTO> {
    try {
      return await this.transactionRepository.createTransaction(data);
    } catch (err) {
      throw new InternalServerError('Error creating transaction');
    }
  }

  async deleteTransaction(userId: number, transactionId: number): Promise<void> {
    try {
      const exists = await this.transactionRepository.getTransaction(userId, transactionId);
      if (!exists) throw new NotFoundError('Transaction not found');
      await this.transactionRepository.deleteTransaction(userId, transactionId);
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError('Error deleting transaction');
    }
  }

  async updateTransaction(userId: number, data: TransactionDTO): Promise<void> {
    try {
      const exists = await this.transactionRepository.getTransaction(userId, Number(data.id));
      if (!exists) throw new NotFoundError('Transaction not found');
      await this.transactionRepository.updateTransaction(userId, data);
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError('Error updating transaction');
    }
  }
}
