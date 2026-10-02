import Experience from '../models/Experience.js';

// @desc    Get all experience
// @route   GET /api/experience
// @access  Public
export const getExperience = async (req, res, next) => {
  try {
    const experiences = await Experience.find({}).sort({ order: 1 }).lean();
    res.json(experiences);
  } catch (error) {
    next(error);
  }
};

// @desc    Create an experience entry
// @route   POST /api/experience
// @access  Private/Admin
export const createExperience = async (req, res, next) => {
  try {
    const experience = new Experience(req.body);
    const createdExperience = await experience.save();
    res.status(201).json(createdExperience);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an experience entry
// @route   PUT /api/experience/:id
// @access  Private/Admin
export const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      Object.assign(experience, req.body);
      const updatedExperience = await experience.save();
      res.json(updatedExperience);
    } else {
      res.status(404);
      throw new Error('Experience not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an experience entry
// @route   DELETE /api/experience/:id
// @access  Private/Admin
export const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      await Experience.deleteOne({ _id: experience._id });
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404);
      throw new Error('Experience not found');
    }
  } catch (error) {
    next(error);
  }
};
