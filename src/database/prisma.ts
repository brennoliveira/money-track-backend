import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { pool } from './pool';

export const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});
