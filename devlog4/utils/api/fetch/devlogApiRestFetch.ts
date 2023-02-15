import { Rest } from "../api";
import { createAllRestFetch, createGetRestFetch, createRestFetch } from "../createFetch";

export const devlogRestFetch = new Rest("/api/register");

export const createRestFetchByDevlog = createRestFetch(devlogRestFetch);
export const createGetRestFetchByDevlog = createGetRestFetch(devlogRestFetch);
export const createAllRestFetchByDevlog = createAllRestFetch(devlogRestFetch);