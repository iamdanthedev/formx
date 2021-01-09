import { action, computed, observable } from "mobx";
import isEqual from "lodash.isequal";
import { FieldState } from "./FieldState";
import { FieldOptions } from "./FieldOptions";
import { IFormStore } from "../FormStore/IFormStore";

const noTransform = v => v;

export class Field<T> {
  @observable private _disabled = false;
  @observable private _focused = false;
  @observable private _touched = false;

  constructor(
    private readonly _store: IFormStore<any>,
    private readonly _name: string,
    private readonly _options: FieldOptions<any> = {}
  ) {
    this._options.parseValue = this._options.parseValue || noTransform;
    this._options.transformValue = this._options.transformValue || noTransform;
  }

  @computed public get dirty() {
    return !isEqual(
      this._store.getValue(this._name),
      this._store.getInitialValue(this._name)
    );
  }

  @computed public get disabled() {
    return this._store.disabled || this._disabled;
  }

  public set disabled(v: boolean) {
    this._disabled = v;
  }

  @computed public get focused() {
    return this._focused;
  }

  public set focused(v: boolean) {
    this._focused = v;
  }

  @computed public get name(): string {
    return this._name;
  }

  @computed public get initialValue(): T {
    return this._store.getInitialValue(this._name);
  }

  @computed public get state(): FieldState<T> {
    return {
      clear: !this.dirty,
      dirty: this.dirty,
      disabled: this.disabled,
      error: this.error,
      focused: this.focused,
      initialValue: this.initialValue,
      invalid: !this.valid,
      name: this.name,
      touched: this.touched,
      valid: this.valid,
      value: this.value
    };
  }

  @computed public get touched() {
    return this._touched;
  }

  public set touched(v: boolean) {
    this._touched = v;
  }

  @computed public get invalid() {
    return !this.valid;
  }

  @computed public get valid() {
    return !Boolean(this.error);
  }

  @computed public get error() {
    return this._store.getError(this._name);
  }

  @computed public get value() {
    return this._store.getValue(this._name) as T;
  }

  public set value(v: T) {
    this._store.setValue(this._name, v);
  }

  @computed public get fieldProps() {
    return {
      disabled: this.disabled,
      onBlur: this.onBlur,
      onChange: this.onChangeHandler,
      onFocus: this.onFocusHandler,
      name: this.name,
      value: this.value
    };
  }

  @action protected onBlur = () => {
    this._focused = false;
    this.touched = true;
  }

  @action protected onChangeHandler = (e) => {
    const { transformValue } = this._options;

    if (e && e.target) {
      return this._store.setValue(this._name, transformValue(e.target.value));
    }

    this._store.setValue(this._name, transformValue(e));
  }

  @action protected onFocusHandler = () => {
    this._focused = true;
  }
}
