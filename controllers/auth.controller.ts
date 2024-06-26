import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { where } from "sequelize";
const { promisify } = require("util");

declare namespace Express {
  export interface Request {
    user?: User;
  }
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, type } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      res.status(400).json({ message: "Email is already registered." });
      return;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = User.create({
      name,
      email,
      password: hashedPassword,
      type,
    });
    (await newUser).save();

    const payload = {
      email: (await newUser).email,
      id: (await newUser).id,
    };

    const token = jwt.sign(payload, "secret😂", {
      //some options..
      algorithm: "HS256",
      // expiresIn: "1h",
    });
    res.status(200).json({
      message: "user registered successfully🙂",
      token: token,
    });
  } catch {
    (err: Error) => {
      res.status(500).json({ message: "there is an error🙃", error: err });
    };
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({
        message:
          "Invalid credentials..email or password is wrong ,, i won't tell you which one is wrong😎",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({
        message:
          "Invalid credentials..email or password is wrong ,, i won't tell you which one is wrong😎",
      });
      return;
    }
    const payload = {
      email: (await user).email,
      id: (await user).id,
    };

    const secret = process.env.SECRET_KEY;

    const token = jwt.sign(payload, "secret😂", {
      //some options..
      algorithm: "HS256",
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "you're logged in 🙂",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  //to check if there is any token provided in authorization property.

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(payload.id);
  const currentUser = await User.findOne({ where: { id: payload.id } });
  if (!currentUser) {
    res.status(401).json({ message: "Unauthorized" });
  }

  // req.user = currentUser;
  next();
};
