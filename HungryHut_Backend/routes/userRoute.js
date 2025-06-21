import express from 'express'
import { changePass, getUserProfile, logInUser,registerUser, resetPassword } from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',logInUser);
userRouter.patch('/change-password',authMiddleware,changePass);
userRouter.get('/profile', authMiddleware,getUserProfile);
userRouter.post('/reset-password',resetPassword);

export default userRouter;