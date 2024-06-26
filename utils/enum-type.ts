import { DataType } from "sequelize-typescript";

export const enumColumnType = (e: Object) => DataType.ENUM(...Object.values(e));
