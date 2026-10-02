import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  shortBio: { type: String },
  heroTagline: { type: String },
  heroDescription: { type: String },
  primaryBtnText: { type: String },
  primaryBtnLink: { type: String },
  secondaryBtnText: { type: String },
  secondaryBtnLink: { type: String },
  availabilityText: { type: String },
  resumeUrl: { type: String },
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
