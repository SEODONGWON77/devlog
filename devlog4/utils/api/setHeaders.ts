import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export function setHeaders(
  axiosRequestConfig: AxiosRequestConfig, 
  defaultHeaders?: AxiosRequestHeaders
): AxiosRequestConfig {

  if(!defaultHeaders) {
    return axiosRequestConfig;
  }

  let headers: AxiosRequestHeaders = defaultHeaders;

  if(axiosRequestConfig.headers) {
    headers = Object.assign(headers, axiosRequestConfig.headers);
  }

  return Object.assign({}, axiosRequestConfig, { headers });
}