import { AllRestFetch } from "utils/api/createFetch";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import { DefaultApiResponse } from "utils/api/types";
import { validateGetSearchResult } from "./utils/validate";

const allFetch = createAllRestFetchByDevlog("post");

export default class DetailResultService {
  public async getSearchResult(detailId: string) {

    const { data } = await allFetch.getFetch(`?index=${detailId}`);
    return validateGetSearchResult(data.result);
  }
}
