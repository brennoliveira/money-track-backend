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
/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                 statusCode:
 *                    type: number
 *                    example: 200
 *                 success:
 *                    type: boolean
 *       401:
 *         description: Invalid e-mail or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 */
router.post('/login', userController.login.bind(userController));

//GET
router.get('/users', userController.findUserByEmail.bind(userController));
router.get('/users/me', authenticateToken, userController.findUserById.bind(userController));
router.get(`/balance`, authenticateToken, userController.getUserBalance.bind(userController));

//-------User Routes--------//


//-------Category Routes--------//

//POST
router.post('/categories', authenticateToken, categoryController.createCategory.bind(categoryController));

//GET
router.get('/categories', authenticateToken, categoryController.findCategoriesByUser.bind(categoryController));

//-------Category Routes--------//


//-------Transaction Routes--------//

//POST
router.post('/transactions', authenticateToken, transactionController.createTransaction.bind(transactionController));

//GET
router.get('/transactions', authenticateToken, transactionController.getUserTransactions.bind(transactionController));
router.get('/transactions/:transactionId', authenticateToken, transactionController.getTransaction.bind(transactionController));

//DELETE
router.delete('/transactions/:transactionId', authenticateToken, transactionController.deleteTransaction.bind(transactionController));

//PUT
router.put('/transactions/:transactionId', authenticateToken, transactionController.updateTransaction.bind(transactionController)); 

//-------Transaction Routes--------//


export default router;