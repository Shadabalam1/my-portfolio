import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String },
  level: { type: Number, min: 1, max: 100 },
  order: { type: Number, default: 0, index: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
