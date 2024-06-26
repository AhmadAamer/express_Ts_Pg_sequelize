import { Table, Column, Model, DataType } from "sequelize-typescript";
import { enumColumnType } from "../utils/enum-type";

export enum UserType {
  USER = "user",
  ADMIN = "admin",
}

@Table({ tableName: "users", timestamps: false })
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
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
  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: true, // Adjust as needed
  })
  reservedBooks: string[];
}
