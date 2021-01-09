import React, { useEffect } from "react";
import { Observer } from "mobx-react";
import { Field, FieldOptions, IFormStore } from "formx";
import { useFormStore } from "./FormContext";

export { FieldOptions };

type Props<T> = {
  name: string;
  children: (field: Field<any>, store: IFormStore<any>) => React.ReactElement<any>;
  fieldOptions?: FieldOptions<any>;
};

export function useFormField<T = any>(name: string, options?: FieldOptions<T>) {
  const formStore = useFormStore();

  if (!formStore) {
    throw new Error("FormField should be nested under Form");
  }

  const field = React.useMemo(() => formStore.registerField(name, options), [name]);

  useEffect(() => {
    return () => {
      formStore.unregisterField(name);
    };
  }, []);

  return { field, formStore };
}

export function FormField<T = any>(props: Props<T>) {
  const { field, formStore } = useFormField(props.name, props.fieldOptions);

  return <Observer>{() => props.children(field, formStore)}</Observer>;
}
