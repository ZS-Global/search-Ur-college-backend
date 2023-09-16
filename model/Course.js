const mongoose = require('mongoose');

// Define MongoDB schema for the Course collection

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  duration: String,
 
  fee: Number,
  // Additional fields can be added based on your requirements:
  // - Course topics or modules
  // - Admission requirements
  // - Faculty information
  // - Accreditation details
  // - Reviews and ratings
  // - ...

  // Example fields for associations:
  college: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
  }
 ]
  ,
  category: [
    {
    type: String,
  }
  ],
  // ...

  // Timestamps for when the course was created and last updated
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Course model
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
