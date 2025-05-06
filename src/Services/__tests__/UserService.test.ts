import bcrypt from "bcrypt";
import { UserRepository } from "../../Repositories";
import { UserService } from "../UserService";
import { AppError } from "../../Utils";

jest.mock("../../Repositories/UserRepository");

const MockedUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>;

describe("UserService", () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = new MockedUserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService();
  });

  describe("createUser", () => {
    it("should create a user with hashed password", async () => {
      userRepository.findUserByEmail.mockResolvedValue(null);
      userRepository.createUser.mockImplementation(async (name, email, password) => ({
        id: 1,
        name,
        email,
        password,
        balance: 0,
      }));

      const user = await userService.createUser("John Doe", "john@example.com", "password123");

      expect(user.name).toBe("John Doe");
      expect(user.email).toBe("john@example.com");
      expect(bcrypt.compareSync("password123", String(user.password))).toBeTruthy();
    });

    it("should throw if email already exists", async () => {
      userRepository.findUserByEmail.mockResolvedValue({ id: 1, email: "john@example.com", name: "John", password: "hash", balance: 0 });

      await expect(userService.createUser("John", "john@example.com", "password")).rejects.toThrow(AppError);
    });
  });

  describe("login", () => {
    it("should login successfully with correct credentials", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      userRepository.findUserByEmail.mockResolvedValue({ id: 1, email: "john@example.com", name: "John", password: hashedPassword, balance: 0 });

      const user = await userService.login("john@example.com", "password123");

      expect(user).toBeDefined();});

    it("should throw if email not found", async () => {
      userRepository.findUserByEmail.mockResolvedValue(null);

      await expect(userService.login("notfound@example.com", "password123")).rejects.toThrow(AppError);
    });

    it("should throw if password is incorrect", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      userRepository.findUserByEmail.mockResolvedValue({ id: 1, email: "john@example.com", name: "John", password: hashedPassword, balance: 0 });

      await expect(userService.login("john@example.com", "wrongpass")).rejects.toThrow(AppError);
    });
  });

  describe("findUserByEmail", () => {
    it("should return user by email", async () => {
      const user = { id: 1, email: "john@example.com", name: "John", password: "hashed", balance: 0 };
      userRepository.findUserByEmail.mockResolvedValue(user);

      const result = await userService.findUserByEmail("john@example.com");
      expect(result).toEqual(user);
    });
  });

  describe("findUserById", () => {
    it("should return user by id", async () => {
      const user = { id: 1, email: "john@example.com", name: "John", password: "hashed", balance: 0 };
      userRepository.findUserById.mockResolvedValue(user);

      const result = await userService.findUserById(1);
      expect(result).toEqual(user);
    });
  });

  describe("getUserBalance", () => {
    it("should return user balance", async () => {
      userRepository.getUserBalance.mockResolvedValue(1);

      const result = await userService.getUserBalance(1);
      expect(result).toBe(1000);
    });
  });
});
