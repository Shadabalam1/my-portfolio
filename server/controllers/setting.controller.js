import Setting from '../models/Setting.js';

// @desc    Get settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    const settings = await Setting.findOne().lean();
    if (settings) {
      res.json(settings);
    } else {
      res.json({ message: 'Settings not found, returning empty object', data: {} });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();

    if (settings) {
      // Update
      Object.assign(settings, req.body);
      const updatedSettings = await settings.save();
      res.json(updatedSettings);
    } else {
      // Create
      settings = await Setting.create(req.body);
      res.status(201).json(settings);
    }
  } catch (error) {
    next(error);
  }
};
