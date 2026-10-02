import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
  order: { type: Number, default: 0, index: true },
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);

export default Education;
