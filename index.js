const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json("Welcome to the blog API - SQL version");
});

// > routes
const postsRoutes = require("./routes/posts.routes");
// const usersRoutes = require("./routes/users.routes");

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
