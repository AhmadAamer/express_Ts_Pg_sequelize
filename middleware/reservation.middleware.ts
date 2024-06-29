// middlewares/reservationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Book from "../models/book.model";

const bookReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user?.id;

    // Check if the user and book exist
    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: "User or Book not found" });
    }

    // Check if the book is already reserved by this user
    const userBooks = await user.$get("books"); // here is the usage of
    const isBookReserved = userBooks.some((b: Book) => b.id === bookId);

    if (isBookReserved) {
      return res
        .status(400)
        .json({ message: "Book already reserved by this user" });
    }

    // Create the reservation
    await user.$add("book", book);

    res.status(200).json({ message: "Reservation successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default bookReservation;
// it's not the best practice ..
declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}
