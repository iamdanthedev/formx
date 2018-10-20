var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { action, computed, observable } from "mobx";
import { Field } from "./Field";
export class FormAdministration {
    constructor() {
        this._fields = {};
    }
    get fields() {
        return this._fields;
    }
    get fieldsArray() {
        return Object.keys(this._fields).map(key => ({
            key,
            field: this._fields[key]
        }));
    }
    getField(key) {
        return this._fields[key];
    }
    registerField(path, field) {
        if (this._fields[path]) {
            throw new Error(`Attempt to register field ${path} failed. \nReason: field already registered`);
        }
        this._fields[path] = field;
    }
}
__decorate([
    observable,
    __metadata("design:type", Object)
], FormAdministration.prototype, "_fields", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormAdministration.prototype, "fields", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormAdministration.prototype, "fieldsArray", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Field]),
    __metadata("design:returntype", void 0)
], FormAdministration.prototype, "registerField", null);
//# sourceMappingURL=FormAdministration.js.map