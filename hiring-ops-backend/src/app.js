const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const noteRoutes = require("./routes/noteRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const connectDB = require("./config/db");

dotenv.config({ path: path.join(__dirname, ".env") });
connectDB();
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/test", (req, res) => {
  res.json({
    message: "API working"
  });
});

app.get("/", (req, res) => {
  res.send("HiringOps API running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});