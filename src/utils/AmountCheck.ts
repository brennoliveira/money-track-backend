import { TransactionTypes } from "../Models/enums";

export function CheckAmount(amount: number, type: TransactionTypes): number {
  if (type === TransactionTypes.INCOME) {
    return Math.abs(amount);
  } else {
    return amount > 0 ? -amount : amount;
  }
}