import { wrappedValidate } from "utils/validate/wrappedValidate";
import { MainResponse } from "./schema";

export const validateGetMainResult = async (getMainResponse: unknown) => {
  const result = new MainResponse(getMainResponse);
  await wrappedValidate(result);

  return result;
};
