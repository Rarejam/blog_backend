const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getBlogController = async (req, res) => {
  try {
    const { image, title, article, isPublished, author } = req.body;
    const newBlog = await prisma.blog.create({
      data: {
        image: image,
        author: author,
        title: title,
        article: article,
        isPublished: isPublished,
      },
    });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = getBlogController;
