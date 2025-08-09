const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const deleteRoute = express.Router();

deleteRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await prisma.blog.delete({
    where: {
      id: parseInt(id),
    },
  });
});
module.exports = deleteRoute;
