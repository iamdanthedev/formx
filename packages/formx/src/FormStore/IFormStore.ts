import { FormState } from "./FormState";
import { FormData } from "../types";

export interface IFormStore<T extends FormData> {
  state: FormState<T>;
  disabled: boolean;

  getError(field: string): any;
  getValue(field: string): any;
  getInitialValue(field: string): any;
  setValue(field: string, value: any): void;

}
