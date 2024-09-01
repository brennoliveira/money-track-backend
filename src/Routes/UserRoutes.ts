import { Router } from "express";
import { UserController } from "../Controllers";

const router = Router();

const userController = new UserController();

//User Routes

//POST
router.post('/users', userController.createUser.bind(userController));

//GET
router.get('/users', userController.findUserByEmail.bind(userController));

//Transaction Routes

export default router;