import { Router } from 'express';
import { verifyController } from './verify.controller';
import { auth } from '../../middleware/auth';

const router = Router();

// Route to create an order
router.post('/',auth("USER","ADMIN"),verifyController.createVerifyController);
router.get('/all-payment',auth("ADMIN"),verifyController.getAllVerifyInFo);

export const verifyUserRoutes = router;