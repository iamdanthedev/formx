import * as React from "react";
import { FormStore } from "../FormStore";

export type FormContextType = {
  store: FormStore<any>;
}

export const FormContext = React.createContext<FormContextType>({ store: null });
