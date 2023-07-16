import { CheckerFunctionError } from "fastest-validator";
import {
  Schema,
  String,
  Number,
  Boolean,
  Array,
  Nested,
  NestedArray,
  Custom,
  getSchema,
} from "fastest-validator-decorators";
import { makeCustomChecker } from "../../../../utils/validate/makeCustomChecker";
@Schema()
export class DetailResult {
  constructor(obj: unknown) {
    Object.assign(this, obj);
  }
  @String()
  title!: string;
  @Number()
  index!: number;
  @String()
  htmlStr!: string;
  @String()
  shortContent!: string;
  @String()
  name!: string;
  @Array()
  tagList!: string[];
  @String()
  updateDt!: string;
  @String()
  createDt!: string;
  @Number()
  __v!: number;
  @String()
  _id!: string;
}
