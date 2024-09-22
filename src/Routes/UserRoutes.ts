import { Router } from "express";
import { CategoryController, TransactionController, UserController } from "../Controllers";

const router = Router();

const userController = new UserController();
const categoryController = new CategoryController();
const transactionController = new TransactionController();

//-------User Routes--------//

//POST
router.post('/users', userController.createUser.bind(userController));

//GET
router.get('/users', userController.findUserByEmail.bind(userController));

//-------User Routes--------//

//-------Category Routes--------//

//POST
router.post('/users/:userId/categories', categoryController.createCategory.bind(categoryController));

//GET
router.get('/users/:userId/categories', categoryController.findCategoriesByUser.bind(categoryController));

//-------Transaction Routes--------//

//POST
router.post('/users/:userId/transactions', transactionController.createTransaction.bind(transactionController));

//GET
router.get('/users/:userId/transactions', transactionController.getUserTransactions.bind(transactionController));
router.get('/users/:userId/transactions/:transactionId', transactionController.getTransaction.bind(transactionController));

//DELETE
router.delete('/users/:userId/transactions/:transactionId', transactionController.deleteTransaction.bind(transactionController));

//-------Transaction Routes--------//

export default router;