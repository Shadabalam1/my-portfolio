import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  description: { type: String },
  features: [{ type: String }],
  technologies: [{ type: String }],
  thumbnail: { type: String },
  images: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0, index: true },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
