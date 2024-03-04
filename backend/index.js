const express = require("express");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const authMiddleware = require("./middleware/auth");
const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authMiddleware, userRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("server is running!");
});
