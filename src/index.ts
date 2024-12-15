import { PrismaClient } from '@prisma/client';
import express from 'express';
import router from './Routes/UserRoutes';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Permite apenas esta origem
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('API is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});