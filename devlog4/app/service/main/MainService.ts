import { AllRestFetch } from "utils/api/createFetch";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import { DefaultApiResponse } from "utils/api/types";
import {
  validateGetSignInResult,
  validateGetTempResult,
  validateGetTempResult2,
} from "./utils/validate";
import { signIn, useSession } from "next-auth/react";

const allFetch = createAllRestFetchByDevlog("post");

export default class MainResultService {
  public async getMainResult() {
    const data = await allFetch.getFetch("/");
    // return validateGetMainResult(data);
  }

  public async getSignInResult({ email, password }: any) {
    const data = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/main",
    });

    return validateGetSignInResult(data);
  }
}