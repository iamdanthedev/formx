import { Field, FieldOptions } from "./Field";
import { FormStore } from "./FormStore";
import { FormAdministration } from "./FormAdministration";
import { objectToFlatMapDeep } from "./utils";

type FormxOptions<T> = T extends object
  ? FormxOptionsObject<T>
  : FieldOptions<T>;

type FormxOptionsObject<T extends {}> = { [K in keyof T]: FormxOptions<T[K]> };

export function formx<T extends {}>(options: FormxOptions<T>) {
  return function(ctr: Function) {
    decorateStore(options, ctr);
  };
}

function decorateStore<T extends {}>(options: FormxOptions<T>, ctr: Function) {
  if (!(ctr.prototype instanceof FormStore)) {
    throw new Error("decorated class must extends FormStore class");
  }

  if (typeof options !== "object" || Array.isArray(options)) {
    throw new Error("wrong args");
  }

  if (!ctr.hasOwnProperty("__FormAdministration")) {
    Object.defineProperty(ctr, "__FormAdministration", {
      configurable: false,
      enumerable: false,
      value: new FormAdministration(),
      writable: false
    });
  }

  const fieldMap = objectToFlatMapDeep(options);

  fieldMap.forEach(({ path, value: fieldOptions }) => {
    const field = new Field(null, fieldOptions);
  });

  console.log("decorateStore", options, ctr);
}

function isFieldDesc(arg: any): arg is FieldOptions<any> {
  return arg.__formxFieldOptions === true;
}
