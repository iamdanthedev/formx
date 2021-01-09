var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { shouldUpdate } from "recompose";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextFieldMui from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "./TextField";
import { onlyLetters } from "../../utils";
import { Field, FormStore } from "../../../src";
class DynamicFormStore extends FormStore {
    constructor() {
        super(...arguments);
        this.num = 1;
        this.displayFormState = true;
        this.displayFieldState = true;
    }
}
__decorate([
    observable
], DynamicFormStore.prototype, "num", void 0);
__decorate([
    observable
], DynamicFormStore.prototype, "displayFormState", void 0);
__decorate([
    observable
], DynamicFormStore.prototype, "displayFieldState", void 0);
const Fields = props => {
    const { fields } = props;
    return (React.createElement(Grid, { container: true, item: true, xs: 6, spacing: 16 }, fields.map(field => {
        console.info("in loop", field.name);
        return (React.createElement(Grid, { item: true, xs: 4, key: field.name },
            React.createElement(TextField, { field: field })));
    })));
};
const FieldsOptimised = shouldUpdate((props, nextProps) => props.fields.length !== nextProps.fields.length)(Fields);
let DynamicForm = class DynamicForm extends React.Component {
    constructor() {
        super(...arguments);
        this.store = new DynamicFormStore();
        this.handleAdd = () => {
            for (let i = 0; i < this.store.num; i++) {
                const name = `field_${this.store.fields.length + 1}`;
                this.store.registerField(name, new Field(this.store, {
                    initialValue: "",
                    name,
                    label: `Field ${name}`,
                    validate: onlyLetters
                }));
            }
        };
    }
    render() {
        console.info("DynamicForm render");
        const fields = this.store.fields;
        const fieldNames = this.store.fields.map(f => f.name);
        return (React.createElement("section", null,
            React.createElement(Grid, { container: true },
                React.createElement(FieldsOptimised, { fields: this.store.fields }),
                React.createElement(Grid, { item: true, xs: 6, direction: "column" },
                    React.createElement(Grid, { item: true, container: true, alignItems: "center", xs: 12 },
                        React.createElement(Grid, { item: true, xs: 6 },
                            React.createElement(TextFieldMui, { name: "num", type: "number", label: "How many fields to add", onChange: e => (this.store.num = parseInt(e.target.value)), value: this.store.num })),
                        React.createElement(Grid, { xs: 6 },
                            React.createElement(Button, { onClick: this.handleAdd }, "Add new field (only letters validation)"))),
                    React.createElement(Grid, { container: true },
                        React.createElement(Grid, { item: true, xs: 6 },
                            React.createElement("div", { style: { display: "flex" } },
                                React.createElement(Checkbox, { checked: this.store.displayFormState, onChange: e => (this.store.displayFormState = e.target.checked) }),
                                React.createElement("h4", null, "Form State (store.state)")),
                            this.store.displayFormState && (React.createElement("pre", null, JSON.stringify(this.store.state, null, 4)))),
                        React.createElement(Grid, { item: true, xs: 6 },
                            !this.store.focusedField && (React.createElement("h4", null, "Field state (select field):")),
                            this.store.focusedField && (React.createElement(React.Fragment, null,
                                React.createElement("h4", null,
                                    "Field State ",
                                    this.store.focusedField.name),
                                React.createElement("pre", null, JSON.stringify(this.store.focusedField.state, null, 4))))))))));
    }
};
DynamicForm = __decorate([
    observer
], DynamicForm);
export { DynamicForm };
export default DynamicForm;
//# sourceMappingURL=DynamicForm.js.map