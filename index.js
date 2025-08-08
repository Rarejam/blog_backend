const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const getBlogRoute = require("./routes/getBlogsRoutes");
const commentRoute = require("./routes/commentRoutes");
const deleteRoute = require("./routes/deleteBlog");
const authorRoute = require("./routes/authorRoute");
const signupRoute = require("./routes/signupRoute");
// app.use(cors({
//   origin: "http://localhost:5173"
// }));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", getBlogRoute);

app.use("/comments", commentRoute);

app.use("/delete", deleteRoute);

app.use("/author", authorRoute);

app.use("/signup", signupRoute);

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`app is running on PORT ${PORT}`);
});
