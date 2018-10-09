import { computed, extendObservable, observable } from "mobx";
import { FormAdministration } from "./FormAdministration";
import { FormStore } from "./FormStore";

type FieldValidateCallback<T> = (value: T) => boolean | string;

export type FieldOptions<T> = {
  defaultValue: T;
  validate: FieldValidateCallback<T>;
};

const defaultOptions: FieldOptions<any> = {
  defaultValue: null,
  validate: null
};

export class Field<T> {
  private readonly _options: FieldOptions<T>;

  @observable
  private _value: T;

  @observable
  private _error: string = null;

  constructor(
    /**
     * todo: does it need to know the formStore?
     */
    private readonly _formStore: FormStore<any>,
    private readonly _initialOptions: Partial<FieldOptions<T>>
  ) {
    this._options = {
      defaultValue:
        _initialOptions.defaultValue != null
          ? _initialOptions.defaultValue
          : null,
      validate: _initialOptions.validate || null
    };

    this._value = this._options.defaultValue;
  }

  @computed
  get value() {
    return this._value;
  }

  set value(v: T) {
    this._value = v;
    this._validate();
  }

  @computed
  get error() {
    return this._error;
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

export function observableField<T>(options: Partial<FieldOptions<T>> = {}) {
  const { defaultValue } = options;

  return function(target: FormStore<any>, property: string) {
    const field = new Field(target, options);

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

    (target["__FormAdministration"] as FormAdministration).registerField(
      property,
      field
    );
  };
}
