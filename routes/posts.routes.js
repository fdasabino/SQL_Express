const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  createPost,
  getPostById,
  deletePost,
  updatePost,
} = require("../controllers/posts.controller");

// * GET /api/posts
router.get("/", getAllPosts);

// * POST /api/posts
router.post("/", createPost);

// *  GET /api/posts/:postId
router.get("/:postId", getPostById);

// * DELETE /api/posts/:postId
router.delete("/:postId", deletePost);

// * UPDATE /api/posts/postId
router.patch("/:postId", updatePost);

module.exports = router;
