import * as React from "react";
import { observer } from "mobx-react";
import { FormStore } from "../FormStore";
import { Field } from "../Field";

type Props<T extends {}, K extends keyof T = keyof T> = {
  children: (field: Field<T[K]>, store: FormStore<T>) => React.ReactNode;
  store: FormStore<T>;
  field: K;
};

class FormField<T extends {}, K extends keyof T = keyof T> extends React.Component<Props<T>> {
  render() {
    const { children, field: key, store } = this.props;

    const field = store.field(key);

    return children(field, store);
  }
}

export default observer(FormField);
