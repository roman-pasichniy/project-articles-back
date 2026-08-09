import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser } from '../controllers/auth/registerUser.js';
import { registerUserModel} from '../validations/authValidation.js';

const router = Router();

router.post(
  '/register',
  celebrate(registerUserModel),
  registerUser,
);

export const authRouter = router;
