import { Router } from 'express';
import authController from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authRouter = new Router();

authRouter.post('/sign-up', authController.signUp);
authRouter.post('/sign-in', authController.signIn);
authRouter.get('/me', authMiddleware, authController.getMe);

export default authRouter;
