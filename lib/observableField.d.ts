import { FieldOptions } from "./Field";
import { FormStore } from "./FormStore";
export declare function observableField<T>(options: FieldOptions<T>): (target: FormStore<any, string | number | symbol>, property: string) => void;
