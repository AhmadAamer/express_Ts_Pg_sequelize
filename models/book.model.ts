import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "books", timestamps: false })
export default class Book extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
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
  @Column
  booked: boolean;
}
