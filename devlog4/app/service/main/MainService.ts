import { tempClaimResponse, tempPatentNumberMap } from "app/temp/mock/mockData";
import { AllRestFetch } from "utils/api/createFetch";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import { DefaultApiResponse } from "utils/api/types";
import {
  validateGetMainResult,
  validateGetTempResult,
  validateGetTempResult2,
} from "./utils/validate";

const allFetch = createAllRestFetchByDevlog("post");

export default class MainResultService {
  public async getMainResult() {
    const data = await allFetch.getFetch("/");
    return validateGetMainResult(data);
  }

  public async getTempResult() {
    const data = tempPatentNumberMap;
    return validateGetTempResult(data);
  }

  public async getTempResult2() {
    const data = tempClaimResponse;
    return validateGetTempResult2(data);
  }
}
