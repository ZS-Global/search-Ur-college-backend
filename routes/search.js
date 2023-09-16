const express = require('express');
const router = express.Router();
const College = require('../model/College'); // Import the College model
const Course = require('../model/Course'); // Import the Course model
const Exam = require('../model/Exam'); // Import the Exam model

// Define a route for searching colleges, courses, and exams
router.get('/get', async (req, res) => {
  const query = req.query.q; // Get the search query from the request query parameters

  try {
    // Search for colleges, courses, and exams based on the query
    const colleges = await College.find({ name: { $regex: query, $options: 'i' } });
    const courses = await Course.find({ name: { $regex: query, $options: 'i' } });
    const exams = await Exam.find({ name: { $regex: query, $options: 'i' } });
    // data = {colleges, courses, exams };
    // const keys = ["name"];
    // // const search = (data) => {
    //     return data.filter((item) => {
    //         return item.filter((itm=>{
    //             keys.some((key) => itm[key].toLowerCase().includes(q))
    //     }
    // };
    //     ));
    //     );
    // };
    // Return the search results as JSON
    res.json({ colleges, courses, exams });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
