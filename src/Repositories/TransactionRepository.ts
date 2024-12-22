import { TransactionDTO } from "../Models/entities";
import { TransactionTypes } from "../Models/enums";
import { ITransactionRepository } from "./interfaces";
import { TransactionMapper } from "./mappers";
import { Repositoy } from "./Repository";

export class TransactionRepository extends Repositoy implements ITransactionRepository {
  private readonly repository = this.getRepository().transactions;
  private readonly transactionMapper = new TransactionMapper();

  async getUserTransactions(userId: number): Promise<TransactionDTO[] | null> {
    try {
      const transactions = await this.repository.findMany({
        where: {
          userId,
        },
        include: {
          category: true,
        }
      });

      return transactions ? this.transactionMapper.toDTOList(transactions) : null;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getTransaction(userId: number, transactionId: number): Promise<TransactionDTO | null> {
    try {
      const transaction = await this.repository.findUniqueOrThrow({
        where: {
          userId,
          id: transactionId,
        }
      });

      return transaction ? this.transactionMapper.toDTO(transaction) : null;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async createTransaction(tr: TransactionDTO): Promise<TransactionDTO> {
    try {
      const transaction = await this.repository.create({
        data: {
          title           : tr.title,
          amount          : tr.amount,
          type            : tr.type,
          userId          : tr.userId,
          categoryId      : tr.categoryId,
          transactionDate : tr.transactionDate,
        },
      });

      return this.transactionMapper.toDTO(transaction);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async deleteTransaction(userId: number, transactionId: number): Promise<number> {
    try {
      const res = await this.repository.delete({
        where: {
          userId,
          id: transactionId,
        }
      });

      return res.amount;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async updateTransaction(userId: number, transaction: TransactionDTO): Promise<number> {
    try {
      const res = await this.repository.update({
        where: {
          userId,
          id: transaction.id,
        },
        data: {
          amount: transaction.amount,
          description: transaction.description,
          title: transaction.title,
          transactionDate: transaction.transactionDate,
          type: transaction.type,
          updatedAt: new Date(),
        }
      });
      return res.amount;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}