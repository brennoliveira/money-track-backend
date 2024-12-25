import { PrismaClient } from '@prisma/client';
import express from 'express';
import router from './Routes/UserRoutes';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('API is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});