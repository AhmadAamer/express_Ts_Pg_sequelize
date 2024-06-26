import { Model, ModelStatic, WhereOptions } from "sequelize";
import { PaginationResponse } from "../types/pagination.type";

export async function paginate<M extends Model>(
  model: ModelStatic<M>,
  where: WhereOptions<M>,
  page: number | string = 1,
  limit: number | string = 15
): Promise<PaginationResponse<M>> {
  const offset = (+page - 1) * +limit;
  const { rows: data, count } = await model.findAndCountAll({
    where,
    offset,
    limit: +limit,
  });
  return {
    data,
    pageInfo: {
      page: +page,
      limit: +page,
      totalPages: Math.trunc(count / +limit) + 1,
      totalCount: count,
      hasNext: +offset + +limit < count,
      hasBefore: offset > 0,
    },
  };
}
