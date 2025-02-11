const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json("Welcome to the blog API - SQL version");
});

// > routes
const postsRoutes = require("./routes/posts.routes");
const usersRoutes = require("./routes/users.routes");

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// app.get("/usersfiltered", (req, res) => {
//   db.all(`SELECT * FROM users WHERE email LIKE "%@me.com%"`, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     console.log("Data fetched", rows);
//     res.json({ message: "Data fetched", data: rows, ok: true });
//   });
// });

// app.get("/usersjoined", (req, res) => {
//   db.all(
//     `SELECT posts.title, posts.content, users.name FROM posts JOIN users ON posts.author_id = users.id;`,
//     (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       console.log("Data fetched", rows);
//       res.json({ message: "Data fetched", data: rows, ok: true });
//     }
//   );
// });

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
