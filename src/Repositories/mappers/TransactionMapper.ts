import { Transactions as TransactionPrisma, Categories as CategoryPrisma } from "@prisma/client";
import { TransactionDTO } from "../../Models/entities";
import { Mapper } from "./IMapper";
import { TransactionTypes } from "../../Models/enums";
import { CategoryMapper } from "./CategoryMapper";

type FullCategoryPrisma = TransactionPrisma & {
  category? : CategoryPrisma,
}

export class TransactionMapper implements Mapper<TransactionDTO, TransactionPrisma> {
  private readonly categoryMapper: CategoryMapper;

  constructor(){
    this.categoryMapper = new CategoryMapper();
  }

  toDTO(persistence: FullCategoryPrisma): TransactionDTO {
    //TODO: Use CategoryMapper
    // const category = persistence.category ? this.categoryMapper.toDTO(persistence.category) : undefined;
    return new TransactionDTO({
      id              : persistence.id,
      amount          : persistence.amount,
      type            : persistence.type as TransactionTypes,
      transactionDate : persistence.transactionDate,
      createdAt       : persistence.createdAt,
      userId          : persistence.userId,
      categoryId      : persistence.categoryId,
      
      category        : persistence.category,
    });
  }

  toDTOList(persistence: FullCategoryPrisma[]): TransactionDTO[] {
    return persistence.map(this.toDTO);
  }
}