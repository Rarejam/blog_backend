const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJWT(req, res, next) {
  //get encoded form req.headers['Authorization]
  const encoded = req.headers["authorization"];
  if (!encoded) {
    return res.status(401).json({ message: "No token provided" });
  }
  //get token from req.headers['Authorization']
  //Authorization : Bearer <token>

  //   so we will first get the auth then split it by space to
  // create an array of the two values that have beem split by a space ( )
  //then get the token from the array as the first index of the second position
  // in the array

  // get token form encoded
  const token = encoded.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token provided" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.status(403).json("token invalid or expired");
    }
    req.user = data;
    next();
  });
}
module.exports = verifyJWT;
