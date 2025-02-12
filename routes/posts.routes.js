const express = require("express");
const router = express.Router();
const { getAllPosts, getPostById, createPost } = require("../controllers/posts.controller");

// * GET /api/posts
router.get("/", getAllPosts);

// *  GET /api/posts/:postId
router.get("/:postId", getPostById);

// // * POST /api/posts
router.post("/", createPost);

// // * DELETE /api/posts/:postId
// router.delete("/:postId", deletePost);

// // * UPDATE /api/posts/postId
// router.patch("/:postId", updatePost);

module.exports = router;
