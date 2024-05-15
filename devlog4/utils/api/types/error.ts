
export interface ApiErrorType {
  type: string;
  code: string | number;
  message: string;
  detail: string;
}