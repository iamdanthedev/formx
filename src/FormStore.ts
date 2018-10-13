import { action, computed, observable } from "mobx";
import { FormAdministration } from "./FormAdministration";
import { Field } from "./Field";

export type FormErrors<T extends {}> = Record<keyof T, string>;

export type CommonFieldProps<T> = {
  onBlur: (e) => void;
  onChange: (e) => void;
  name: string;
  value: T;
};

type BaseFormData = {
  [K: string]: any;
};

export type FormState<T extends {}> = {
  clean: boolean;
  dirty: boolean;
  submitting: boolean;
  errors: FormErrors<T>;
  touched: boolean;
  pristine: boolean;
  validating: boolean;
  values: T;
};

export class FormStore<T extends BaseFormData, K extends keyof T = keyof T> {
  protected __name = "unnamed-form-store";

  @observable
  private _submitting = false;

  // private _fields = observable.map<keyof T, Field<any>>();

  constructor() {
    this.field = this.field.bind(this);
    this.fieldProps = this.fieldProps.bind(this);
  }

  @computed
  public get dirty() {
    return this._administration.fieldsArray.reduce(
      (p, c) => p || c.field.dirty,
      false
    );
  }

  @computed
  public get submitting() {
    return this._submitting;
  }

  @computed
  public get touched() {
    return this._administration.fieldsArray.reduce(
      (p, c) => p || c.field.touched,
      false
    );
  }

  @computed
  public get valid() {
    return this._administration.fieldsArray.reduce(
      (p, c) => p && c.field.valid,
      true
    );
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

  @computed
  get state(): FormState<T> {
    return {
      clean: !this.dirty,
      dirty: this.dirty,
      errors: this.errors,
      pristine: !this.dirty,
      submitting: false, // FIXME: not implemented
      touched: this.touched,
      validating: false, // FIXME: not implemented
      values: this.values
    };
  }

  public field(key: K) {
    return this._administration.getField(key);
  }

  public fieldProps<K extends keyof T = keyof T>(
    key: K
  ): CommonFieldProps<T[K]> {
    const field = this._administration.getField(key);

    if (!field) {
      console.error(
        `Field ${key} not found. All fields must be initialized with @observableField`
      );
      return null;
    }

    return field.formProps;
  }

  onSubmit?(): Promise<any>;
  onSubmitSuccess?(): Promise<T>;
  onSubmitFail?(): Promise<FormErrors<T>>;

  @action.bound
  reset() {
    Object.keys(this._administration.fields).forEach(key => {
      this._administration.fields[key].reset();
    });
  }

  validate?(): Promise<T>;

  protected _log(...args: any[]) {
    console.log(`FormStore ${this.__name}`, ...args);
  }

  private get _administration(): FormAdministration<T> {
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
