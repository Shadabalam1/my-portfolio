import Profile from '../models/Profile.js';

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    if (profile) {
      res.json(profile);
    } else {
      res.json({ message: 'Profile not found, returning empty object', data: {} });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update profile
// @route   PUT /api/profile
// @access  Private/Admin
export const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();

    if (profile) {
      // Update
      profile.name = req.body.name || profile.name;
      profile.title = req.body.title || profile.title;
      profile.heroTagline = req.body.heroTagline !== undefined ? req.body.heroTagline : profile.heroTagline;
      profile.shortBio = req.body.shortBio !== undefined ? req.body.shortBio : profile.shortBio;
      profile.about = req.body.about !== undefined ? req.body.about : profile.about;
      profile.yearsOfExperience = req.body.yearsOfExperience !== undefined ? req.body.yearsOfExperience : profile.yearsOfExperience;
      profile.projectsCompleted = req.body.projectsCompleted !== undefined ? req.body.projectsCompleted : profile.projectsCompleted;
      profile.profileImage = req.body.profileImage || profile.profileImage;
      profile.email = req.body.email || profile.email;
      profile.phone = req.body.phone || profile.phone;
      profile.location = req.body.location || profile.location;
      profile.github = req.body.github || profile.github;
      profile.linkedin = req.body.linkedin || profile.linkedin;
      profile.otherLinks = req.body.otherLinks || profile.otherLinks;

      const updatedProfile = await profile.save();
      res.json(updatedProfile);
    } else {
      // Create
      profile = await Profile.create(req.body);
      res.status(201).json(profile);
    }
  } catch (error) {
    next(error);
  }
};
