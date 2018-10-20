import { Field } from "./Field";
declare type FormAdministrationFields<T> = {
    [K in keyof T]?: Field<T[K]>;
};
export declare class FormAdministration<T extends {}, K extends keyof T = keyof T> {
    private _fields;
    readonly fields: FormAdministrationFields<T>;
    readonly fieldsArray: {
        key: K;
        field: Field<T[K]>;
    }[];
    getField(key: K): FormAdministrationFields<T>[K];
    registerField(path: string, field: Field<any>): void;
}
export {};
