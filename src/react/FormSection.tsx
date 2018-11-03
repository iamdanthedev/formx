import * as React from "react";
import { observer } from "mobx-react";
import { FormStore } from "../FormStore";
import { Field } from "../Field";

type Props<
  T extends {},
  K extends keyof T = keyof T,
  KK extends keyof T[K] = keyof T[K]
> = {
  children: (secion: (name: KK) => Field<T[K][KK]>) => React.ReactNode;
  store: FormStore<T>;
  name: K;
};

class FormSection<
  T extends {},
  K extends keyof T = keyof T,
  KK extends keyof T[K] = keyof T[K]
> extends React.Component<Props<T, K, KK>> {
  getField = (fieldName: KK): Field<T[K][KK]> => {
    const { name, store } = this.props;
    const path = `${name}.${fieldName}`;
    const field = store.field(path);

    if (!field) {
      throw new Error(`cannot get field ${fieldName} in section ${name}`);
    }

    return field;
  };

  render() {
    const { children } = this.props;
    return children(this.getField);
  }
}

export default observer(FormSection);
