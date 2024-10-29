const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/products.js");

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/v1/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  connect();
  console.log(`Productos service running on port ${PORT}`);
});