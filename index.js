const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Root route
app.get("/", (req, res) => {
  res.json("Welcome to the blog API - SQL version");
});

// Routes
const postsRoutes = require("./routes/posts.routes");
const usersRoutes = require("./routes/users.routes");

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// Graceful handling of unexpected errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit process if a critical error occurs
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  // Optional: add monitoring/logging service to track the error
});

// Start the server
const PORT = process.env.PORT || 8000;

// Ensure the app listens on the correct port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Migration
try {
  require("./migration")();
} catch (error) {
  console.error("Migration failed:", error.message);
}
