import { FormState } from "./FormState";
import { FormData } from "../types";
import { Field } from "../Field/Field";
import { FieldOptions } from "../Field/FieldOptions";

export interface IFormStore<T extends FormData> {
  state: FormState<T>;
  disabled: boolean;

  registerField<F = any>(name: string, fieldOptions: FieldOptions<any>): Field<F>;
  unregisterField<V>(name: string);

  getError(field: string): any;
  getValue(field: string): any;
  getInitialValue(field: string): any;
  setValue(field: string, value: any): void;
}
