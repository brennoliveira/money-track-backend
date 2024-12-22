import { TransactionDTO } from "../../Models/entities";

export interface ITransactionRepository {
  getUserTransactions(userId: number): Promise<TransactionDTO[] | null>;
  getTransaction(userId: number, transactionId: number): Promise<TransactionDTO | null>;
  createTransaction(transaction: TransactionDTO): Promise<TransactionDTO>;
  deleteTransaction(userId: number, transactionId: number): Promise<number>;
}