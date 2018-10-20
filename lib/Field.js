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
import { FormAdministration } from "./FormAdministration";
export class Field {
    constructor(
    /**
     * todo: does it need to know the formStore?
     */
    _formStore, _initialOptions) {
        this._formStore = _formStore;
        this._initialOptions = _initialOptions;
        this._disabled = false;
        this._error = null;
        this._focused = false;
        this._label = "";
        this._name = "unnamed";
        this._touched = false;
        this.log("constructor", _initialOptions);
        this._options = Object.assign({}, _initialOptions, { initialValue: _initialOptions.initialValue != null
                ? _initialOptions.initialValue
                : null, validate: _initialOptions.validate || null });
        this._label = this._options.label;
        this._name = this._options.name;
        this._value = this._options.initialValue;
    }
    get dirty() {
        return this._value !== this._options.initialValue;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(v) {
        this._disabled = v;
    }
    get focused() {
        return this._focused;
    }
    get hasError() {
        return Boolean(this._error);
    }
    get label() {
        return this._label;
    }
    set label(v) {
        this._label = v;
    }
    get name() {
        return this._name;
    }
    get state() {
        return {
            clear: !this.dirty,
            dirty: this.dirty,
            disabled: this.disabled,
            error: this.error,
            focused: this.focused,
            invalid: !this.valid,
            label: this.label,
            name: this.name,
            touched: this.touched,
            valid: this.valid,
            value: this.value
        };
    }
    get touched() {
        return this._touched;
    }
    set touched(v) {
        this.log("set touched", v);
        this._touched = v;
    }
    get valid() {
        return !Boolean(this._error);
    }
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v;
        this.touched = true;
        this._validate();
    }
    get error() {
        return this._error;
    }
    get formProps() {
        return {
            onBlur: this.onBlur,
            onChange: this.onChange,
            onFocus: this.onFocus,
            // @ts-ignore
            name: this.name,
            value: this.value
        };
    }
    reset() {
        this.value = this._options.initialValue;
    }
    onBlur() {
        this.log("onBlur");
        this._focused = false;
        this.touched = true;
    }
    onChange(e) {
        this.log("onChange", e);
        if (!e || !e.target || typeof e.target.value === "undefined") {
            console.error("Invalid event");
            return;
        }
        this.value = e.target.value;
    }
    onFocus() {
        this.log("onFocus");
        this._focused = true;
    }
    log(...args) {
        console.log(`Field ${this.name}`, ...args);
    }
    _validate() {
        if (!this._options.validate) {
            return;
        }
        const result = this._options.validate(this._value);
        if (result === true) {
            this._error = null;
            return;
        }
        if (result === false) {
            this._error = "invalid value";
            return;
        }
        if (typeof result === "string") {
            this._error = result;
            return;
        }
        // @ts-ignore
        this._error = result.toString();
    }
}
__decorate([
    observable,
    __metadata("design:type", Boolean)
], Field.prototype, "_disabled", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], Field.prototype, "_error", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], Field.prototype, "_focused", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], Field.prototype, "_label", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], Field.prototype, "_name", void 0);
__decorate([
    observable,
    __metadata("design:type", Boolean)
], Field.prototype, "_touched", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], Field.prototype, "_value", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Field.prototype, "dirty", null);
__decorate([
    computed,
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Field.prototype, "disabled", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Field.prototype, "focused", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Field.prototype, "hasError", null);
__decorate([
    computed,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Field.prototype, "label", null);
__decorate([
    computed,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Field.prototype, "name", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Field.prototype, "state", null);
__decorate([
    computed,
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Field.prototype, "touched", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Field.prototype, "valid", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Field.prototype, "value", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Field.prototype, "error", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Field.prototype, "formProps", null);
__decorate([
    action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Field.prototype, "onBlur", null);
__decorate([
    action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Field.prototype, "onChange", null);
__decorate([
    action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Field.prototype, "onFocus", null);
export function observableField(options) {
    return function (target, property) {
        const field = new Field(target, Object.assign({ name: property }, options));
        delete target[property];
        Object.defineProperty(target, property, {
            get: () => {
                return field.value;
            },
            set: value => {
                field.value = value;
            },
            configurable: false,
            enumerable: true
        });
        if (!target.hasOwnProperty("__FormAdministration")) {
            Object.defineProperty(target, "__FormAdministration", {
                configurable: false,
                enumerable: false,
                value: new FormAdministration(),
                writable: false
            });
        }
        target["__FormAdministration"].registerField(property, field);
    };
}
//# sourceMappingURL=Field.js.map