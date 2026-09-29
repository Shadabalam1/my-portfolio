import express from 'express';
import { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, createProject);

router.route('/:slug')
  .get(getProjectBySlug);

router.route('/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
