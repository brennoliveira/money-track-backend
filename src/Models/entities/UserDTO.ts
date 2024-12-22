import { IUserDTO } from "../interfaces";

export class UserDTO implements IUserDTO{
  id         : number;
  name       : string;
  email      : string;
  password?  : string;
  balance    : number;
  createdAt? : Date;
  updatedAt? : Date;

  constructor(user: UserDTO) {
    this.id        = user.id;
    this.name      = user.name;
    this.email     = user.email;
    this.password  = user.password;
    this.balance   = user.balance;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}