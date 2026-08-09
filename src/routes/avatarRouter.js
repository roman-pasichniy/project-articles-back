import { Router } from 'express';
import {authMiddleware} from '../middleware/auth.middleware.js';
import { updateUserAvatar } from '../controllers/users/userAvatar.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.patch(
  '/me/avatar',
  authMiddleware,
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;