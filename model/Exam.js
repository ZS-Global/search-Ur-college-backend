const mongoose = require('mongoose');

// Define MongoDB schema for the EntranceExam collection

const ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  CourseCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseCategory',
    },
  ],
  // Other exam-related fields can be added here.
});

// Create and export the EntranceExam model
const Exam = mongoose.model('Exam', ExamSchema);

module.exports = Exam;
