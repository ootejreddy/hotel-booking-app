import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL as string)
  .then(() => {
    console.log("successfully connected to mongodb database");
  })
  .catch((err) => {
    console.log(err);
    console.log("couldn't able to connect to the database");
  });
const app = express();
const port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/test", async (req, res) => {
  res.json({
    msg: "Hello from express endpoint",
  });
});

app.listen(port, () => {
  console.log("server is running on localhost:", port);
});
