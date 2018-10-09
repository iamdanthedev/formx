import { Field } from "./Field";

export class FormAdministration {
  private _fields: Record<string, Field<any>> & object = {};

  public get fields() {
    return this._fields;
  }

  public registerField(path: string, field: Field<any>) {
    if (this._fields[path]) {
      throw new Error(
        `Attempt to register field ${path} failed. \nReason: field already registered`
      );
    }

    this._fields[path] = field;
  }
}
