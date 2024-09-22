import { Transactions as TransactionPrisma } from "@prisma/client";
import { TransactionDTO } from "../../Models/entities";
import { Mapper } from "./IMapper";
import { TransactionTypes } from "../../Models/enums";

export class TransactionMapper implements Mapper<TransactionDTO, TransactionPrisma> {
  toDTO(persistence: TransactionPrisma): TransactionDTO {
    return new TransactionDTO({
      amount     : persistence.amount,
      type       : persistence.type as TransactionTypes,
      createdAt  : persistence.createdAt,
      userId     : persistence.userId,
      categoryId : persistence.categoryId,
    });
  }

  toDTOList(persistence: TransactionPrisma[]): TransactionDTO[] {
    return persistence.map(this.toDTO);
  }
}