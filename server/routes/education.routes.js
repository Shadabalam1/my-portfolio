import express from 'express';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../controllers/education.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getEducation)
  .post(protect, createEducation);

router.route('/:id')
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

export default router;
