import express from 'express';
import { getMessages, getMessageById, createMessage, updateMessageStatus, deleteMessage } from '../controllers/message.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getMessages)
  .post(createMessage);

router.route('/:id')
  .get(protect, getMessageById)
  .delete(protect, deleteMessage);

router.route('/:id/read')
  .patch(protect, updateMessageStatus);

export default router;
