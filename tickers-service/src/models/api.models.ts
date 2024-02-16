export type ApiResponse<T> = {
  code: string;
  data?: T;
  msg?: string;
};
