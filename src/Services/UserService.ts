import { UserDTO } from '../Models/entities';
import { UserRepository } from '../Repositories';
import { BcryptService } from '../Utils';

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly bcryptService: BcryptService;

  constructor(){
    this.userRepository = new UserRepository();
    this.bcryptService  = new BcryptService();
  }

  async createUser(email: string, password: string): Promise<UserDTO> {

    const hashedPassword = this.bcryptService.encrypt(password);

    const user = await this.userRepository.createUser(email, hashedPassword);

    return user;
  }
}