import { validate } from "fastest-validator-decorators";
import { ApiError } from "../api/apiError";

export const wrappedValidate = async <T extends abstract new () => T>(
  schemaInstance: InstanceType<T>
) => {
  const valid = await validate(schemaInstance);
  if (valid === true) {
    return;
  }

  throw new ApiError({
    code: "009",
    type: schemaInstance.constructor.name,
    message: valid[0].message,
    detail: valid[0].field,
  });
};
