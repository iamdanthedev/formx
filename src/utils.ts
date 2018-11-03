import set from "lodash.set";
import { BaseFormData, FormErrors } from "./types";

/**
 * Validate a yup schema.
 * https://github.com/jaredpalmer/formik/blob/master/src/Formik.tsx
 */
export function validateYupSchema<T extends BaseFormData>(
  values: T,
  schema: any,
  sync: boolean = false,
  context: any = {}
): Promise<Partial<T>> {
  let validateData: Partial<T> = {};

  for (let k in values) {
    if (values.hasOwnProperty(k)) {
      const key = String(k);
      validateData[key] = values[key] !== "" ? values[key] : undefined;
    }
  }

  return schema[sync ? "validateSync" : "validate"](validateData, {
    abortEarly: false,
    context: context
  });
}
/**
 * Transform Yup ValidationError to a more usable object
 * https://github.com/jaredpalmer/formik/blob/master/src/Formik.tsx
 */
export function yupToFormErrors<Values>(yupError: any): FormErrors<Values> {
  let errors: any = {} as FormErrors<Values>;

  if (yupError.inner.length === 0) {
    return set(errors, yupError.path, yupError.message);
  }

  for (let err of yupError.inner) {
    if (!errors[err.path]) {
      errors = set(errors, err.path, err.message);
    }
  }

  return errors;
}

export const isObject = (obj: any): boolean =>
  obj !== null && typeof obj === "object";

export const isPromise = (value: any): value is PromiseLike<any> =>
  isObject(value) && typeof value.then === "function";
