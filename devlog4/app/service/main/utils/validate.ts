import { wrappedValidate } from "utils/validate/wrappedValidate";
import { MainResponse } from "./schema";

export const validateGetMainResult = async (getMainResponse: unknown) => {

  console.log('콘솔 validateGetMainResult', getMainResponse);

  const result = new MainResponse(getMainResponse);

  console.log('콘솔 validateGetMainResult rsult', result);

  await wrappedValidate(result);

  return result;
};
