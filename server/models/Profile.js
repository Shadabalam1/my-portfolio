import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  shortBio: { type: String },
  heroTagline: { type: String },
  about: { type: String },
  yearsOfExperience: { type: Number, default: 0 },
  projectsCompleted: { type: Number, default: 0 },
  profileImage: { type: String },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  github: { type: String },
  linkedin: { type: String },
  otherLinks: { type: Map, of: String },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
