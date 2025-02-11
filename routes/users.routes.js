const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getFilteredUsers,
  getUsersJoined,
} = require("../controllers/users.controller");

// * GET /api/users
router.get("/", getAllUsers);

// * GET /api/users/usersfiltered
router.get("/filtered", getFilteredUsers);

// * GET /api/users/joined
router.get("/joined", getUsersJoined);

// * GET /api/users/:userId
router.get("/:userId", getUserById);

module.exports = router;
