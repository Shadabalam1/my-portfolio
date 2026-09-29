import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'My Portfolio' },
  siteDescription: { type: String },
  favicon: { type: String },
  footerText: { type: String },
  contactEmail: { type: String },
  socialLinks: { type: Map, of: String },
  resumeUrl: { type: String },
}, { timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;
