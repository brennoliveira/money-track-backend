import { Prisma, PrismaClient } from "@prisma/client";
import fs from 'fs';

export class Repositoy {
  constructor(private readonly connection: PrismaClient = new PrismaClient()) {}

  protected getRepository(){ return this.connection };
  
  //TODO: tipar params
  protected createQuery(sql: string, params: any ) {
    let query = fs.readFileSync(sql).toString();

    for (const param of params) {
      query = query.replace(param.key, String(param.value));
    }
    return Prisma.sql([query]);
  }
}