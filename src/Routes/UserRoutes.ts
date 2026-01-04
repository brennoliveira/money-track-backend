import { Router } from "express";
import { CategoryController, TransactionController, UserController } from "../Controllers";
import { authenticateToken } from "../Middlewares";

const router = Router();

const userController = new UserController();
const categoryController = new CategoryController();
const transactionController = new TransactionController();

//-------User Routes--------//

//POST
/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 */
router.post('/users', userController.createUser.bind(userController));

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Users
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

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get logged user data
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data
 *       401:
 *         description: Unauthorized
 */
router.get('/users/me', authenticateToken, userController.findUserById.bind(userController));

/**
 * @openapi
 * /api/users/me/balance:
 *   get:
 *     summary: Get user balance
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User balance
 *       401:
 *         description: Unauthorized
 */
router.get('/users/me/balance', authenticateToken, userController.getUserBalance.bind(userController));

//-------User Routes--------//


//-------Category Routes--------//

//POST
/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post('/categories', authenticateToken, categoryController.createCategory.bind(categoryController));

//GET
/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: List user categories
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/categories', authenticateToken, categoryController.findCategoriesByUser.bind(categoryController));

//-------Category Routes--------//


//-------Transaction Routes--------//

//POST
/**
 * @openapi
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created successfully
 */
router.post('/transactions', authenticateToken, transactionController.createTransaction.bind(transactionController));

//GET
/**
 * @openapi
 * /api/transactions:
 *   get:
 *     summary: List user transactions
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/transactions', authenticateToken, transactionController.getUserTransactions.bind(transactionController));

/**
 * @openapi
 * /api/transactions/{transactionId}:
 *   get:
 *     summary: Get transaction by ID
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction data
 *       404:
 *         description: Transaction not found
 */
router.get('/transactions/:transactionId', authenticateToken, transactionController.getTransaction.bind(transactionController));

//DELETE
/**
 * @openapi
 * /api/transactions/{transactionId}:
 *   delete:
 *     summary: Delete a transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Transaction deleted
 */
router.delete('/transactions/:transactionId', authenticateToken, transactionController.deleteTransaction.bind(transactionController));

//PUT
/**
 * @openapi
 * /api/transactions/{transactionId}:
 *   put:
 *     summary: Update a transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Transaction updated
 */
router.put('/transactions/:transactionId', authenticateToken, transactionController.updateTransaction.bind(transactionController));

//-------Transaction Routes--------//


export default router;