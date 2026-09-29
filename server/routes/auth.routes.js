import express from 'express';
import { loginAdmin, getAdminProfile, setupAdmin, updateAdminProfile } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/setup', setupAdmin); // Temporary route to create initial admin
router.get('/me', protect, getAdminProfile);
router.put('/me', protect, updateAdminProfile);

export default router;
