import { Rest } from "../api";
import { createAllRestFetch, createRestFetch } from "../createFetch";
const ELASTIC_SEARCH_URI = process.env.ELASTIC_SEARCH_URI!;

export const devlogRestFetch = new Rest("/api");
export const devlogElasticSearchGetFetch = new Rest(
  `${ELASTIC_SEARCH_URI}/_search`
);

export const createGetRestFetchBySearch = createRestFetch(
  devlogElasticSearchGetFetch
);
export const createAllRestFetchByDevlog = createAllRestFetch(devlogRestFetch);
