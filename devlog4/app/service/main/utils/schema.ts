import { DetailResult } from "app/service/detail/utils/schema";
import { CheckerFunctionError } from "fastest-validator";
import {
  Schema,
  String,
  Number,
  Array,
  Nested,
  NestedArray,
} from "fastest-validator-decorators";
import { makeCustomSyncChecker } from "../../../../utils/validate/makeCustomChecker";

@Schema()
export class MainResponse {
  constructor(obj: unknown) {
    Object.assign(this, obj);
  }

  @NestedArray({ validator: DetailResult })
  result!: DetailResult[];
}
