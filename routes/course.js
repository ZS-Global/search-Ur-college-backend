const express = require('express');
const router = express.Router();
const Course= require('../model/Course'); // Import your MongoDB models

// Create a new course
router.post('/create', async (req, res) => {
  try {
    const {
      name,
      description,
      duration,
      fee,
      college,
      category,
      // Add other course-related fields here
    } = req.body;

    const newCourse = new Course({
      name,
      description,
      duration,
      fee,
      college,
      category,
      // Add other course-related fields here
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all courses
router.get('/getall', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get course by ID
router.get('/get/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course by ID
router.put('/update/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a course by ID
router.delete('/delete/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const deletedCourse = await Course.findByIdAndRemove(courseId);
    if (!deletedCourse) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
