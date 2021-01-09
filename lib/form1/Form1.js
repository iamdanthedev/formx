var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { observer } from "mobx-react";
import { Form1Store } from "./Form1.store";
let Form1 = class Form1 extends React.Component {
    constructor() {
        super(...arguments);
        this.store = new Form1Store();
    }
    render() {
        return (React.createElement("section", null,
            React.createElement("h2", null, "Form 1 Test"),
            React.createElement("form", null,
                React.createElement("div", null,
                    "Any:",
                    React.createElement("br", null),
                    React.createElement("input", Object.assign({}, this.store.fieldProps("firstName")))),
                React.createElement("div", null,
                    "Only letters:",
                    React.createElement("br", null),
                    React.createElement("input", Object.assign({}, this.store.fieldProps("lastName")))),
                React.createElement("div", null,
                    React.createElement("input", { type: "button", onClick: this.store.reset, value: "Reset form" }))),
            React.createElement("div", null,
                React.createElement("h4", null, "Store:"),
                React.createElement("pre", null, JSON.stringify(this.store, null, 4))),
            React.createElement("div", null,
                React.createElement("h4", null, "Store.values:"),
                React.createElement("pre", null, JSON.stringify(this.store.values, null, 4))),
            React.createElement("div", null,
                React.createElement("h4", null, "Store.errors:"),
                React.createElement("pre", null, JSON.stringify(this.store.errors, null, 4)))));
    }
};
Form1 = __decorate([
    observer
], Form1);
export default Form1;
//# sourceMappingURL=Form1.js.map