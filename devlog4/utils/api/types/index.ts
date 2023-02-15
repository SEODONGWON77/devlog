import { AxiosRequestConfig, ResponseType } from "axios";

export type ResType<T = any> = T;

export interface RequestArg<Data = any , Params = any> {
  method: AxiosRequestConfig["method"];
  url: string;
  data?: Data;
  params?: Params;
  withCredentials?: boolean;
}

export interface IRestObject {
  url    : string,
  method : string,
  header?: string,
  qs    ?: any,
  data  ?: any,
  withCredentials?: boolean;
  responseType?: ResponseType;
}

export interface IGqlObject {
  variables?: object,
  query     : string
}