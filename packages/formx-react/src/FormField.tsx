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

export function FormField<T = any>(props: Props<T>) {
  const formStore = useFormStore();

  if (!formStore) {
    throw new Error("FormField should be nested under Form");
  }

  const field = React.useMemo(() => formStore.registerField(props.name, props.fieldOptions), [
    props.name,
  ]);

  useEffect(() => {
    return () => {
      formStore.unregisterField(props.name);
    };
  }, []);

  return <Observer>{() => props.children(field, formStore)}</Observer>;
}
