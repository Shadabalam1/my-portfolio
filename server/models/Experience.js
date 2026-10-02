import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  employmentType: { type: String },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
  responsibilities: [{ type: String }],
  technologies: [{ type: String }],
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0, index: true },
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
