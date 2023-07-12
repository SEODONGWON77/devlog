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
export class MainResult {
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
@Schema()
export class MainResponse {
  constructor(obj: unknown) {
    Object.values(Object.assign(this, obj))[0];
    // Object.assign(this, [obj]);
    console.log('콘솔 MainReponse', this, obj);
  }
  
  // @Array({ validator: MainResult })
  // Result!: MainResult[];
  
//  @NestedArray({
//   validator: MainResult,
//  })
//  @Reflect.metadata("design:type", MainResult)
//  Result!: MainResult[];
}


