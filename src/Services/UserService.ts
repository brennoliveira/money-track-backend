import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../Errors';
import { UserDTO } from '../Models/entities';
import { TransactionTypes } from '../Models/enums';
import { CategoryRepository, TransactionRepository, UserRepository } from '../Repositories';
import { AppError, BcryptService, JWTService } from '../Util';

export class UserService {
  private readonly userRepository        : UserRepository;
  private readonly categoryRepository    : CategoryRepository;
  private readonly transactionRepository : TransactionRepository;
  private readonly bcryptService         : BcryptService;
  private readonly jwtService            : JWTService;

  constructor(){
    this.userRepository        = new UserRepository();
    this.categoryRepository    = new CategoryRepository();
    this.transactionRepository = new TransactionRepository();
    this.bcryptService         = new BcryptService();
    this.jwtService            = new JWTService();
  }

  async createUser(name: string, email: string, password: string): Promise<UserDTO> {
    try {
      const userExists = await this.userRepository.findUserByEmail(email);
      if (userExists) throw new BadRequestError('E-mail already in use');

      const hashedPassword = this.bcryptService.encrypt(password);

      const user = await this.userRepository.createUser(name, email, hashedPassword);

      //TODO: ver um jeito melhor de setar categorias iniciais
      if (user) {
        await this.categoryRepository.createCategory('Compras', user.id)
        await this.categoryRepository.createCategory('Salário', user.id)
      }

      return user;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError('Error creating user');
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) throw new UnauthorizedError('Invalid e-mail or password');

      const isPasswordValid = await this.bcryptService.compareValues(password, String(user.password));
      if (!isPasswordValid) throw new UnauthorizedError('Invalid e-mail or password');

      const token = this.jwtService.generateToken(Number(user.id));
      return token;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError('Error logging in');
    }
  }

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    try {
      const user = await this.userRepository.findUserByEmail(email);

      if (!user) throw new NotFoundError('User not found');

      return user;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError('Error finding user by email');
    }
  }

  async findUserById(userId: number): Promise<UserDTO | null> {
    try {
      const user = await this.userRepository.findUserById(userId);

      if (!user) throw new NotFoundError('User not found');

      return user;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError('Error finding user by ID');
    }
  }

  async getUserBalance(userId: number): Promise<number> {
    try {
      const transactions = await this.transactionRepository.getUserTransactions(userId);
      if (!transactions) throw new NotFoundError('Transactions not found');
      
      const balance = transactions.reduce((acc, transaction) => {
        if (transaction.type === TransactionTypes.INCOME) {
          return acc + transaction.amount;
        } else {
          return acc - transaction.amount;
        }
      }, 0);

      if (balance === null || balance === undefined)
        throw new NotFoundError('Balance not found');

      return balance;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerError('Error retrieving user balance');
    }
  }
}
