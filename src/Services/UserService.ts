import { UserDTO } from '../Models/entities';
import { CategoryRepository, UserRepository } from '../Repositories';
import { BcryptService } from '../Utils';

export class UserService {
  private readonly userRepository     : UserRepository;
  private readonly categoryRepository : CategoryRepository;
  private readonly bcryptService      : BcryptService;

  constructor(){
    this.userRepository     = new UserRepository();
    this.categoryRepository = new CategoryRepository();
    this.bcryptService      = new BcryptService();
  }

  async createUser(name: string, email: string, password: string): Promise<UserDTO> {

    const hashedPassword = this.bcryptService.encrypt(password);

    const user = await this.userRepository.createUser(name, email, hashedPassword);

    //TODO: ver um jeito melhor de setar categorias iniciais
    if (user) {
      await this.categoryRepository.createCategory('Compras', user.id)
      await this.categoryRepository.createCategory('Salário', user.id)
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = this.userRepository.findUserByEmail(email);

    return user;
  }

  async findUserById(userId: number): Promise<UserDTO | null> {
    const user = this.userRepository.findUserById(userId);

    if (!user) throw new Error(`User not found`);

    return user;
  }

  async getUserBalance(userId: number): Promise<number> {
    const balance = this.userRepository.getUserBalance(userId);

    if (!balance) throw new Error(`Balance not found`);

    return balance;
  }
}