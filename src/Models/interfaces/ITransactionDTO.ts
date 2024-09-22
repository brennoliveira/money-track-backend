import { TransactionTypes } from "../enums";

export interface ITransactionDTO {
  id?        : number;
  amount     : number;
  type       : TransactionTypes;
  createdAt? : Date;
  updatedAt? : Date;
  userId     : number;
  categoryId : number;
}