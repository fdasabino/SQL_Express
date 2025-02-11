const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbpath = path.resolve(__dirname, "../blog.db");
const db = new sqlite3.Database(dbpath);

const getAllPosts = (req, res) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Data fetched", rows);
    res.json(rows);
  });
};

module.exports = {
  getAllPosts,
};
