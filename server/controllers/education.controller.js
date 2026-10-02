import Education from '../models/Education.js';

// @desc    Get all education
// @route   GET /api/education
// @access  Public
export const getEducation = async (req, res, next) => {
  try {
    const education = await Education.find({}).sort({ order: 1 }).lean();
    res.json(education);
  } catch (error) {
    next(error);
  }
};

// @desc    Create an education entry
// @route   POST /api/education
// @access  Private/Admin
export const createEducation = async (req, res, next) => {
  try {
    const education = new Education(req.body);
    const createdEducation = await education.save();
    res.status(201).json(createdEducation);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an education entry
// @route   PUT /api/education/:id
// @access  Private/Admin
export const updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);

    if (education) {
      Object.assign(education, req.body);
      const updatedEducation = await education.save();
      res.json(updatedEducation);
    } else {
      res.status(404);
      throw new Error('Education not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an education entry
// @route   DELETE /api/education/:id
// @access  Private/Admin
export const deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);

    if (education) {
      await Education.deleteOne({ _id: education._id });
      res.json({ message: 'Education removed' });
    } else {
      res.status(404);
      throw new Error('Education not found');
    }
  } catch (error) {
    next(error);
  }
};
