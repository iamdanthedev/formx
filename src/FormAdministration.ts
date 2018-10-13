import { action, computed, observable } from "mobx";
import { Field } from "./Field";

type FormAdministrationFields<T> = { [K in keyof T]?: Field<T[K]> };

export class FormAdministration<T extends {}, K extends keyof T = keyof T> {
  @observable
  private _fields: FormAdministrationFields<T> = {};

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

  public getField(key: K) {
    return this._fields[key];
  }

  @action
  public registerField(path: string, field: Field<any>) {
    if (this._fields[path]) {
      throw new Error(
        `Attempt to register field ${path} failed. \nReason: field already registered`
      );
    }

    this._fields[path] = field;
  }
}
