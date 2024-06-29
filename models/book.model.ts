import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  PrimaryKey,
  Default,
} from "sequelize-typescript";
import User from "./user.model";
import BookUser from "./bookuser.model";
@Table({ tableName: "books", timestamps: false })
export default class Book extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id: string;
  @Column
  title: string;
  @Column
  author: string;
  @Column
  price: number;
  @Column({ type: DataType.INTEGER })
  quantity: number;
  @BelongsToMany(() => User, () => BookUser)
  users!: User[];
}
