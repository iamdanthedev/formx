import { toJS } from "mobx";
import * as React from "react";
import clone from "lodash.clone";
import isEqual from "lodash.isequal";
import get from "lodash.get";
import set from "lodash.set";
import { action, computed, observable } from "mobx";
import { Field, FieldOptions } from "./Field";

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

type FieldsDescription<T> = T extends object
  ? FieldsDescriptionObject<T>
  : FieldOptions<T>;

type FieldsDescriptionObject<T extends BaseFormData> = {
  [K in keyof T]: FieldsDescription<T[K]>
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

type FormFields<T> = { [K in keyof T]?: Field<T[K]> };

export abstract class FormStore<
  T extends BaseFormData,
  K extends keyof T = keyof T
> {
  protected __name = "unnamed-form-store";
  // private readonly _administration: FormAdministration<T>;

  @observable
  private _submitting;

  @observable
  private _fields: FormFields<T> = {};

  private _values = observable.box<T>({} as any);

  @observable
  private _initialValues: T;

  @observable
  private _initialized = false;

  constructor() {
    // this._administration = new FormAdministration();
    // this._registerFields(fields);

    this.getField = this.getField.bind(this);
    // this.fieldProps = this.fieldProps.bind(this);
    // this.registerField = this.registerField.bind(this);
    // this.unregisterField = this.unregisterField.bind(this);
    this.onResetHandler = this.onResetHandler.bind(this);
    this.submit = this.submit.bind(this);
  }

  public initialize(v: T) {
    this._initialValues = clone(v);
    this._values.set(clone(v));
    this._initialized = true;
  }

  @computed
  public get clean() {
    return !this.dirty;
  }

  @computed
  public get dirty() {
    return !isEqual(this._values.get(), toJS(this._initialValues));
  }

  // @computed
  // public get fields(): Array<Field<any>> {
  //   return this._administration.fieldsArray.map(f => f.field);
  // }

  @computed
  public get focusedField() {
    const field = this.fieldsArray.find(f => f.field.focused);
    return field ? field.field : null;
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
    return this.fieldsArray.reduce((p, c) => p || c.field.touched, false);
  }

  @computed
  public get valid() {
    return this.fieldsArray.reduce((p, c) => p && c.field.valid, true);
  }

  @computed
  public get values(): T {
    return this._values.get();
  }

  public set values(v: T) {
    this._values.set(v);
  }

  @computed
  get errors(): FormErrors<T> {
    // FIXME: not implemented
    return {} as any;
    // const result = ({} as any) as FormErrors<T>;
    // const keys = Object.getOwnPropertyNames(this._administration.fields);
    //
    // keys.forEach(key => {
    //   const err = this._administration.fields[key].error;
    //   if (err != null) {
    //     result[key] = this._administration.fields[key].error;
    //   }
    // });
    //
    // return result;
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

  @computed
  public get fields() {
    return this._fields;
  }

  @computed
  public get fieldsArray() {
    return Object.keys(this._fields).map(key => ({
      key,
      field: this._fields[key]
    })) as Array<{ key: K; field: Field<T[K]> }>;
  }

  public getField(name: string) {
    return this._fields[name];
  }

  public getValue(name: string) {
    return get(this._values.get(), name);
  }

  public setValue(name: string, value: any) {
    const values = this._values.get();
    set(values, name, value);
    this._values.set(values);
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

  public onResetHandler(e: React.FormEvent<HTMLFormElement>) {
    this.reset();
  }

  onSubmit?(): Promise<any>;
  onSubmitSuccess?(submitRes: any): Promise<T>;
  onSubmitFail?(e: any): Promise<FormErrors<T>>;

  @action.bound
  registerField<V>(name: string) {
    if (this._fields[name]) {
      throw new Error(
        `Attempt to register field ${name} failed. \nReason: field already registered`
      );
    }

    const field = new Field(this, name);
    this._fields[name] = field;

    return this._fields[name];
  }

  @action.bound
  unregisterField<V>(name: string) {
    delete this._fields[name];
  }

  @action.bound
  reset(values?: T) {
    if (values != null) {
      this._initialValues = clone(values);
    }

    this._values.set(values ? clone(values) : clone(toJS(this._initialValues)));
  }

  // validate?(): Promise<T>;

  protected _log(...args: any[]) {
    console.log(`FormStore ${this.__name}`, ...args);
  }
}
