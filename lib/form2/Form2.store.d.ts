import { FormStore } from "../../../src";
interface Address {
    street: string;
    zipCode: string;
}
interface Form2Data {
    firstName: string;
    lastName: string;
    address: Address;
    specializations: string[];
    contacts: Array<{
        name: string;
        job: string;
    }>;
}
export declare class Form2Store extends FormStore<Form2Data> {
    validationSchema: any;
    constructor();
    get name(): string;
    onSubmit: () => Promise<unknown>;
    get allSpecializations(): string[];
}
export {};
