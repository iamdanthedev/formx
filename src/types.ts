import { Field } from "./Field";

export type FormErrors<T> = {
  [K in keyof T]?: T[K] extends object ? FormErrors<T[K]> : string
};

export type BaseFormData = {
  [K: string]: any;
};

export type FormState<T extends {}> = {
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

export type FormFields<T> = { [K in keyof T]?: Field<T[K]> };

export type FieldState<T> = {
  clear: boolean;
  dirty: boolean;
  disabled: boolean;
  error: string;
  initialValue: T;
  focused: boolean;
  invalid: boolean;
  name: string;
  touched: boolean;
  valid: boolean;
  value: T;
};
