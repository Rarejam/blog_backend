const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();
const express = require("express");
const authorRoute = express.Router();

authorRoute.post("/", (req, res) => {
  try {
    const { author_password } = req.body;
    const correctPassword = process.env.AUTHOR_PASSWORD;

    if (author_password === correctPassword) {
      res.status(200).json({ message: "Access granted" });
    } else {
      res.status("400").json({ message: "Wrong Password" });
    }
  } catch (err) {
    res.status(400).json({ message: "wrong password" });
  }
});
module.exports = authorRoute;
