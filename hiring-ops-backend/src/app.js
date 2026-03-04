const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config({ path: path.join(__dirname, ".env") });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HiringOps API running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});