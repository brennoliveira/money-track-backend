import { Router } from "express";
import { CategoryController, TransactionController, UserController } from "../Controllers";
import { authenticateToken } from "../Middlewares";

const router = Router();

const userController = new UserController();
const categoryController = new CategoryController();
const transactionController = new TransactionController();

//-------User Routes--------//

//POST
router.post('/users', userController.createUser.bind(userController));
router.post('/login', userController.login.bind(userController));

//GET
router.get('/users', userController.findUserByEmail.bind(userController));
router.get('/users/:userId', userController.findUserById.bind(userController));
router.get(`/users/balance`, authenticateToken, userController.getUserBalance.bind(userController));

//-------User Routes--------//

//-------Category Routes--------//

//POST
router.post('/users/categories', authenticateToken, categoryController.createCategory.bind(categoryController));

//GET
router.get('/users/categories', authenticateToken, categoryController.findCategoriesByUser.bind(categoryController));

//-------Transaction Routes--------//

//POST
router.post('/users/transactions', authenticateToken, transactionController.createTransaction.bind(transactionController));

//GET
router.get('/users/transactions', authenticateToken, transactionController.getUserTransactions.bind(transactionController));
router.get('/users/transactions/:transactionId', authenticateToken, transactionController.getTransaction.bind(transactionController));

//DELETE
router.delete('/users/transactions/:transactionId', authenticateToken, transactionController.deleteTransaction.bind(transactionController));

//-------Transaction Routes--------//

export default router;