import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// routes
import usersRoutes from "./routes/users";
import startupsRoutes from "./routes/startups";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/users", usersRoutes);
app.use("/startups", startupsRoutes);

export default app;
