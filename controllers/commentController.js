const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const commentController = async (req, res) => {
  try {
    const comment = req.body.user_comment;
    const blogId = req.body.blogId;

    if (!comment || !blogId) {
      return res.status(400).json({ error: "Missing comment " });
    }
    const newComment = await prisma.comment.create({
      data: {
        comment,
        blogId: parseInt(blogId),
        date: new Date(),
      },
    });

    return res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = commentController;
