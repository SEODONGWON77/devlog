import { wrappedValidate } from "utils/validate/wrappedValidate";
import {
  GetClaimListResponse,
  GetPatentNumberResponse,
  SignIngResponse,
} from "./schema";
import { GetPostCardListResponse } from "app/service/detail/utils/schema";

export const validateGetPostCardListResult = async (response: unknown) => {
  const result = new GetPostCardListResponse(response);
  await wrappedValidate(result);

  return result;
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
