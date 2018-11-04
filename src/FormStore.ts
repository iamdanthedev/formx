import { toJS } from "mobx";
import * as React from "react";
import { clone, debounce, isEqual, get, set, merge } from "lodash";
import { action, computed, observable } from "mobx";
import { Field } from "./Field";
import { FormState, BaseFormData, FormErrors, FormFields } from "./types";
import { yupToFormErrors, validateYupSchema, isPromise } from "./utils";

export class FormStore<T extends BaseFormData, K extends keyof T = keyof T> {
  /**
   * This is probably a bit unconventional way of configuring;
   */

  onSubmit?: () => Promise<any>;
  onSubmitSuccess?: (submitRes: any) => Promise<T>;
  onSubmitFail?: (e: any) => Promise<FormErrors<T>>;
  validate?(): () => FormErrors<T> | Promise<any> | void;
  validationSchema?: any | (() => any);

  protected __name = "";
  // private readonly _administration: FormAdministration<T>;

  @observable
  private _isSubmitting = false;

  @observable
  private _isValidating = false;

  @observable
  private _disabled = false;

  @observable
  private _fields: FormFields<T> = {};

  private _values = observable.box<T>({} as any);
  private _errors = observable.box<FormErrors<T>>();

  @observable
  private _initialValues: T;

  @observable
  private _initialized = false;

  private _runValidationDebounced: () => void = null;

  constructor() {
    this.getField = this.getField.bind(this);
    this.onResetHandler = this.onResetHandler.bind(this);
    this.submit = this.submit.bind(this);
    this._validate = this._validate.bind(this);
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
  public get disabled() {
    return this._disabled;
  }

  public set disabled(v: boolean) {
    this._disabled = v;
  }

  @computed
  public get dirty() {
    return !isEqual(this._values.get(), toJS(this._initialValues));
  }

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
  public get isSubmitting() {
    return this._isSubmitting;
  }

  @computed
  public get isValidating() {
    return this._isValidating;
  }

  @computed
  public get touched() {
    return this.fieldsArray.reduce((p, c) => p || c.field.touched, false);
  }

  @computed
  public get valid() {
    if (!this.errors) {
      return true;
    }

    return Object.keys(this.errors).length === 0;
  }

  @computed
  public get values(): T {
    return this._values.get();
  }

  public set values(v: T) {
    this._values.set(v);
    this._validate();
  }

  @computed
  public get errors() {
    return this._errors.get();
  }

  public set errors(errs: FormErrors<T>) {
    this._errors.set(errs);
  }

  public get initialValues() {
    return toJS(this._initialValues);
  }

  @computed
  get state(): FormState<T> {
    return {
      clean: !this.dirty,
      dirty: this.dirty,
      errors: this.errors,
      initialValues: this.initialValues,
      invalid: this.invalid,
      isSubmitting: this.isSubmitting,
      isValidating: this.isValidating,
      pristine: !this.dirty,
      touched: this.touched,
      valid: this.valid,
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

  public set debounceValidationMs(v: number) {
    if (v > 0) {
      this._log("setting validation debounce time", v);
      this._runValidationDebounced = debounce(this._runValidation, v, {
        leading: true,
        trailing: true
      });
    } else {
      this._log("removing validation debounce time");
      this._runValidationDebounced = null;
    }
  }

  public getField(name: string) {
    return this._fields[name];
  }

  public getValue(name: string) {
    return get(this._values.get(), name);
  }

  public getInitialValue(name: string) {
    return get(toJS(this._initialValues), name);
  }

  public getError(name: string) {
    return get(this._errors.get(), name);
  }

  public setValue(name: string, value: any) {
    set(this._values.get(), name, value);
    this._validate();
  }

  public setError(name: string, err: any) {
    set(this._errors.get(), name, err);
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

    this._isSubmitting = true;

    this.onSubmit()
      .then(res => {
        this._isSubmitting = false;
        this.onSubmitSuccess && this.onSubmitSuccess(res);
      })
      .catch(e => {
        this._isSubmitting = false;

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

  protected _log(...args: any[]) {
    console.log(`FormStore ${this.__name}`, ...args);
  }

  private _validate() {
    if (this._runValidationDebounced) {
      return this._runValidationDebounced();
    }

    this._runValidation();
  }

  @action.bound
  private _runValidation() {
    this._log("_runValidation");
    this._isValidating = true;

    Promise.all([
      this.validate ? this._runValidateHandler() : {},
      this.validationSchema ? this._runValidationSchema() : {}
    ]).then(([handlerErrors, schemaErrors]) => {
      const mergedErrors = merge({}, handlerErrors, schemaErrors);

      this.errors = mergedErrors;
      this._isValidating = false;
    });
  }

  private _runValidateHandler(): Promise<FormErrors<T>> {
    return new Promise(resolve => {
      const maybePromisedErrors = this.validate();

      if (maybePromisedErrors === undefined) {
        resolve({});
      } else if (isPromise(maybePromisedErrors)) {
        maybePromisedErrors.then(
          () => {
            resolve({});
          },
          errors => {
            resolve(errors);
          }
        );
      } else {
        resolve((maybePromisedErrors as any) as FormErrors<T>);
      }
    });
  }

  /**
   * Run validation against a Yup schema and optionally run a function if successful
   */
  private _runValidationSchema() {
    return new Promise(resolve => {
      const schema =
        typeof this.validationSchema === "function"
          ? this.validationSchema()
          : this.validationSchema;

      validateYupSchema(this.values, schema).then(
        () => {
          resolve({});
        },
        (err: any) => {
          resolve(yupToFormErrors(err));
        }
      );
    });
  }
}
