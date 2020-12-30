import { EventEmitter2 } from "eventemitter2";
import TypedEmitter from "typed-emitter";
import { FormData } from "../types";

export interface OnAfterFieldSetPayload<T extends FormData> {
  field: string;
  value: any;
  prevValue: any;
}

export interface OnSubmitFailPayload {
  error: any;
}

export interface FormEvents<T extends FormData> {
  onAfterFieldSet: OnAfterFieldSetPayload<T>;

  onSubmitSuccess: null;
  onSubmitFail: OnSubmitFailPayload;
}

// @ts-ignore
export class FormEventEmitter<T extends FormData> extends (EventEmitter2 as {
  new <T>(): TypedEmitter<FormEvents<T>>;
})<T> {}
