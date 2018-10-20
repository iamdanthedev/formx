import { Field, FieldOptions } from "./Field";
import { FormStore } from "./FormStore";
import { FormAdministration } from "./FormAdministration";

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