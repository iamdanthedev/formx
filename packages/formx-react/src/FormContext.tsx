import React from "react";
import { IFormStore, FormData } from "formx";

export type FormContextType = {
  store: IFormStore<any>;
};

export const FormContext = React.createContext<IFormStore<any>>(null);

export function useFormStore<Store extends IFormStore<any> = IFormStore<any>>() {
  return React.useContext(FormContext) as Store;
}
