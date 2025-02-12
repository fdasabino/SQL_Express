const sql = require("./db");

const migrate = async () => {
  await sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );
  `;
  await sql`
   CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id)
  );`;

  await sql`CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    posts_id INTEGER NOT NULL REFERENCES posts(id),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

  await sql`CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
  );`;

  await sql` CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    tag_name TEXT NOT NULL UNIQUE
  );`;

  await sql`CREATE TABLE IF NOT EXISTS post_tags (
    post_id INTEGER REFERENCES posts(id),
    tag_id INTEGER REFERENCES tags(id),
    PRIMARY KEY (post_id, tag_id)
  );`;

  console.log("Tables created");
};

module.exports = migrate;
