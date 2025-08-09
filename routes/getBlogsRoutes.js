const postBlogController = require("../controllers/postBlogsController");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const getBlogRoute = express.Router();
const verifyJWT = require("../verifyJwt");
// const commentRoute = require("./commentRoutes");

getBlogRoute.get("/", async (req, res) => {
  try {
    const bloglist = await prisma.blog.findMany();
    if (!bloglist) {
      return res.status(500).send("server err");
    }
    res.json(bloglist);
  } catch (err) {
    res.send(err);
  }
});

getBlogRoute.post("/", postBlogController);

getBlogRoute.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).send("Invalid blog id");
  }

  const eachBlog = await prisma.blog.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  const comments = await prisma.comment.findMany({
    where: {
      blogId: parseInt(id),
    },
  });
  if (!eachBlog) {
    return res.status(500).send("server err");
  }

  res.json({
    blog: eachBlog,
    comments: comments,
  });
});

getBlogRoute.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send("Invalid blog id");
    }

    const { image, title, author, article, isPublished } = req.body;
    const updatedBlog = await prisma.blog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        image: image,
        title: title,
        author: author,
        article: article,
        isPublished: isPublished,
      },
    });
    res.status(201).json({ blog: updatedBlog });
  } catch (err) {
    console.log(err);
    res.status(500).json + err;
  }
});

module.exports = getBlogRoute;
