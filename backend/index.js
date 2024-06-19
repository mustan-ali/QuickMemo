const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const userRoute = require("./routes/UserRoute");

app.use(cors());
app.use(express.json());
app.use(userRoute);

const ConnectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

app.listen(PORT, () => {
  ConnectDatabase();
  console.log(`Server is running on port ${PORT}`);
});
