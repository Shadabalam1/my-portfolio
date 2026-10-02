import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import { protect } from '../middleware/auth.middleware.js';
import streamifier from 'streamifier';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadToCloudinary = (buffer, folder = 'portfolio', originalname = '') => {
  return new Promise((resolve, reject) => {
    const resourceType = folder.includes('resume') ? 'raw' : 'auto';
    
    const options = {
      folder: folder,
      resource_type: resourceType,
    };

    if (resourceType === 'raw' && originalname) {
      const ext = originalname.split('.').pop();
      options.public_id = `resume_${Date.now()}.${ext}`;
    }

    const cld_upload_stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};

router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const folder = req.body.folder || 'portfolio';
    const result = await uploadToCloudinary(req.file.buffer, folder, req.file.originalname);

    res.status(200).json({
      message: 'File uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    // Replace %2F with / as the ID might contain slashes
    const publicId = decodeURIComponent(id);
    
    await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting file', error: error.message });
  }
});

export default router;
