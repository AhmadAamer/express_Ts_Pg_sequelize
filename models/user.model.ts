import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  PrimaryKey,
  Default,
} from "sequelize-typescript";
import { enumColumnType } from "../utils/enum-type"; // Ensure this utility is correctly implemented
import Book from "./book.model";
import BookUser from "./bookuser.model";

export enum UserType {
  USER = "user",
  ADMIN = "admin",
}

@Table({ tableName: "users", timestamps: false })
export default class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ type: enumColumnType(UserType) })
  type: string;

  @BelongsToMany(() => Book, () => BookUser)
  books!: Book[];
}
