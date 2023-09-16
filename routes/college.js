const express = require('express');
const router = express.Router();
const College  = require('../model/College'); // Import your MongoDB models

// Create a new college
router.post('/create', async (req, res) => {
  try {
    const {
      name,
      location,
      coursesOffered,
      courseCategoriesOffered,
      contactInfo,
      ranking,
      imageUrl,
      collegePageLink,
      // Add other college-related fields here
    } = req.body;

    const newCollege = new College({
      name,
      location,
      coursesOffered,
      courseCategoriesOffered,
      contactInfo,
      ranking,
      imageUrl,
      collegePageLink,
      // Add other college-related fields here
    });

    const savedCollege = await newCollege.save();
    res.status(201).json(savedCollege);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all colleges
router.get('/get', async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get college by ID
router.get('/getcolleges/:collegeId', async (req, res) => {
  try {
    const collegeId = req.params.collegeId;
    const college = await College.findById(collegeId);
    if (!college) {
      res.status(404).json({ error: 'College not found' });
      return;
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a college by ID
router.put('/update/:collegeId', async (req, res) => {
  try {
    const collegeId = req.params.collegeId;
    const updatedCollege = await College.findByIdAndUpdate(collegeId, req.body, {
      new: true,
    });
    if (!updatedCollege) {
      res.status(404).json({ error: 'College not found' });
      return;
    }
    res.json(updatedCollege);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a college by ID
router.delete('/delete/:collegeId', async (req, res) => {
  try {
    const collegeId = req.params.collegeId;
    const deletedCollege = await College.findByIdAndRemove(collegeId);
    if (!deletedCollege) {
      res.status(404).json({ error: 'College not found' });
      return;
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
