import Book from "../models/book.model";
import { Request, Response } from "express";
import { paginate } from "../utils/paginate";
export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { page, limit } = req.query;
  const allBooks = await paginate(Book, {}, page as string, limit as string);
  try {
    res.status(200).json(allBooks);
  } catch {
    (err: Error) => {
      res.status(500).json({ error: err });
    };
  }
};

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  //   console.log(req.body);
  const { title, author, price, quantity, booked } = req.body;
  const newBook = await Book.create({ title, author, price, quantity, booked });
  await newBook.save();
  try {
    res.status(200).json({ resualt: "book created successfully", newBook });
  } catch {
    (err: Error) => {
      res.status(500).json({ error: err });
    };
  }
};

export const deleteAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Book.destroy({ where: {} });
    res.status(200).json({
      message: "all books are deleted ",
    });
  } catch {
    (err: Error) => {
      res.status(500).json({ error: err });
    };
  }
};

export const deleteBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.destroy({ where: { id: id } });
    res.status(200).json({
      message: `book with id : ${id} deleted successfully!`,
      deletedBook,
    });
  } catch {
    (err: Error) => {
      res.status(500).json({ message: err });
    };
  }
};
export const updateBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const feildsToUpdate = req.body;
    const updatedBook = await Book.update(feildsToUpdate, {
      where: { id: id },
    });
    const newBook = await Book.findAll({ where: { id: id } });
    res.status(200).json({
      message: `book with id : ${id} updated successfully!`,
      newBook: newBook,
    });
  } catch {
    (err: Error) => {
      res.status(500).json({ message: err });
    };
  }
};
