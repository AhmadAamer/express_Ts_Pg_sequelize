import express from "express";
import { Sequelize } from "sequelize-typescript";
import "reflect-metadata";
import authRoutes from "../routes/auth.routes";
import bookRoutes from "../routes/books.routes";
import userRoutes from "../routes/users.routes";
import dotenv from "dotenv";
import User from "../models/user.model";
import bookReservations from "../middleware/reservation.middleware";
import { protect } from "../controllers/auth.controller";

const app = express();
app.use(express.json());
dotenv.config();
//configuring sequelize..
const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  dialect: "postgres",
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  models: [process.cwd() + "/models/*.model.ts"],
  sync: {
    alter: true,
  },
  logging: false,
});

sequelize.sync(); //?check it makes all changes happen in the database ..

//connecting to the db..
sequelize
  .authenticate()
  .then(() => {
    console.log("db connected successfully ✅");
  })
  .catch((err) => {
    console.log(err);
  });

//routing..
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/users", userRoutes);
app.post("/api/v1/bookReservation/:bookId", protect, bookReservations);

//running the server on port 8000..
app.listen(8000, () => {
  console.log("app is running on port 8000");
});

// NOTE: Declar Express Request User

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}
