import { wrappedValidate } from "utils/validate/wrappedValidate";
import {
  GetClaimListResponse,
  GetPatentNumberResponse,
  MainResponse,
  SignIngResponse,
} from "./schema";

export const validateGetMainResult = async (getMainResponse: unknown) => {
  const result = new MainResponse(getMainResponse);
  await wrappedValidate(result);

  return result.result;
};

export const validateGetSignInResult = async (getSignInResponse: unknown) => {
  const result = new SignIngResponse(getSignInResponse);
  await wrappedValidate(result);

  return result;
};

export const validateGetTempResult = async (response: unknown) => {
  const result = new GetPatentNumberResponse({
    patentNumberMap: response,
  });
  await wrappedValidate(result);
  return result;
};

export const validateGetTempResult2 = async (response: unknown) => {
  const result = new GetClaimListResponse(response);
  await wrappedValidate(result);

  return result;
};
