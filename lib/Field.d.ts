import { FormStore } from "./FormStore";
declare type FieldValidateCallback<T> = (value: T) => boolean | string;
export declare type FieldOptions<T> = {
    initialValue: T;
    label?: string;
    name?: string;
    validate?: FieldValidateCallback<T>;
};
export declare type FieldState<T> = {
    clear: boolean;
    dirty: boolean;
    disabled: boolean;
    error: string;
    focused: boolean;
    invalid: boolean;
    label: string;
    name: string;
    touched: boolean;
    valid: boolean;
    value: T;
};
export declare class Field<T> {
    /**
     * todo: does it need to know the formStore?
     */
    private readonly _formStore;
    private readonly _initialOptions;
    private readonly _options;
    private _disabled;
    private _error;
    private _focused;
    private _label;
    private _name;
    private _touched;
    private _value;
    constructor(
    /**
     * todo: does it need to know the formStore?
     */
    _formStore: FormStore<any>, _initialOptions: FieldOptions<T>);
    readonly dirty: boolean;
    disabled: boolean;
    readonly focused: boolean;
    readonly hasError: boolean;
    label: string;
    readonly name: string;
    readonly state: FieldState<T>;
    touched: boolean;
    readonly valid: boolean;
    value: T;
    readonly error: string;
    readonly formProps: {
        onBlur: () => void;
        onChange: (e: any) => void;
        onFocus: () => void;
        name: string;
        value: T;
    };
    reset(): void;
    protected onBlur(): void;
    protected onChange(e: any): void;
    protected onFocus(): void;
    protected log(...args: any[]): void;
    private _validate;
}
export {};
