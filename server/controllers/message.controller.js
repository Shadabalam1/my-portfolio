import Message from '../models/Message.js';

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private/Admin
export const getMessageById = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      res.json(message);
    } else {
      res.status(404);
      throw new Error('Message not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a message
// @route   POST /api/messages
// @access  Public
export const createMessage = async (req, res, next) => {
  try {
    const message = new Message(req.body);
    const createdMessage = await message.save();
    res.status(201).json(createdMessage);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read/unread
// @route   PATCH /api/messages/:id/read
// @access  Private/Admin
export const updateMessageStatus = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      message.isRead = req.body.isRead;
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404);
      throw new Error('Message not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      await Message.deleteOne({ _id: message._id });
      res.json({ message: 'Message removed' });
    } else {
      res.status(404);
      throw new Error('Message not found');
    }
  } catch (error) {
    next(error);
  }
};
