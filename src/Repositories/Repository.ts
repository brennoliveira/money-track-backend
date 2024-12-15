import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';

export class Repositoy {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();  // Aqui cria a instância corretamente
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
