import express from "express";
import {
  createUser,
  deleteAllUsers,
  deleteUserById,
  getAllUsers,
  updateUserById,
} from "../controllers/user.controller";
import { protect } from "../controllers/auth.controller";
const router = express.Router();
router.post("/", createUser);
router.get("/", protect, getAllUsers);
router.delete("/", deleteAllUsers);
router.delete("/:id", deleteUserById);
router.patch("/:id", updateUserById);

export default router;
