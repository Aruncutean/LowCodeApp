export interface IServerResponse<T> {
  returnValue: T;
  errorMessage: string;
  errorCode: string;
}
