import { ResponseType } from "axios";
import { Rest } from "./api";

export const createGetRestFetch = (baseRestFetch: Rest) => (basePath: string) => {
  return (path: string, query?: object, responseType?: ResponseType) => baseRestFetch.restApi({
    method: "get",
    url: `${basePath}/${path}`,
    withCredentials: true,
    qs: query,
    responseType,
  });
}

export const createRestFetch =  (baseRestFetch: Rest) => (basePath: string, method: string) => {
  return (path: string, data?: object | any[], query?: object) => baseRestFetch.restApi({
    method,
    url: `${basePath}/${path}`,
    withCredentials: true,
    data,
    qs: query
  });
}

export const createAllRestFetch = (baseRestFetch: Rest) => (basePath: string) => {
  return {
    getFetch: createGetRestFetch(baseRestFetch)(basePath),
    postFetch: createRestFetch(baseRestFetch)(basePath, "post"),
    putFetch: createRestFetch(baseRestFetch)(basePath, "put"),
    patchFetch: createRestFetch(baseRestFetch)(basePath, "patch"),
    deleteFetch: createRestFetch(baseRestFetch)(basePath, "delete")
  }
}

export type AllRestFetch = ReturnType<ReturnType<typeof createAllRestFetch>>