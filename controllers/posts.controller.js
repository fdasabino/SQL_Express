const sql = require("../db");

const getAllPosts = async (req, res) => {
  const posts = await sql`SELECT * FROM posts`;

  if (!posts) {
    res.status(404).json({ error: "Posts not found" });
    return;
  }

  res.status(200).json({
    message: "Posts fetched successfully",
    data: posts,
  });
};

const getPostById = async (req, res) => {
  const postId = req.params.postId;

  if (!postId) {
    res.status(400).json({ error: "Post id is required to find post by id" });
    return;
  }

  const post = await sql`SELECT * FROM posts WHERE id = ${postId}`;

  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.status(200).json({
    message: "Post fetched successfully",
    data: post,
  });

  // Add the db query to get a post by id
  // db.all(`SELECT * FROM posts WHERE id = ${req.params.postId}`, (err, rows) => {
  //   if (err) {
  //     res.status(500).json({ error: err.message });
  //     return;
  //   }
  //   console.log("Data fetched", rows);
  //   res.json(rows);
  // });
  // use req.params.id to get the post id
  // response with the post
};

// const createPost = (req, res) => {
//   // use req.body to get the post data
//   const { title, content, author_id } = req.body;
//   console.log("Post data", title, content, author_id);

//   const query = `INSERT INTO posts (title, content, author_id) VALUES ('${title}', '${content}', ${author_id})`;

//   // Add the db query to insert a new post
//   db.run(query, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }

//     // validation
//     if (!title || !content || !author_id) {
//       res.status(400).json({ error: "Title, content and author_id are required" });
//       return;
//     }

//     // response with the new post
//     res.status(201).json({
//       post: {
//         title,
//         content,
//         author_id,
//       },
//       message: "Post created successfully",
//     });
//   });
// };

// const deletePost = (req, res) => {
//   // Add the db query to delete a post
//   db.all(`DELETE FROM posts WHERE id = ${req.params.postId}`, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.status(200).json({
//       message: "Post successfully deleted",
//       rows,
//     });
//   });
//   // use req.params.id to get the post id
//   // response with the deleted post
// };

// const updatePost = (req, res) => {
//   console.log(req.body);
//   // Add the db query to update a post
//   db.all(
//     `UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE id = ${req.params.postId}`,
//     (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.status(200).json({
//         messsage: "post successfully updated",
//         rows,
//       });
//     }
//   );
//   // use req.params.postId to get the post id
//   // use req.body to get the post data
//   // response with the updated post
// };

module.exports = {
  getAllPosts,
  getPostById,
  // createPost,
  // deletePost,
  // updatePost,
};
