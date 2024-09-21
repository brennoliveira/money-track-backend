import { Router } from "express";
import { CategoryController, UserController } from "../Controllers";

const router = Router();

const userController = new UserController();
const categoryController = new CategoryController();

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

export default router;