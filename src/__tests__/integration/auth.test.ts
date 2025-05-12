import request from 'supertest'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import app from '../..'
import { UserDTO } from '../../Models/entities'
import { BcryptService } from '../../Utils'

const prisma = new PrismaClient()
const hashService = new BcryptService();

describe('Auth Integration', () => {
  const testUser: UserDTO = {
    id: 1,
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    balance: 0,
  }

  beforeAll(async () => {
    const hashedPassword = hashService.encrypt(String(testUser.password))

    await prisma.users.create({
      data: {
        name: testUser.name,
        email: testUser.email,
        password: hashedPassword
      }
    })
  })

  afterAll(async () => {
    await prisma.users.deleteMany({
      where: { email: testUser.email }
    })
    await prisma.$disconnect()
  })

  it('should authenticate user and return token', async () => {
    const response = await request(app).post('/api/login').send({
      email: testUser.email,
      password: testUser.password
    })

    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('token')
    expect(typeof response.body.data.token).toBe('string')
  })
})
