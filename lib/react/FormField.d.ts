import * as React from "react";
import { FormStore } from "../FormStore";
import { Field } from "../Field";
declare type Props<T extends {}, K extends keyof T = keyof T> = {
    children: (field: Field<T[K]>, store: FormStore<T>) => React.ReactNode;
    store: FormStore<T>;
    field: K;
};
declare class FormField<T extends {}, K extends keyof T = keyof T> extends React.Component<Props<T>> {
    render(): React.ReactNode;
}
declare const _default: typeof FormField;
export default _default;
