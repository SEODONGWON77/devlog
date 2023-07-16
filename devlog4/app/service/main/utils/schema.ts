import { DetailResult } from "app/service/detail/utils/schema";
import { CheckerFunctionError } from "fastest-validator";
import {
  Schema,
  String,
  Number,
  Array,
  Nested,
  NestedArray,
  Custom,
} from "fastest-validator-decorators";
import { makeCustomChecker } from "../../../../utils/validate/makeCustomChecker";

@Schema()
export class MainResponse {
  constructor(obj: unknown) {
    Object.assign(this, obj);
  }

  @NestedArray({ validator: DetailResult })
  result!: DetailResult[];
}

//-------------------------------------------------temp-------------------------------------------------------
export interface PatentNumberMap {
  [patentNumber: string]: {
    queryNumber: string;
    applicationNumber: string;
    patentNumber: string;
    country: string;
    kind?: string;
  };
}

const checkPatentNumberMap = (
  value: unknown,
  errors: CheckerFunctionError[]
) => {
  const key = "patentNumberMap";
  const schema = {
    [key]: {
      type: "record",
      key: "string",
      value: {
        type: "object",
        strict: true,
        props: {
          queryNumber: "string",
          applicationNumber: "string",
          patentNumber: "string",
          country: "string",
          kind: "string",
        },
      },
    },
  };

  const result = makeCustomChecker({
    key,
    schema,
    value,
  });

  if (result === true) {
    return value;
  }

  errors.push(result);
};

@Schema()
export class GetPatentNumberResponse {
  constructor(obj: unknown) {
    Object.assign(this, obj);
  }

  @Custom({
    check: checkPatentNumberMap,
  })
  patentNumberMap!: PatentNumberMap;
}

@Schema()
export class Claim {
  @String()
  claimId!: string;

  @String()
  claimText!: string;

  @Array({ items: "string" })
  claimRefList!: string[];
}

@Schema()
export class GetClaimListResponse {
  constructor(obj: unknown) {
    Object.assign(this, obj);
  }

  @NestedArray({ validator: Claim })
  result!: Claim[];
}
