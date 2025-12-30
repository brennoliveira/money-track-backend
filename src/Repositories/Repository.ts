import 'dotenv/config';
import fs from 'fs/promises';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma';

export class Repositoy {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  protected getRepository() {
    return this.prisma;
  }

  // Função para gerar e executar consultas SQL dinâmicas
  protected async createQuery(
    sqlPath: string,
    params: { key: string; value: string | number }[]
  ): Promise<any> {
    // Lê a query do arquivo
    const query = await fs.readFile(sqlPath, 'utf-8');

    // Substitui os parâmetros no SQL
    let finalQuery = query;
    for (const param of params) {
      finalQuery = finalQuery.replace(new RegExp(param.key, 'g'), String(param.value));
    }

    // Executa a consulta SQL
    return this.prisma.$queryRawUnsafe(finalQuery);
  }
}
