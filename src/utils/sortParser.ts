export type SortOrder = "asc" | "desc";

export function parseSort<
  T extends readonly string[]
>({
    customSort,
    allowed,
    defaultSort,
  }: {
  customSort?: Partial<Record<T[number], SortOrder>>;
  allowed: T;
  defaultSort: Record<string, 1 | -1>;
}): Record<string, 1 | -1> {
  const sort: Record<string, 1 | -1> = {};

  if (customSort) {
    for (const field of allowed) {
      const key = field as T[number];

      if (customSort[key] === "asc") sort[key] = 1;
      if (customSort[key] === "desc") sort[key] = -1;
    }
  }

  if (Object.keys(sort).length){
    sort._id = -1;
    return sort;
  }

  return defaultSort;
}

