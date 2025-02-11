const express = require("express");
const router = express.Router();

const { getAllPosts } = require("../controllers/posts.controller");

// * GET /api/posts
router.get("/", getAllPosts);

module.exports = router;
