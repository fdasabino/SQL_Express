const sql = require("../db");

const getAllUsers = async (req, res) => {
  try {
    const users = await sql`SELECT * FROM users ORDER BY name DESC`;

    if (users.length === 0) {
      res.status(404).json({ error: "No users found" });
      return;
    }

    console.log("Data fetched", users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users", details: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const user = await sql`SELECT name, email, id FROM users WHERE id = ${userId}`;

    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    console.log("Data fetched", user);
    res.status(200).json({
      message: "Data fetched",
      data: user[0], // Return a single user object
      ok: true,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user", details: err.message });
  }
};

const getFilteredUsers = async (req, res) => {
  try {
    const users = await sql`SELECT * FROM users WHERE email LIKE '%@me.com%'`;

    if (users.length === 0) {
      res.status(404).json({ error: "No users found" });
      return;
    }

    console.log("Data fetched", users);
    res.status(200).json({
      message: "Data fetched",
      data: users,
      ok: true,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch filtered users", details: err.message });
  }
};

const getUsersJoined = async (req, res) => {
  try {
    const usersPosts = await sql`
      SELECT posts.title, posts.content, users.name 
      FROM posts 
      JOIN users ON posts.author_id = users.id`;

    if (usersPosts.length === 0) {
      res.status(404).json({ error: "No data found" });
      return;
    }

    console.log("Data fetched", usersPosts);
    res.status(200).json({
      message: "Data fetched",
      data: usersPosts,
      ok: true,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch joined data", details: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: "Name and email are required" });
      return;
    }

    const newUser = await sql`
      INSERT INTO users (name, email) 
      VALUES (${name}, ${email}) 
      RETURNING *`;

    res.status(201).json({
      message: "User created successfully",
      data: newUser[0],
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create user", details: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const deletedUser = await sql`
      DELETE FROM users WHERE id = ${userId} RETURNING *`;

    if (deletedUser.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser[0],
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user", details: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    if (!name && !email) {
      res.status(400).json({ error: "Name or email is required to update" });
      return;
    }

    const updatedUser = await sql`
      UPDATE users 
      SET 
        name = COALESCE(${name}, name), 
        email = COALESCE(${email}, email) 
      WHERE id = ${userId} 
      RETURNING *`;

    if (updatedUser.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser[0],
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user", details: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getFilteredUsers,
  getUsersJoined,
  createUser,
  deleteUser,
  updateUser,
};
