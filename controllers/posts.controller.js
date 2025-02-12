const sql = require("../db");

const getAllPosts = async (req, res) => {
  try {
    const posts = await sql`SELECT * FROM posts`;

    if (posts.length === 0) {
      res.status(404).json({ error: "No posts found" });
      return;
    }

    res.status(200).json({
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts", details: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      res.status(400).json({ error: "Post ID is required" });
      return;
    }

    const post = await sql`SELECT * FROM posts WHERE id = ${postId}`;

    if (post.length === 0) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(200).json({
      message: "Post fetched successfully",
      data: post[0], // Assuming you want to return a single post object
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the post", details: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, author_id } = req.body;

    if (!title || !content || !author_id) {
      res.status(400).json({ error: "Title, content, and author ID are required" });
      return;
    }

    const query = await sql`
      INSERT INTO posts (title, content, author_id) 
      VALUES (${title}, ${content}, ${author_id}) 
      RETURNING *`;

    res.status(201).json({
      message: "Post created successfully",
      data: query[0], // Return the newly created post
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post", details: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      res.status(400).json({ error: "Post ID is required" });
      return;
    }

    const result = await sql`DELETE FROM posts WHERE id = ${postId} RETURNING *`;

    if (result.length === 0) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(200).json({
      message: "Post deleted successfully",
      data: result[0], // Return the deleted post
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post", details: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;

    if (!postId) {
      res.status(400).json({ error: "Post ID is required" });
      return;
    }

    if (!title || !content) {
      res.status(400).json({ error: "Title and content are required to update the post" });
      return;
    }

    const updatedPost = await sql`
      UPDATE posts 
      SET title = ${title}, content = ${content} 
      WHERE id = ${postId} 
      RETURNING *`;

    if (updatedPost.length === 0) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(200).json({
      message: "Post updated successfully",
      data: updatedPost[0], // Return the updated post
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update post", details: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
};
