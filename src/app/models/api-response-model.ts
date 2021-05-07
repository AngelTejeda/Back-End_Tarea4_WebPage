export interface IResponse<T> {
  previousPage?: number,
  nextPage?: number,
  responseList: T[]
}