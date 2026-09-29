import express from 'express';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experience.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getExperience)
  .post(protect, createExperience);

router.route('/:id')
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

export default router;
