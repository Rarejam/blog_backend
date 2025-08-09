const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const signupController = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    return res
      .status(401)
      .json({ message: "password && confirm password are not equal" });
  }
  if (password.length < 6) {
    return res.status(401).json({ message: "password is too short" });
  }
  try {
    const sameUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (sameUser) {
      return res.status(401).json({ message: "user email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });
      return res.status(201).json({ message: "authentication success" });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Server error. Please try again later" });
  }
};
module.exports = signupController;
