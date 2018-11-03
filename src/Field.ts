import { action, computed, observable } from "mobx";
import { FormStore } from "./FormStore";

type FieldValidateCallback<T> = (value: T) => boolean | string;

export type FieldOptions<T> = {
  initialValue: T;
  label?: string;
  name?: string;
  // validate?: FieldValidateCallback<T>;
};

export type FieldState<T> = {
  clear: boolean;
  dirty: boolean;
  disabled: boolean;
  // error: string;
  focused: boolean;
  invalid: boolean;
  // label: string;
  name: string;
  touched: boolean;
  valid: boolean;
  value: T;
};

export class Field<T> {
  private readonly _options: FieldOptions<T>;

  @observable
  private _disabled: boolean = false;

  @observable
  private _focused = false;

  @observable
  private _touched: boolean = false;

  constructor(
    private readonly _store: FormStore<any>,
    private readonly _name: string
  ) {
    this.log("constructor", { _name });
  }

  @computed
  public get dirty() {
    // FIXME: not implemented
    return false;
    // return this._value !== this._options.initialValue;
  }

  @computed
  public get disabled() {
    return this._disabled;
  }

  public set disabled(v: boolean) {
    this._disabled = v;
  }

  @computed
  public get focused() {
    return this._focused;
  }

  public set focused(v: boolean) {
    this.log("set focused", v);
    this._focused = v;
  }

  // @computed
  // get hasError() {
  //   return Boolean(this._error);
  // }

  // @computed
  // public get label() {
  //   return this._label;
  // }

  // public set label(v: string) {
  //   this._label = v;
  // }

  @computed
  public get name(): string {
    return this._name;
  }

  @computed
  public get state(): FieldState<T> {
    return {
      clear: !this.dirty,
      dirty: this.dirty,
      disabled: this.disabled,
      // error: this.error,
      focused: this.focused,
      invalid: !this.valid,
      // label: this.label,
      name: this.name,
      touched: this.touched,
      valid: this.valid,
      value: this.value
    };
  }

  @computed
  public get touched() {
    return this._touched;
  }

  public set touched(v: boolean) {
    this.log("set touched", v);
    this._touched = v;
  }

  @computed
  public get valid() {
    // FIXME: not implemented
    return true;
    // return !Boolean(this._error);
  }

  @computed
  public get value() {
    return this._store.getValue(this._name) as T;
  }

  public set value(v: T) {
    this._store.setValue(this._name, v);
  }

  // @computed
  // public get error() {
  //   return this._error;
  // }

  @computed
  public get formProps() {
    return {
      onBlur: this.onBlur,
      onChange: this.onChangeHandler,
      onFocus: this.onFocusHandler,
      name: this.name,
      value: this.value
    };
  }

  // public reset() {
  //   this.value = this._options.initialValue;
  // }

  @action.bound
  protected onBlur() {
    this.log("onBlur");
    this._focused = false;
    this.touched = true;
  }

  @action.bound
  protected onChangeHandler(e) {
    this.log("onChange", e);

    if (!e || !e.target || typeof e.target.value === "undefined") {
      console.error("Invalid event");
      return;
    }

    this._store.setValue(this._name, e.target.value);
  }

  @action.bound
  protected onFocusHandler() {
    this.log("onFocus");
    this._focused = true;
  }

  protected log(...args: any[]) {
    console.log(`Field ${this.name}`, ...args);
  }

  // private _validate() {
  //   if (!this._options.validate) {
  //     return;
  //   }
  //
  //   const result = this._options.validate(this._value);
  //
  //   if (result === true) {
  //     this._error = null;
  //     return;
  //   }
  //
  //   if (result === false) {
  //     this._error = "invalid value";
  //     return;
  //   }
  //
  //   if (typeof result === "string") {
  //     this._error = result;
  //     return;
  //   }
  //
  //   // @ts-ignore
  //   this._error = result.toString();
  // }
}

export function field<T>(options: FieldOptions<T>) {
  return {
    __formxFieldOptions: true,
    ...options
  };
}
