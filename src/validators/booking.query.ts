type SortOrder = "asc" | "desc";

export interface BookingQuery {
  sort?: Partial<Record<"date" | "startTime", SortOrder>>;
  room?: string;
  employee?: string;
  fromDate?: string;
  toDate?: string;
}
