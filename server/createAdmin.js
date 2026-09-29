import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminExists = await Admin.findOne({ email: 'admin@example.com' });
    
    if (adminExists) {
      console.log('Admin user already exists. Deleting it to recreate with correct password...');
      await Admin.deleteOne({ email: 'admin@example.com' });
    }

    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'password123'
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
