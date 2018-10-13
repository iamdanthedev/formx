import { action, computed, extendObservable, observable } from "mobx";
import { FormAdministration } from "./FormAdministration";
import { FormStore } from "./FormStore";

type FieldValidateCallback<T> = (value: T) => boolean | string;

export type FieldOptions<T> = {
  initialValue: T;
  label?: string;
  name?: string;
  validate?: FieldValidateCallback<T>;
};

export type FieldState<T> = {
  clear: boolean;
  dirty: boolean;
  disabled: boolean;
  error: string;
  focused: boolean;
  invalid: boolean;
  label: string;
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
  private _error: string = null;

  @observable
  private _focused = false;

  @observable
  private _label: string = "";

  @observable
  private _name: string = "unnamed";

  @observable
  private _touched: boolean = false;

  @observable
  private _value: T;

  constructor(
    /**
     * todo: does it need to know the formStore?
     */
    private readonly _formStore: FormStore<any>,
    private readonly _initialOptions: FieldOptions<T>
  ) {
    this.log("constructor", _initialOptions);

    this._options = {
      ..._initialOptions,
      initialValue:
        _initialOptions.initialValue != null
          ? _initialOptions.initialValue
          : null,
      validate: _initialOptions.validate || null
    };

    this._label = this._options.label;
    this._name = this._options.name;
    this._value = this._options.initialValue;
  }

  @computed
  public get dirty() {
    return this._value !== this._options.initialValue;
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

  @computed
  get hasError() {
    return Boolean(this._error);
  }

  @computed
  public get label() {
    return this._label;
  }

  public set label(v: string) {
    this._label = v;
  }

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
      error: this.error,
      focused: this.focused,
      invalid: !this.valid,
      label: this.label,
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
    return !Boolean(this._error);
  }

  @computed
  public get value() {
    return this._value;
  }

  public set value(v: T) {
    this._value = v;
    this.touched = true;
    this._validate();
  }

  @computed
  public get error() {
    return this._error;
  }

  @computed
  public get formProps() {
    return {
      onBlur: this.onBlur,
      onChange: this.onChange,
      onFocus: this.onFocus,
      // @ts-ignore
      name: this.name,
      value: this.value
    };
  }

  public reset() {
    this.value = this._options.initialValue;
  }

  @action.bound
  protected onBlur() {
    this.log("onBlur");
    this._focused = false;
    this.touched = true;
  }

  @action.bound
  protected onChange(e) {
    this.log("onChange", e);

    if (!e || !e.target || typeof e.target.value === "undefined") {
      console.error("Invalid event");
      return;
    }

    this.value = e.target.value;
  }

  @action.bound
  protected onFocus() {
    this.log("onFocus");
    this._focused = true;
  }

  protected log(...args: any[]) {
    console.log(`Field ${this.name}`, ...args);
  }

  private _validate() {
    if (!this._options.validate) {
      return;
    }

    const result = this._options.validate(this._value);

    if (result === true) {
      this._error = null;
      return;
    }

    if (result === false) {
      this._error = "invalid value";
      return;
    }

    if (typeof result === "string") {
      this._error = result;
      return;
    }

    // @ts-ignore
    this._error = result.toString();
  }
}

export function observableField<T>(options: FieldOptions<T>) {
  return function(target: FormStore<any>, property: string) {
    const field = new Field(target, { name: property, ...options });

    delete target[property];

    Object.defineProperty(target, property, {
      get: () => {
        return field.value;
      },

      set: value => {
        field.value = value;
      },

      configurable: false,
      enumerable: true
    });

    if (!target.hasOwnProperty("__FormAdministration")) {
      Object.defineProperty(target, "__FormAdministration", {
        configurable: false,
        enumerable: false,
        value: new FormAdministration(),
        writable: false
      });
    }

    (target["__FormAdministration"] as FormAdministration<any>).registerField(
      property,
      field
    );
  };
}
