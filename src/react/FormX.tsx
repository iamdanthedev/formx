import * as React from "react";
import debug from "debug";
import { FormContext } from "./FormContext";
import { FormStore } from "../FormStore";

const log = debug("FormXReact:FormX");

export type FormXProps<T> = {
  store: FormStore<T>;
};

class FormX<T> extends React.Component<FormXProps<T>> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    log("render");

    const { children, store } = this.props;

    if (!store || !(store instanceof FormStore)) {
      throw new Error(
        "FormX component expects store prop to be instance of FormStore"
      );
    }

    return (
      <FormContext.Provider value={{ store }}>{children}</FormContext.Provider>
    );
  }
}

export default FormX;
