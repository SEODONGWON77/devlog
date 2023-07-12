import { AllRestFetch } from "utils/api/createFetch";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import { DefaultApiResponse } from "utils/api/types";
import { validateGetMainResult } from "./utils/validate";

const allFetch = createAllRestFetchByDevlog("post");

export default class MainResultService {
  public async getMainResult() {

    const { result } = await allFetch.getFetch("/");
    return validateGetMainResult(result);
  }
}
