import { PrismaClient } from '@prisma/client';
import express from 'express';
import router from './Routes/UserRoutes';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('API is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});