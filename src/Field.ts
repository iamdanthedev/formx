import { action, computed, observable } from "mobx";
import { isEqual } from "lodash";
import { FormStore } from "./FormStore";
import { FieldState } from "./types";

export class Field<T> {
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
    return !isEqual(
      this._store.getValue(this._name),
      this._store.getInitialValue(this._name)
    );
  }

  @computed
  public get disabled() {
    return this._store.disabled;
  }

  @computed
  public get focused() {
    return this._focused;
  }

  public set focused(v: boolean) {
    this.log("set focused", v);
    this._focused = v;
  }

  @computed
  public get name(): string {
    return this._name;
  }

  @computed
  public get initialValue(): T {
    return this._store.getInitialValue(this._name);
  }

  @computed
  public get state(): FieldState<T> {
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

  @computed
  public get touched() {
    return this._touched;
  }

  public set touched(v: boolean) {
    this.log("set touched", v);
    this._touched = v;
  }

  @computed
  public get invalid() {
    return !this.valid;
  }

  @computed
  public get valid() {
    return !Boolean(this.error);
  }

  @computed
  public get error() {
    return this._store.getError(this._name);
  }

  @computed
  public get value() {
    return this._store.getValue(this._name) as T;
  }

  public set value(v: T) {
    this._store.setValue(this._name, v);
  }

  @computed
  public get formProps() {
    return {
      disabled: this.disabled,
      onBlur: this.onBlur,
      onChange: this.onChangeHandler,
      onFocus: this.onFocusHandler,
      name: this.name,
      value: this.value
    };
  }

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
}
