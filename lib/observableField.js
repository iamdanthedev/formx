import { Field } from "./Field";
import { FormAdministration } from "./FormAdministration";
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
//# sourceMappingURL=observableField.js.map