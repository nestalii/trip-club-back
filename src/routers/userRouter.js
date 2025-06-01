import { Router } from 'express';
import userController from '../controllers/UserController.js';

const userRouter = new Router();

userRouter.patch('/', userController.update);
userRouter.get('/trips', userController.getUserTrips);
userRouter.delete('/', userController.delete);

export default userRouter;