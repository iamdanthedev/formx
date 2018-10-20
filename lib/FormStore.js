var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as React from "react";
import { action, computed, observable } from "mobx";
import { FormAdministration } from "./FormAdministration";
import { Field } from "./Field";
export class FormStore {
    constructor() {
        this.__name = "unnamed-form-store";
        this._submitting = false;
        this.field = this.field.bind(this);
        this.fieldProps = this.fieldProps.bind(this);
        this.submit = this.submit.bind(this);
    }
    get clean() {
        return !this.dirty;
    }
    get dirty() {
        return this._administration.fieldsArray.reduce((p, c) => p || c.field.dirty, false);
    }
    get fields() {
        return this._administration.fieldsArray.map(f => f.field);
    }
    get focusedField() {
        const field = this._administration.fieldsArray.find(f => f.field.focused);
        return field ? field.field : null;
    }
    get invalid() {
        return !this.valid;
    }
    get submitting() {
        return this._submitting;
    }
    get touched() {
        return this._administration.fieldsArray.reduce((p, c) => p || c.field.touched, false);
    }
    get valid() {
        return this._administration.fieldsArray.reduce((p, c) => p && c.field.valid, true);
    }
    get values() {
        const result = {};
        const keys = Object.getOwnPropertyNames(this._administration.fields);
        keys.forEach(key => {
            result[key] = this._administration.fields[key].value;
        });
        return result;
    }
    get errors() {
        const result = {};
        const keys = Object.getOwnPropertyNames(this._administration.fields);
        keys.forEach(key => {
            const err = this._administration.fields[key].error;
            if (err != null) {
                result[key] = this._administration.fields[key].error;
            }
        });
        return result;
    }
    get state() {
        return {
            clean: !this.dirty,
            dirty: this.dirty,
            invalid: this.invalid,
            errors: this.errors,
            pristine: !this.dirty,
            submitting: this.submitting,
            touched: this.touched,
            valid: this.valid,
            validating: false,
            values: this.values
        };
    }
    field(key) {
        return this._administration.getField(key);
    }
    /**
     * @todo probably not needed
     */
    fieldProps(key) {
        const field = this._administration.getField(key);
        if (!field) {
            console.error(`Field ${key} not found. All fields must be initialized with @observableField`);
            return null;
        }
        return field.formProps;
    }
    submit(e) {
        this._log("submit");
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (!this.onSubmit) {
            throw new Error("onSubmit handler is missing");
        }
        this._submitting = true;
        this.onSubmit()
            .then(res => {
            this._submitting = false;
            this.onSubmitSuccess && this.onSubmitSuccess(res);
        })
            .catch(e => {
            this._submitting = false;
            if (this.onSubmitFail) {
                this.onSubmitFail(e);
            }
            else {
                throw e;
            }
        });
    }
    /**
     * @todo: remove name argugment, should user field.name
     */
    registerField(name, field) {
        this._administration.registerField(name, field);
    }
    reset() {
        Object.keys(this._administration.fields).forEach(key => {
            this._administration.fields[key].reset();
        });
    }
    _log(...args) {
        console.log(`FormStore ${this.__name}`, ...args);
    }
    get _administration() {
        if (!this["__FormAdministration"]) {
            Object.defineProperty(this, "__FormAdministration", {
                configurable: false,
                enumerable: false,
                value: new FormAdministration(),
                writable: false
            });
        }
        return this["__FormAdministration"];
    }
}
__decorate([
    observable,
    __metadata("design:type", Object)
], FormStore.prototype, "_submitting", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "clean", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "dirty", null);
__decorate([
    computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "fields", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "focusedField", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "invalid", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "submitting", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "touched", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "valid", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "values", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "errors", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FormStore.prototype, "state", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FormStore.prototype, "submit", null);
__decorate([
    action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Field]),
    __metadata("design:returntype", void 0)
], FormStore.prototype, "registerField", null);
__decorate([
    action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormStore.prototype, "reset", null);
//# sourceMappingURL=FormStore.js.map