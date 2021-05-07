export interface IResponse<T> {
  previousPage?: number,
  currentPage?: number,
  nextPage?: number,
  responseList: T[]
}