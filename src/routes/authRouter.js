import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser } from '../controllers/registerUser.js';
import { registerUserSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);

export default router;
