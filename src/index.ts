import { PrismaClient } from '@prisma/client';
import express from 'express';
import router from './Routes/UserRoutes';
import cors from 'cors';
import { errorHandler } from './Middlewares/ErrorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './docs/swagger';

const app = express();
const prisma = new PrismaClient();


app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('API is running.');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;