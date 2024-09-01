import { IUserDTO } from "../interfaces";

export class UserDTO implements IUserDTO{
  public id?        : number;
  public email      : string;
  public password?  : string;
  public balance    : number;
  public createdAt? : Date;
  public updatedAt? : Date;

  constructor(user: UserDTO) {
    this.id        = user.id;
    this.email     = user.email;
    this.password  = user.password;
    this.balance   = user.balance;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}