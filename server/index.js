const express = require("express");
const cors = require("cors");
require("dotenv").config();

const projectsRouter = require("./routes/projects");
const skillsRouter = require("./routes/skills");
const experienceRouter = require("./routes/experience");
const contactRouter = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/projects", projectsRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/contact", contactRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio API is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
