import * as React from "react";
import { FormStore } from "../../../src";
declare class DynamicFormStore extends FormStore<any> {
    num: number;
    displayFormState: boolean;
    displayFieldState: boolean;
}
export declare class DynamicForm extends React.Component {
    store: DynamicFormStore;
    handleAdd: () => void;
    render(): JSX.Element;
}
export default DynamicForm;
