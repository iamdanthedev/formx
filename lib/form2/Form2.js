import * as React from "react";
import { Observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FieldArray from "../../../src/react/FieldArray";
import FormField from "../../../src/react/FormField";
import FormX from "../../../src/react/FormX";
import { Form2Store } from "./Form2.store";
const paperStyle = {
    flex: 1,
    marginBottom: 16,
    padding: 16
};
class Form2 extends React.Component {
    constructor() {
        super(...arguments);
        this.store = new Form2Store();
    }
    render() {
        console.log("render form2");
        console.log(this.store.values);
        const { getField } = this.store;
        return (React.createElement(FormX, { store: this.store },
            React.createElement("section", null,
                React.createElement("h2", null, "Form 2 Test"),
                React.createElement("form", { onReset: this.store.onResetHandler, onSubmit: this.store.submit },
                    React.createElement("div", { style: { display: "flex" } },
                        React.createElement("div", { style: { flex: "1 0 50%" } },
                            React.createElement(Paper, { style: paperStyle },
                                React.createElement(Grid, { container: true },
                                    React.createElement(Grid, { item: true, xs: 12 },
                                        React.createElement(FormField, { name: "firstName" }, field => (React.createElement(TextField, Object.assign({ label: "First name", error: field.invalid, helperText: field.error }, field.formProps))))),
                                    React.createElement(Grid, { item: true, xs: 12 },
                                        React.createElement(FormField, { name: "lastName" }, field => (React.createElement(TextField, Object.assign({ label: "Last name", error: field.invalid, helperText: field.error }, field.formProps))))),
                                    React.createElement(Grid, { item: true, xs: 12 },
                                        React.createElement(FormField, { name: "specializations" }, field => (React.createElement(FormControl, { style: { minWidth: 200 }, error: field.invalid },
                                            React.createElement(InputLabel, { htmlFor: "select-multiple-checkbox" }, "Specializations"),
                                            React.createElement(Select, Object.assign({ fullWidth: true, multiple: true, input: React.createElement(Input, { fullWidth: true, id: "select-multiple-checkbox" }), renderValue: (selected) => selected.join(", ") }, field.formProps), this.store.allSpecializations.map(name => (React.createElement(MenuItem, { key: name, value: name },
                                                React.createElement(ListItemText, { primary: name }))))))))))),
                            React.createElement(Paper, { style: paperStyle },
                                React.createElement(Grid, { container: true, spacing: 16 },
                                    React.createElement(Grid, { item: true, xs: 12 },
                                        React.createElement(Typography, { variant: "h5" }, "Address")),
                                    React.createElement(Grid, { item: true, xs: 12 },
                                        React.createElement(FormField, { name: "address.street" }, field => (React.createElement(TextField, Object.assign({ label: "Street name", error: field.invalid, helperText: field.error }, field.formProps))))),
                                    React.createElement(Grid, { item: true, xs: 12 },
                                        React.createElement(FormField, { name: "address.zipCode" }, field => (React.createElement(TextField, Object.assign({ label: "Zip Code", error: field.invalid, helperText: field.error }, field.formProps))))))),
                            React.createElement(Paper, { style: paperStyle },
                                React.createElement(FieldArray, { name: "contacts" }, ({ value, name, push, remove }) => (React.createElement("div", null,
                                    value.map((item, i) => (React.createElement(Paper, { style: paperStyle, key: i },
                                        React.createElement(Grid, { container: true, spacing: 16, alignItems: "center" },
                                            React.createElement(Grid, { item: true, xs: 4 },
                                                React.createElement(FormField, { name: `${name}[${i}]name` }, field => (React.createElement(TextField, Object.assign({ label: "Name", fullWidth: true, error: field.invalid, helperText: field.error }, field.formProps))))),
                                            React.createElement(Grid, { item: true, xs: 4 },
                                                React.createElement(FormField, { name: `${name}[${i}]job` }, field => (React.createElement(TextField, Object.assign({ label: "Job", fullWidth: true, error: field.invalid, helperText: field.error }, field.formProps))))),
                                            React.createElement(Grid, { item: true, xs: 4 },
                                                React.createElement(Button, { onClick: () => remove(i) }, "Remove")))))),
                                    React.createElement("div", null,
                                        React.createElement(Button, { onClick: () => push({ name: "", job: "" }) }, "Add Contact"),
                                        React.createElement(Button, { onClick: () => {
                                                for (let i = 0; i < 100; i++) {
                                                    push({ name: "", job: "" });
                                                }
                                            } }, "Add 100 Contacts"))))))),
                        React.createElement("div", { style: { flex: "1 0 50%", padding: "0 16px" } },
                            React.createElement(Observer, null, () => (React.createElement("div", null,
                                React.createElement(Button, { color: "primary", type: "primary", variant: "contained", disabled: this.store.isSubmitting ||
                                        this.store.clean ||
                                        this.store.invalid }, this.store.isSubmitting ? "Submitting..." : "Submit"),
                                " ",
                                React.createElement(Button, { type: "reset", variant: "contained", disabled: this.store.clean }, "Reset")))),
                            React.createElement(Observer, null, () => (React.createElement(Grid, { container: true },
                                React.createElement(Grid, { item: true, xs: 6, style: { overflowX: "scroll" } },
                                    React.createElement("h4", null, "Form State (store.state)"),
                                    React.createElement("pre", null, JSON.stringify(this.store.state, null, 4))),
                                React.createElement(Grid, { item: true, xs: 6, style: { overflowX: "scroll" } },
                                    !this.store.focusedField && "No field in focus",
                                    this.store.focusedField && (React.createElement(React.Fragment, null,
                                        React.createElement("div", null,
                                            "Field State ",
                                            this.store.focusedField.name),
                                        React.createElement("pre", null, JSON.stringify(this.store.focusedField.state, null, 4))))))))))))));
    }
}
export default Form2;
//# sourceMappingURL=Form2.js.map