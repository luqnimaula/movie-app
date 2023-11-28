export type DefaultApiResponseWithPagination<T = unknown> = {
  page: number
  total_pages: number
  total_results: number
  results: T
}
