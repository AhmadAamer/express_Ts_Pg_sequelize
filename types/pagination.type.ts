export class PageInfo {
  totalPages: number;
  totalCount: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasBefore: boolean;
}

export class PaginationResponse<T> {
  data: T[];
  pageInfo: PageInfo;
}
