import Message from '../models/Message.js';
import sendEmail from '../utils/sendEmail.js';

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

    // Send email notification if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await sendEmail({
          subject: `New Portfolio Message from ${createdMessage.name}`,
          message: `You have received a new message from your portfolio website.\n\nName: ${createdMessage.name}\nEmail: ${createdMessage.email}\n\nMessage:\n${createdMessage.message}`,
          html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${createdMessage.name}</p>
            <p><strong>Email:</strong> ${createdMessage.email}</p>
            <hr/>
            <p><strong>Message:</strong></p>
            <p>${createdMessage.message.replace(/\n/g, '<br/>')}</p>
          `
        });
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Do not fail the request if email fails, just log it
      }
    }

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
