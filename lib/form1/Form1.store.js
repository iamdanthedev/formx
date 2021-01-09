var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { FormStore, observableField } from "../../../src";
export class Form1Store extends FormStore {
    constructor() {
        super(...arguments);
        this.name = "Form1";
    }
}
__decorate([
    observableField({
        initialValue: ""
    })
], Form1Store.prototype, "firstName", void 0);
__decorate([
    observableField({
        initialValue: "",
        validate: value => (value.match(/^[a-zA-Z]$/) ? true : "Only letters")
    })
], Form1Store.prototype, "lastName", void 0);
//# sourceMappingURL=Form1.store.js.map