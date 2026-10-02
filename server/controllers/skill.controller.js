import Skill from '../models/Skill.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({}).sort({ order: 1 }).lean();
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = async (req, res, next) => {
  try {
    const skill = new Skill(req.body);
    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (skill) {
      Object.assign(skill, req.body);
      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } else {
      res.status(404);
      throw new Error('Skill not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (skill) {
      await Skill.deleteOne({ _id: skill._id });
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404);
      throw new Error('Skill not found');
    }
  } catch (error) {
    next(error);
  }
};
