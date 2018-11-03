import * as React from "react";
import debug from "debug";
import { Observer } from "mobx-react";
import { FormContext, FormContextType } from "./FormContext";
import { FormStore } from "../FormStore";
import { Field } from "../Field";

type Props = {
  name: string;
  children: (field: Field<any>, store: FormStore<any>) => React.ReactNode;
};

class FormField extends React.Component<Props, {}, FormContextType> {
  static contextType = FormContext;

  name: string;
  field: Field<any>;
  log: debug.IDebugger;

  constructor(props: Props, context: FormContextType) {
    super(props);

    if (!context || !context.store) {
      throw new Error(
        "missing context. FormField should be nested within FormX"
      );
    }

    this.name = props.name;
    this.field = context.store.registerField(props.name);
    this.log = debug(`FormXReact:FormField:${props.name}`);
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.name !== this.name) {
      throw new Error("name property is immutable");
    }

    return true;
  }

  componentWillUnmount() {
    this.context.store.unregisterField(this.name);
  }

  render() {
    this.log("render");

    const { children, name } = this.props;

    return (
      <Observer>{() => children(this.field, this.context.store)}</Observer>
    );
  }
}

export default FormField;
