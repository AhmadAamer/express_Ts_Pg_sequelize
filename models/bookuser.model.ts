import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Book from "./book.model";
import User from "./user.model";

@Table({ tableName: "bookuser" })
export default class BookUser extends Model {
  @ForeignKey(() => Book)
  @Column({
    type: DataType.UUID,
  })
  bookId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;
}
