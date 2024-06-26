import express from "express";
import {
  createBook,
  getAllBooks,
  deleteAllBooks,
  deleteBookById,
  updateBookById,
} from "../controllers/book.controller";
import { protect } from "../controllers/auth.controller";
import { isAdmin } from "../middleware/isAdmin.middleware";
const router = express.Router();
router.post("/", protect, isAdmin, createBook);
router.get("/", getAllBooks);
router.delete("/", deleteAllBooks);
router.delete("/:id", deleteBookById);
router.patch("/:id", updateBookById);

export default router;
