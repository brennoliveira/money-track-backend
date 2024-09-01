export interface IUserDTO {
  id?        : number;
  email      : string;
  password?  : string;
  balance    : number;
  createdAt? : Date;
  updatedAt? : Date;
}