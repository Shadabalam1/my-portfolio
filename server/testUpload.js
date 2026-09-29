import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testUpload() {
  try {
    console.log('Testing Cloudinary upload...');
    console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME);
    
    // Create a dummy text file
    fs.writeFileSync('dummy.txt', 'Hello world');
    
    const result = await cloudinary.uploader.upload('dummy.txt', {
      resource_type: 'raw',
      folder: 'test'
    });
    
    console.log('Upload successful!', result.secure_url);
    
    // Cleanup
    fs.unlinkSync('dummy.txt');
  } catch (error) {
    console.error('Upload failed:');
    console.error(error);
  }
}

testUpload();
