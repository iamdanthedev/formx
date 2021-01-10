import { action, computed, observable, runInAction, toJS, set } from "mobx";
import * as React from "react";
import clone from "lodash.clone";
import cloneDeep from "lodash.clonedeep";
import debounce from "lodash.debounce";
import isEqual from "lodash.isequal";
import isPlainObject from "lodash.isplainobject";
import get from "lodash.get";
import { FormState } from "./FormState";
import { FormData, FormErrors, FormFields, ErrorSelector, KeyValue, HTMLEvent } from "../types";
import { FormStoreOptions } from "./FormStoreOptions";
import { FormEventEmitter } from "./FormEvents";
import { FieldOptions } from "../Field/FieldOptions";
import { Field } from "../Field/Field";
import { isPromise } from "../utils";
import { IFormStore } from "./IFormStore";

export class FormStore<T extends FormData> extends FormEventEmitter<T> implements IFormStore<T> {
  constructor(private options: FormStoreOptions<T>) {
    super();

    this.getField = this.getField.bind(this);
    this.onResetHandler = this.onResetHandler.bind(this);
    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);
    this._disabled = Boolean(options.initialDisabled);

    this._runValidationDebounced =
      options?.debounceValidationMs > 0
        ? debounce(this._runValidation, options.debounceValidationMs)
        : null;

