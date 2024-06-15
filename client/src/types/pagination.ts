export type Pagination = {
  limit: number;
  page: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc" | '';
};
