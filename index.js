require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/user.router");
const nsiRouter = require("./router/nsi.router");
const fileRouter = require("./router/file.router");
const errorMiddleware = require("./middleware/error-middleware");

const PORT = process.env.PORT || 6000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", authRouter);
app.use("/nsi", nsiRouter);
app.use("/api", fileRouter);

app.use(express.static("public"));
app.use("/files", express.static("images"));

app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
