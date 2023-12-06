import { wrappedValidate } from "utils/validate/wrappedValidate";
import { DetailResult } from "./schema";

export const validateGetSearchResult = async (getSearchResult: unknown) => {
  const result = new DetailResult(getSearchResult);

  await wrappedValidate(result);

  return result;
};
