import Validator, { CheckerFunctionError, SyncCheckFunction, ValidationSchema } from "fastest-validator";

export interface MakeCustomCheckerProps {
  key: string;
  schema: ValidationSchema;
  value: unknown;
}

export const makeCustomSyncChecker = ({ key, schema, value }: MakeCustomCheckerProps) => {
  const v = new Validator();
  const check = v.compile(schema) as SyncCheckFunction;

  const valid = check({ [key]: value });

  if (valid === true) {
    return valid;
  }

  const error: CheckerFunctionError = {
    type: valid[0].type,
    actual: valid[0].actual,
    expected: valid[0].expected,
    field: valid[0].field,
  };

  return error;
};
