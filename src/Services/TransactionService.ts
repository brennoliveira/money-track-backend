import { TransactionDTO } from "../Models/entities";
import { TransactionTypes } from "../Models/enums";
import { TransactionRepository, UserRepository } from "../Repositories";
import { CheckAmount } from "../Utils";

export class TransactionService {
  private readonly transactionRepository: TransactionRepository;
  private readonly userRepository: UserRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.userRepository = new UserRepository();
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

    await this.userRepository.updateBalance(tr.userId, amount);

    return transaction;
  }

  async deleteTransaction(userId: number, transactionId: number): Promise<undefined> {
    const amount = await this.transactionRepository.deleteTransaction(userId, transactionId);

    await this.userRepository.updateBalance(userId, -amount);
  }

  async updateTransaction(userId: number, transaction: TransactionDTO): Promise<void> {

    const originalTransaction = await this.getTransaction(Number(userId), Number(transaction.id));
    
    
    if (!originalTransaction) throw new Error("Transação não encontrada");
    
    const originalAmount = CheckAmount(originalTransaction.amount, originalTransaction.type);
    
    const updatedAmount = CheckAmount(transaction.amount, transaction.type || originalTransaction.type);
    
    const balanceAdjustment = updatedAmount - originalAmount;
    
    await this.transactionRepository.updateTransaction(userId, {
      id: originalTransaction.id,
      title: transaction.title || originalTransaction.title,
      amount: updatedAmount,
      type: transaction.type as TransactionTypes || originalTransaction.type,
      categoryId: Number(transaction.categoryId) || originalTransaction.categoryId,
      userId: Number(userId),
      description: transaction.description || originalTransaction.description,
      //TODO: atualizar data não funciona
      transactionDate: transaction.transactionDate || originalTransaction.transactionDate,
    });
    console.log(1)

    await this.userRepository.updateBalance(userId, balanceAdjustment);
  }
}