import Reservation from "../models/reservation.model";
import User from "../models/user.model";
import Book from "../models/book.model";
import { Request, Response, NextFunction } from "express";

export const makeReservation = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;
  const book = await Book.findAll({ where: { id: bookId } });
  const user = await User.findAll({ where: { id: userId } });
  if (user && book) {
    user;
  }
};
