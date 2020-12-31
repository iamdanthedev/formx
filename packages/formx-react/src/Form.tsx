import React from "react";
import { IFormStore } from "formx";
import { FormContext } from "./FormContext";

export interface FormProps<T> {
  store: IFormStore<T>;
  children?: React.ReactNode;
}

export function Form<T>(props: FormProps<T>) {
  const { children, store } = props;

  if (!store) {
    throw new Error("missing form store");
  }

  return <FormContext.Provider value={store}>{children}</FormContext.Provider>;
}
