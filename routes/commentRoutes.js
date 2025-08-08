const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const commentController = require("../controllers/commentController");
const express = require("express");
const commentRoute = express.Router();

commentRoute.post("/", async (UT482I4Jreq, res) => {
  try {
    const { comment, blogId } = req.body;

    console.log("📥 Incoming comment:", req.body); //

    if (!comment || !blogId) {
      return res.status(400).json({ error: "Missing comment " });
    }
    const newComment = await prisma.comment.create({
      data: {
        comment: comment,
        blogId: parseInt(blogId),
        date: new Date(),
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
