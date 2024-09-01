import { Router } from "express";
import { UserController } from "../Controllers";

const router = Router();

const userController = new UserController();

//User Routes
router.post('/users', userController.createUser.bind(userController));

//Transaction Routes

export default router;