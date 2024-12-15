import { TransactionDTO } from "../Models/entities";
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
        data: tr,
      });

      return this.transactionMapper.toDTO(transaction);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async deleteTransaction(userId: number, transactionId: number): Promise<undefined> {
    try {
      await this.repository.delete({
        where: {
          userId,
          id: transactionId,
        }
      });

    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}