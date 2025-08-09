const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const commentController = require("../controllers/commentController");
const express = require("express");
const commentRoute = express.Router();
const verifyJWT = require("../verifyJwt");

commentRoute.post("/", verifyJWT, async (req, res) => {
  try {
    const { comment, blogId } = req.body;
    if (!comment || !blogId) {
      return res.status(400).json({ error: "Missing comment " });
    }
    const newComment = await prisma.comment.create({
      data: {
        comment: comment,
        blogId: parseInt(blogId),
        authorId: parseInt(req.user.id),
        date: new Date(),
        //store the username gotten from the payload in the comment usernmae field
        username: req.user.username,
      },
    });

    res.status(201).json(newComment);
    // res.redirect(`/home/${blogId}`);
  } catch (err) {
    res.status(500).send(err);
  }
});
// commentRoute.post("/", commentController);
module.exports = commentRoute;
