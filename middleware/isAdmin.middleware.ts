import { NextFunction, Request, Response } from "express";
import User, { UserType } from "../models/user.model";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.type === UserType.ADMIN) {
    next();
  }
  res.status(401).json({
    message: "Unauthorized",
  });
};
