import * as React from "react";
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
  invalid: boolean;
  submitting: boolean;
  errors: FormErrors<T>;
  touched: boolean;
  pristine: boolean;
  valid: boolean;
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
    this.submit = this.submit.bind(this);
  }

  @computed
  public get clean() {
    return !this.dirty;
  }

  @computed
  public get dirty() {
    return this._administration.fieldsArray.reduce(
      (p, c) => p || c.field.dirty,
      false
    );
  }

  @computed
  public get invalid() {
    return !this.valid;
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
      invalid: this.invalid,
      errors: this.errors,
      pristine: !this.dirty,
      submitting: this.submitting,
      touched: this.touched,
      valid: this.valid,
      validating: false, // FIXME: not implemented
      values: this.values
    };
  }

  public field(key: K) {
    return this._administration.getField(key);
  }

  /**
   * @todo probably not needed
   */
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

  @action
  public submit(e: React.FormEvent<HTMLFormElement>) {
    this._log("submit");

    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!this.onSubmit) {
      throw new Error("onSubmit handler is missing");
    }

    this._submitting = true;

    this.onSubmit()
      .then(res => {
        this._submitting = false;
        this.onSubmitSuccess && this.onSubmitSuccess(res);
      })
      .catch(e => {
        this._submitting = false;

        if (this.onSubmitFail) {
          this.onSubmitFail(e);
        } else {
          throw e;
        }
      });
  }

  onSubmit?(): Promise<any>;
  onSubmitSuccess?(submitRes: any): Promise<T>;
  onSubmitFail?(e: any): Promise<FormErrors<T>>;

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
