import { FormStore } from "../../../src";
interface Form1Data {
    firstName: string;
    lastName: string;
}
export declare class Form1Store extends FormStore<Form1Data> implements Form1Data {
    name: string;
    firstName: string;
    lastName: string;
}
export {};
