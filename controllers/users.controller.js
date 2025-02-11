const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbpath = path.resolve(__dirname, "../../../sql/blog.db");
const db = new sqlite3.Database(dbpath);

const getAllUsers = (req, res) => {
  db.all("SELECT * FROM users ORDER BY name DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Data fetched", rows);
    res.json(rows);
  });
};

const getUserById = (req, res) => {
  db.all(`SELECT name, email, id FROM users WHERE id = ${req.params.userId}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Data fetched", rows);
    res.json({ message: "Data fetched", data: rows, ok: true });
  });
};

const getFilteredUsers = (req, res) => {
  db.all(`SELECT * FROM users WHERE email LIKE "%@me.com%"`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Data fetched", rows);
    res.json({ message: "Data fetched", data: rows, ok: true });
  });
};

const getUsersJoined = (req, res) => {
  db.all(
    `SELECT posts.title, posts.content, users.name FROM posts JOIN users ON posts.author_id = users.id`,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log("Data fetched", rows);
      res.json({ message: "Data fetched", data: rows, ok: true });
    }
  );
};

module.exports = {
  getAllUsers,
  getUserById,
  getFilteredUsers,
  getUsersJoined,
};
