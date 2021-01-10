import { FormState } from "./FormState";
import { ErrorSelector, FormData, FormErrors, FormFields, HTMLEvent } from "../types";
import { Field } from "../Field/Field";
import { FieldOptions } from "../Field/FieldOptions";

export interface IFormStore<T extends FormData> {
  values: T;
  initialValues: T;
  errors: FormErrors<T>;
  state: FormState<T>;
  disabled: boolean;
  clean: boolean;
  dirty: boolean;
  focusedField: Field<any> | null;
  invalid: boolean;
  isSubmitting: boolean;
  isValidating: boolean;
  touched: boolean;
  valid: boolean;

  setSubmitting(v: boolean): void;

  fields: FormFields<T>;
  registerField<F = any>(name: string, fieldOptions: FieldOptions<any>): Field<F>;
  unregisterField<V>(name: string);
  getField<F = any>(name: string): Field<F>;
  getInitialValue<V>(name: string): V;

  getError(selector: ErrorSelector<T>): string;
  getError(name: string): string;
  getError(arg: string | ErrorSelector<T>): string;
  setError(name: string, err: any): void;

  getValue(field: string): any;
  setValue(field: string, value: any): void;
  reset(values?: T, dontValidate?: boolean): void;
  resetToCurrent(): void;

  push(name: string, value: any): void;
  removeByIndex(name: string, index: number): void;

  validate(): Promise<void>;

  submit(e?: HTMLEvent): void;
  submitAsync(e?: HTMLEvent): Promise<void>;
}
