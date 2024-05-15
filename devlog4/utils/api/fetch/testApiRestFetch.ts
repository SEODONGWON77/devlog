import { Rest } from "../api";
import { createAllRestFetch, createGetRestFetch, createRestFetch } from "../createFetch";

export const testRestFetch = new Rest("/api/test");

export const createRestFetchByTest = createRestFetch(testRestFetch);
export const createGetRestFetchByTest = createGetRestFetch(testRestFetch);
export const createAllRestFetchByTest = createAllRestFetch(testRestFetch);