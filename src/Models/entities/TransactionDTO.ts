import { TransactionTypes } from "../enums";
import { ITransactionDTO } from "../interfaces";
import { CategoryDTO } from "./CategoryDTO";
import { UserDTO } from "./UserDTO";

export class TransactionDTO implements ITransactionDTO {
  id?             : number;
  amount          : number;
  type            : TransactionTypes;
  transactionDate : Date;
  createdAt?      : Date;
  updatedAt?      : Date;
  userId          : number;
  categoryId      : number;

  user?           : UserDTO;
  category?       : CategoryDTO;

  constructor(transaction: TransactionDTO) {
    this.id              = transaction.id;
    this.amount          = transaction.amount;
    this.type            = transaction.type;
    this.transactionDate = transaction.transactionDate;
    this.createdAt       = transaction.createdAt;
    this.updatedAt       = transaction.updatedAt;
    this.userId          = transaction.userId;
    this.categoryId      = transaction.categoryId;
    this.user            = transaction.user;
    this.category        = transaction.category;
  }
}