import { TransactionTypes } from "../enums";
import { ITransactionDTO } from "../interfaces";

export class TransactionDTO implements ITransactionDTO {
  id?        : number;
  amount     : number;
  type       : TransactionTypes;
  createdAt? : Date;
  updatedAt? : Date;
  userId     : number;
  categoryId : number;

  constructor(transaction: TransactionDTO) {
    this.id         = transaction.id;
    this.amount     = transaction.amount;
    this.type       = transaction.type;
    this.createdAt  = transaction.createdAt;
    this.updatedAt  = transaction.updatedAt;
    this.userId     = transaction.userId;
    this.categoryId = transaction.categoryId;
  }
}