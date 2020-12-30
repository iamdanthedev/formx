import { FormData } from "../types";

export interface FormState<T extends FormData> {
  clean: boolean;
  dirty: boolean;
  errors: any;
  initialValues: T;
  invalid: boolean;
  isSubmitting: boolean;
  isValidating: boolean;
  pristine: boolean;
  touched: boolean;
  valid: boolean;
  values: T;
};

