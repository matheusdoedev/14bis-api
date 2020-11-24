import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// routes
import usersRoutes from "./routes/users";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/users", usersRoutes);

export default app;
