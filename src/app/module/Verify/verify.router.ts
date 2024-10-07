import { Router } from 'express';
import { createVerifyController } from './verify.controller';
import { auth } from '../../middleware/auth';

const router = Router();

// Route to create an order
router.post('/',auth("USER","ADMIN"),createVerifyController);

export const verifyUserRoutes = router;