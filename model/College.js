const mongoose = require('mongoose');

// Define MongoDB schema for the College collection

const CollegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    city: String,
    state: String,
    country: String,
    // You can further customize the location structure as needed.
  },
  coursesOffered: [
    {
      type: String,
    },
  ],
  courseCategoriesOffered: [
    {
      type: String,
    },
  ],
  contactInfo: {
    address: String,
    phone: String,
    email: String,
    website: String,
  },
  ranking: {
    type: Number,
    
  },
  imageUrl: String, // URL to the college image
  collegePageLink: String, // Link to the college's webpage
  // Other college-related fields like facilities, admissions, fees, etc.
});

// Create and export the College model
const College = mongoose.model('College', CollegeSchema);

module.exports = College;
