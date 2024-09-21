import { ICategoryDTO } from "../interfaces";

export class CategoryDTO implements ICategoryDTO {
  id?        : number;
  name       : string;
  createdAt? : Date;
  userId     : number;

  constructor(category: CategoryDTO){
    this.id        = category.id;
    this.name      = category.name;
    this.createdAt = category.createdAt;
    this.userId    = category.userId;
  }
}