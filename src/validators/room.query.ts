export type SortOrder = "asc" | "desc";
export type FilterOp = "gt" | "gte" | "lt" | "lte" | "eq";

export interface RoomQuery {
  sort?: Partial<Record<"floor" | "capacity", SortOrder>>;
  filter?: Partial<
    Record<
      "floor" | "capacity",
      Partial<Record<FilterOp, string>>
    >
  >;
  search?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}
