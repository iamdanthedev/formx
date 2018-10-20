import * as React from "react";
import { Field } from "./Field";
export declare type FormErrors<T extends {}> = Record<keyof T, string>;
export declare type CommonFieldProps<T> = {
    onBlur: (e: any) => void;
    onChange: (e: any) => void;
    name: string;
    value: T;
};
declare type BaseFormData = {
    [K: string]: any;
};
export declare type FormState<T extends {}> = {
    clean: boolean;
    dirty: boolean;
    invalid: boolean;
    submitting: boolean;
    errors: FormErrors<T>;
    touched: boolean;
    pristine: boolean;
    valid: boolean;
    validating: boolean;
    values: T;
};
export declare class FormStore<T extends BaseFormData, K extends keyof T = keyof T> {
    protected __name: string;
    private _submitting;
    constructor();
    readonly clean: boolean;
    readonly dirty: boolean;
    readonly fields: Array<Field<any>>;
    readonly focusedField: Field<T[keyof T]>;
    readonly invalid: boolean;
    readonly submitting: boolean;
    readonly touched: boolean;
    readonly valid: boolean;
    readonly values: T;
    readonly errors: FormErrors<T>;
    readonly state: FormState<T>;
    field(key: K): { [K_1 in keyof T]?: Field<T[K_1]>; }[keyof T];
    /**
     * @todo probably not needed
     */
    fieldProps<K extends keyof T = keyof T>(key: K): CommonFieldProps<T[K]>;
    submit(e: React.FormEvent<HTMLFormElement>): void;
    onSubmit?(): Promise<any>;
    onSubmitSuccess?(submitRes: any): Promise<T>;
    onSubmitFail?(e: any): Promise<FormErrors<T>>;
    /**
     * @todo: remove name argugment, should user field.name
     */
    registerField<V>(name: string, field: Field<V>): void;
    reset(): void;
    validate?(): Promise<T>;
    protected _log(...args: any[]): void;
    private readonly _administration;
}
export {};
