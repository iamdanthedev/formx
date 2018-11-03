import * as React from "react";
import debug from "debug";
import { Observer } from "mobx-react";
import { FormContext, FormContextType } from "./FormContext";
import FormField from "./FormField";
import { FormStore } from "../FormStore";
import { Field } from "../Field";

type FieldArrayHelpers<T> = {
  name: string;
  push: (value: T) => void;
  remove: (index: number) => void;
  value: T[];
};

type Props<T> = {
  name: string;
  children: (
    helpers: FieldArrayHelpers<T>,
    store: FormStore<any>
  ) => React.ReactNode;
};

class FieldArray<T> extends React.Component<Props<T>, {}, FormContextType> {
  static contextType = FormContext;

  log: debug.IDebugger;

  constructor(props: Props<T>, context: FormContextType) {
    super(props);

    if (!context || !context.store) {
      throw new Error(
        "missing context. FormField should be nested within FormX"
      );
    }

    this.log = debug(`FormXReact:FieldArray:${props.name}`);
  }

  get value() {
    const v = this.context.store.getValue(this.props.name);

    if (v && Array.isArray(v)) {
      return v;
    }

    console.warn(`value is not an array in path ${name}`);
    return [];
  }

  push = (value: T) => {
    const v = this.context.store.getValue(this.props.name);
    v.push(value);
  };

  remove = (index: number) => {
    const v = this.context.store.getValue(this.props.name);

    if (v && Array.isArray(v) && index < v.length) {
      v.splice(index, 1);
    }
  };

  render() {
    this.log("render");

    const { children, name } = this.props;
    const { store } = this.context;

    return (
      <Observer>
        {() => {
          const v = store.getValue(name);

          if (!v || !Array.isArray(v)) {
            console.warn(`value is not an array in path ${name}`);
            return null;
          }

          return children(
            { name, push: this.push, remove: this.remove, value: this.value },
            store
          );
        }}
      </Observer>
    );
  }
}

export default FieldArray;