    if (options.initialValues) {
      this._values = observable(options.initialValues);
      this._initialValues = clone(options.initialValues);
    }
  }

  @observable error: any = null;
  @observable private _isSubmitting = false;
  @observable private _isValidating = false;
  @observable private _disabled = false;
  @observable private _fields: FormFields<T> = {};
  @observable private _values: T;
  private _errors = observable.box<FormErrors<T>>({});
  @observable private _initialValues: T = {} as T;
  @observable private _initialized = false;
  private _runValidationDebounced: () => Promise<any> = null;

  @computed public get canSubmit() {
    return this.dirty && !this.isSubmitting && !this.isValidating && this.valid && !this.disabled;
  }

  @computed public get clean() {
    return !this.dirty;
  }

  @computed public get disabled() {
    return this._disabled || this._isSubmitting;
  }

  public set disabled(v: boolean) {
    this._disabled = v;
  }

  @computed public get dirty() {
    const current = toJS(this._values);
    const initial = toJS(this._initialValues || {});

    return !isEqual(current, initial);
  }

  @computed public get focusedField() {
    const field = this.fieldsArray.find(f => f.field.focused);
    return field ? field.field : null;
  }

  @computed public get invalid() {
    return !this.valid;
  }

  @computed public get isSubmitting() {
    return this._isSubmitting;
  }

  @computed public get isValidating() {
    return this._isValidating;
  }

  @computed public get touched() {
    return this.fieldsArray.reduce((p, c) => p || c.field.touched, false);
  }

  @computed public get valid() {
    if (!this.errors) {
      return true;
    }

    return Object.keys(this.errors).length === 0;
  }

  @computed public get values(): T {
    return this._values;
  }

  public set values(v: T) {
    this._values = v;
    this.validate();
  }

  @computed public get errors() {
    return this._errors.get();
  }

  public set errors(errs: FormErrors<T>) {
    this._errors.set(errs);
  }

  public get initialValues() {
    return toJS(this._initialValues);
  }

  @computed get state(): FormState<T> {
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
      values: this.values,
    };
  }

  @computed get stateJS() {
    return toJS(this.state);
  }

  @computed public get fields() {
    return this._fields;
  }

  @computed public get fieldsArray() {
    return Object.keys(this._fields).map(key => ({
      key,
      field: this._fields[key],
    })) as Array<KeyValue<T, keyof T>>;
  }

  public getField(name: string) {
    return this._fields[name];
  }

  public getValue(name: string) {
    return get(this._values, name);
  }

  public getInitialValue<V>(name: string) {
    return get(toJS(this._initialValues), name) as V;
  }

  public getError(selector: ErrorSelector<T>): string;
  public getError(name: string): string;
  public getError(arg: string | ErrorSelector<T>): string {
    if (typeof arg === "string") {
      return get(this._errors.get(), arg) as string;
    }

    if (typeof arg === "function") {
      return arg(this._errors.get() || {});
    }

    throw new Error("getError arg must be string or function");
  }

  public setValue = (field: string, value: any) => {
    const prevValue = this.getValue(field);

    runInAction(() => {
      set(this._values, field, value);
    });

    this.validate().finally(() => {
      this.emit("onAfterFieldSet", { field, value, prevValue });
    });
  };

  @action public setError = (name: string, err: any) => {
    set(this._errors.get(), name, err);
  };

  @action public push = (name: string, value: any) => {
    const current = this.getValue(name);

    if (!current || !current.push) {
      throw new Error(`Cannot push to ${name}: field is not an array`);
    }

    this.setValue(name, current.concat(value));
  };

  @action public removeByIndex = (name: string, index: number) => {
    const current = this.getValue(name);

    if (!current || !current.length) {
      throw new Error(`Cannot remove from ${name}: field is not an array`);
    }

    if (current.length < index) {
      throw new Error(`Cannot remove from ${name}: index is out of bounds`);
    }

    const cloned = [...(current as any[])];
    cloned.splice(index, 1);
    this.setValue(name, cloned);
  };

  @action public setSubmitting = (value: boolean) => {
    this._isSubmitting = value;
  };

  @action public submit = (e?: HTMLEvent) => {
    this.submitAsync(e);
  };

  @action public submitAsync = (e?: HTMLEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!this.options.onSubmit) {
      throw new Error("onSubmit handler is missing");
    }

    this._isSubmitting = true;
    this._disabled = true;

    return this.options
      .onSubmit()
      .then(res => {
        runInAction(() => {
          this._isSubmitting = false;
          this.emit("onSubmitSuccess");
        });
      })
      .catch(err => {
        console.error(err);
        this._isSubmitting = false;
        this.emit("onSubmitFail", { error: err });
      })
      .finally(() => {
        this.disabled = false;
      });
  };

  public onResetHandler(e: React.FormEvent<HTMLFormElement>) {
    this.reset();
  }

  @action registerField = <F = any>(name: string, fieldOptions: FieldOptions<any>) => {
    if (this._fields[name]) {
      return this._fields[name];
    }

    this._fields[name] = new Field<F>(this, name.toString(), fieldOptions);

    return this._fields[name];
  };

  @action unregisterField = <V>(name: string) => {
    delete this._fields[name];
  };

  @action reset = (values?: T, dontValidate?: boolean) => {
    if (values != null) {
      this._initialValues = cloneDeep(values);
    }

    if (isPlainObject(values)) {
      this._values = values ? toJS(values) : clone(toJS(this._initialValues));
    } else {
      this._values = values;
    }

    if (!dontValidate) {
      this.validate();
    }
  };

  @action resetToCurrent = () => {
    this._initialValues = cloneDeep(toJS(this.values));
  };

  @action public validate = () => {
    if (this._runValidationDebounced) {
      return Promise.resolve(this._runValidationDebounced());
    }

    return this._runValidation();
  };

  @action private _runValidation = (): Promise<void> => {
    if (!this.options?.validate) {
      return Promise.resolve();
    }

    this._isValidating = true;

    return this._runValidateHandler()
      .then(formErrors => {
        runInAction(() => {
          this.errors = formErrors;
          this._isValidating = false;
        });
      })
      .catch(err => {
        console.error(err);
        this._isValidating = false;
      });
  };

  @action private _runValidateHandler = (): Promise<FormErrors<T>> => {
    return new Promise(resolve => {
      const maybePromisedErrors = this.options.validate(this);

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
  };
}
