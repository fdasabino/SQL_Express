const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const dbpath = path.resolve(__dirname, "../../sql/blog.db");
const db = new sqlite3.Database(dbpath);

app.get("/", (req, res) => {
  res.json("Welcome to the blog API - SQL version");
});

app.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Data fetched", rows);
    res.json(rows);
  });
});

app.get("/users", (req, res) => {
  db.all("SELECT * FROM users ORDER BY name DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Data fetched", rows);
    res.json(rows);
  });
});

app.get("/users/:id", (req, res) => {
  db.all(`SELECT name, email, id FROM users WHERE id = ${req.params.id}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Data fetched", rows);
    res.json({ message: "Data fetched", data: rows, ok: true });
  });
});

app.get("/usersfiltered", (req, res) => {
  db.all(`SELECT * FROM users WHERE email LIKE "%@me.com%"`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Data fetched", rows);
    res.json({ message: "Data fetched", data: rows, ok: true });
  });
});

app.get("/usersjoined", (req, res) => {
  db.all(
    `SELECT posts.title, posts.content, users.name FROM posts JOIN users ON posts.author_id = users.id;`,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log("Data fetched", rows);
      res.json({ message: "Data fetched", data: rows, ok: true });
    }
  );
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
