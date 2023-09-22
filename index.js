const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const courseRoute = require("./routes/course");
const CourseCategoryRoute = require("./routes/course-category");
const collegeRoute = require("./routes/college");
const searchRoutes = require("./routes/search");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Mongoose Schema and Models for educational content (e.g., courses, articles, videos)

// Define your routes for creating, updating, and retrieving educational content
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/course", courseRoute);
app.use("/api/course-category", CourseCategoryRoute);
app.use("/api/college", collegeRoute);
app.use('/api/search', require('./routes/search'));
app.use("/api/lists", require('./routes/lists'));
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
