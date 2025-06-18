export class CursorBasedPaginationDto<T> {
  data: T[];
  totalCount: number;
  nextCursor: number | null;
  prevCursor: number | null;
  hasNext: boolean;
  hasPrev: boolean;
}
