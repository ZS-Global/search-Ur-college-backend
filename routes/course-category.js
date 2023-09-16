const express = require('express');
const router = express.Router();
const CourseCategory = require('../model/CourseCategory'); // Import your MongoDB models

// Create a new course category
router.post('/create', async (req, res) => {
  try {
    const { name, subcategories, college, description } = req.body;
    const newCategory = new CourseCategory({
      name,
      subcategories,
      college,
      description,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all course categories
router.get('/getall', async (req, res) => {
  try {
    const categories = await CourseCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get course category by ID
router.get('/get/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await CourseCategory.findById(categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course category by ID
router.put('/update/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updatedCategory = await CourseCategory.findByIdAndUpdate(categoryId, req.body, {
      new: true,
    });
    if (!updatedCategory) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a course category by ID
router.delete('/delete/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await CourseCategory.findByIdAndRemove(categoryId);
    if (!deletedCategory) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
