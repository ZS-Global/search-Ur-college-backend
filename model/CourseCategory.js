const mongoose = require('mongoose');

// Define MongoDB schema for the educational website

// Course Category schema
const CourseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }
  ], // Subcategories under this category
  exams: [
    {
        type: String,
    }
  ], // Subcategories under this category
  college: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
  }
  ],
  description: String
});

// Create and export the CourseCategory model
const College = mongoose.model('CourseCategory', CourseCategorySchema);

module.exports = College;