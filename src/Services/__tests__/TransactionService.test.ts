import { NotFoundError } from "../../Errors";
import { TransactionDTO } from "../../Models/entities";
import { TransactionTypes } from "../../Models/enums";
import { TransactionRepository } from "../../Repositories";
import { TransactionService } from "../TransactionService";

jest.mock("../../Repositories/TransactionRepository");

const MockedTransactionRepository = TransactionRepository as jest.MockedClass<typeof TransactionRepository>;

describe("TransactionService", () => {
  let service: TransactionService;
  let repository: jest.Mocked<TransactionRepository>;

  beforeEach(() => {
    repository = new MockedTransactionRepository() as jest.Mocked<TransactionRepository>;
    service = new TransactionService();
    (service as any).transactionRepository = repository;
  });

  describe("getUserTransactions", () => {
    it("should return transactions for the given user", async () => {
      const mockTransactions: TransactionDTO[] = [
        { 
            title: "Test Transaction",
            id: 1, 
            userId: 1, 
            categoryId: 1, 
            amount: 100, 
            type: TransactionTypes.INCOME, 
            transactionDate: new Date() 
        },
      ];

      repository.getUserTransactions.mockResolvedValue(mockTransactions);

      const result = await service.getUserTransactions(1);

      expect(result).toEqual(mockTransactions);
      expect(repository.getUserTransactions).toHaveBeenCalledWith(1);
    });
  });

  describe("getTransaction", () => {
    it("should return a specific transaction if it exists", async () => {
      const transaction: TransactionDTO = {
        title: "Test Transaction",
        id: 1, 
        userId: 1, 
        categoryId: 1, 
        amount: 100, 
        type: TransactionTypes.INCOME, 
        transactionDate: new Date() 
      };

      repository.getTransaction.mockResolvedValue(transaction);

      const result = await service.getTransaction(1, 1);

      expect(result).toEqual(transaction);
      expect(repository.getTransaction).toHaveBeenCalledWith(1, 1);
    });

    it("should throw NotFoundError if transaction does not exist", async () => {
      repository.getTransaction.mockResolvedValue(null);

      await expect(service.getTransaction(1, 999)).rejects.toThrow(NotFoundError);
    });
  });

  describe("createTransaction", () => {
    it("should create and return a new transaction", async () => {
      const input: TransactionDTO = {
        title: "Test Transaction",
        id: 1, 
        userId: 1, 
        categoryId: 1, 
        amount: 100, 
        type: TransactionTypes.INCOME, 
        transactionDate: new Date() 
      };

      const created = { ...input, id: 1 };

      repository.createTransaction.mockResolvedValue(created);

      const result = await service.createTransaction(input);

      expect(result).toEqual(created);
      expect(repository.createTransaction).toHaveBeenCalledWith(input);
    });
  });

  describe("deleteTransaction", () => {
    it("should delete transaction if it exists", async () => {
      repository.getTransaction.mockResolvedValue({
          title: "Test Transaction",
          id: 1,
          userId: 1,
          categoryId: 1,
          amount: 100,
          type: TransactionTypes.INCOME,
          transactionDate: new Date()
      });

      repository.deleteTransaction.mockResolvedValue(1);

      await service.deleteTransaction(1, 1);

      expect(repository.deleteTransaction).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundError if transaction does not exist", async () => {
      repository.getTransaction.mockResolvedValue(null);

      await expect(service.deleteTransaction(1, 999)).rejects.toThrow(NotFoundError);
    });
  });

  describe("updateTransaction", () => {
    it("should update and return transaction if it exists", async () => {
      const data: TransactionDTO = {
        title: "Test Transaction",
        id: 1,
        userId: 1,
        categoryId: 1,
        amount: 100,
        type: TransactionTypes.INCOME,
        transactionDate: new Date()
    };

      repository.getTransaction.mockResolvedValue(data);
      repository.updateTransaction.mockResolvedValue(1);

      const result = await service.updateTransaction(1, data);

      expect(result).toEqual(data);
      expect(repository.updateTransaction).toHaveBeenCalledWith(data);
    });

    it("should throw NotFoundError if transaction does not exist", async () => {
      const data: TransactionDTO = {
        title: "Test Transaction",
        id: 1,
        userId: 1,
        categoryId: 1,
        amount: 100,
        type: TransactionTypes.INCOME,
        transactionDate: new Date()
    };

      repository.getTransaction.mockResolvedValue(null);

      await expect(service.updateTransaction(1, data)).rejects.toThrow(NotFoundError);
    });
  });
});
