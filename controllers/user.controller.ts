import User from "../models/user.model";
import { Request, Response } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const allUsers = await User.findAll({});
  try {
    res.status(200).json({
      numberOfUsers: allUsers.length ? allUsers.length : "there are no users",
      result: allUsers.length > 0 ? allUsers : "empty😑",
    });
  } catch {
    (err: Error) => {
      res.status(500).json({ error: err });
    };
  }
};

// export const createUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   console.log(req.body);

//   const { name, email, password, type, reservedBooks } = req.body;
//   const newUser = await User.create({
//     name,
//     email,
//     password,
//     type,
//     reservedBooks,
//   });
//   await newUser.save();
//   try {
//     res.status(200).json({ resualt: "user created successfully", newUser });
//   } catch {
//     (err: Error) => {
//       res.status(500).json({ error: err });
//     };
//   }
// };

export const deleteAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await User.destroy({ where: {} });
    res.status(200).json({
      message: "all users are deleted ",
    });
  } catch {
    (err: Error) => {
      res.status(500).json({ error: err });
    };
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const deletedUser = await User.destroy({ where: { id: id } });
    res
      .status(200)
      .json({ message: `user with id : ${id} deleted successfully!` });
  } catch {
    (err: Error) => {
      res.status(500).json({ message: err });
    };
  }
};
export const updateUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const feildsToUpdate = req.body;
    const updatedUser = await User.update(feildsToUpdate, {
      where: { id: id },
    });
    const newUser = await User.findAll({ where: { id: id } });
    res.status(200).json({
      message: `user with id : ${id} updated successfully!`,
      newUser: newUser,
    });
  } catch {
    (err: Error) => {
      res.status(500).json({ message: err });
    };
  }
};
