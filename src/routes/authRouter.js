import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser } from '../controllers/auth/registerUser.js';
import { registerUserSchema } from '../validations/authValidation.js';

const router = Router();

router.post(
  '/register',
  celebrate(registerUserSchema),
  registerUser,
);

export const authRouter = router;
