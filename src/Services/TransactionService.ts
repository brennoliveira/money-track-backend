import { TransactionDTO } from "../Models/entities";
import { TransactionTypes } from "../Models/enums";
import { TransactionRepository } from "../Repositories";
import { CheckAmount } from "../Utils";

export class TransactionService {
  private readonly transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async getUserTransactions(userId: number): Promise<TransactionDTO[] | null> {
    const transactions = await this.transactionRepository.getUserTransactions(userId);

    if (!transactions) throw new Error(`Transactions not found`);

    return transactions;
  }

  async getTransaction(userId: number, transactionId: number): Promise<TransactionDTO> {
    const transaction = await this.transactionRepository.getTransaction(userId, transactionId);

    if (!transaction) throw new Error('Transaction not found');

    return transaction;
  }

  async createTransaction(tr: TransactionDTO): Promise<TransactionDTO> {

    const amount = CheckAmount(tr.amount, tr.type);
    
    const transaction = await this.transactionRepository.createTransaction({
      ...tr,
      amount,
    });

    if (!transaction) throw new Error('Not able to create transaction');

    return transaction;
  }

  async deleteTransaction(userId: number, transactionId: number): Promise<undefined> {
    await this.deleteTransaction(userId, transactionId);
  }
}