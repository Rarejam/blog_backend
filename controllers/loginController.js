const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginController = async (req, res) => {
  const { login_email, login_password } = req.body;

  //get particular user using the unique email form login
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: login_email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "user doesnt exist" });
    }
    //compare login password with user password form db using bcrypt
    //compare login password with user.passowrd not vice versa
    const isMatch = await bcrypt.compare(login_password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    //if passwords match create and assign a token using jwt to the user to
    // access protected routes
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ message: "Login Succesful", token });
  } catch (err) {
    return res.status(401).json({ message: "Authorixation field" });
  }
};
module.exports = loginController;
