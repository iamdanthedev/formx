import { Field } from "./Field/Field";
import { IFormStore } from "./FormStore/IFormStore";

export type FormData = {
  [K: string]: any;
};

export interface HTMLEvent {
  preventDefault: () => void;
}

export type FormErrors<T> = {
  [K in keyof T]?: T[K] extends object ? FormErrors<T[K]> : string
};

export type FormFields<T> = { [K: string]: Field<any> };

export type KeyValue<T, K extends keyof T> = { key: keyof T; field: Field<T[K]> };

export type ErrorSelector<T extends FormData> = (x: FormErrors<T>) => any;

export type ValidateFunc<
  T extends FormData,
  S extends IFormStore<T> = IFormStore<T>
  > = (store: S) => FormErrors<T> | Promise<any> | void;
