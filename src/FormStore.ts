import { action, computed, observable } from "mobx";
import { FormAdministration } from "./FormAdministration";
import { Field } from "./Field";

export type FormErrors<T extends {}> = Record<keyof T, string>;

export class FormStore<T extends {}> {
  @observable
  private _submitting = false;

  @observable
  private _valid = false;

  // private _fields = observable.map<keyof T, Field<any>>();

  constructor() {}

  @computed
  public get submitting() {
    return this._submitting;
  }

  @computed
  public get valid() {
    return this._valid;
  }

  @computed
  public get values(): T {
    const result = ({} as any) as T;
    const keys = Object.getOwnPropertyNames(this._administration.fields);

    keys.forEach(key => {
      result[key] = this._administration.fields[key].value;
    });

    return result;
  }

  @computed
  get errors(): FormErrors<T> {
    const result = ({} as any) as FormErrors<T>;
    const keys = Object.getOwnPropertyNames(this._administration.fields);

    keys.forEach(key => {
      const err = this._administration.fields[key].error;
      if (err != null) {
        result[key] = this._administration.fields[key].error;
      }
    });

    return result;
  }

  onSubmit?(): Promise<any>;
  onSubmitSuccess?(): Promise<T>;
  onSubmitFail?(): Promise<FormErrors<T>>;
  validate?(): Promise<T>;

  private get _administration(): FormAdministration {
    const administration = this["__FormAdministration"];

    if (!administration) {
      throw new Error("Missing administration object");
    }

    return administration;
  }
}

export function formStore() {
  return function(target: any) {
    const original = target;

    // a utility function to generate instances of a class
    function construct(constructor, args) {
      var c: any = function() {
        return constructor.apply(this, args);
      };
      c.prototype = constructor.prototype;
      return new c();
    }

    // the new constructor behaviour
    const f: any = function(...args) {
      console.log("New: " + original.name);
      return construct(original, args);
    };

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;
  };
}
