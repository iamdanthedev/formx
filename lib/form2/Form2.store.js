import * as yup from "yup";
import { FormStore } from "../../../src";
import { capitalFirst, onlyNumbersRe } from "../../utils";
const schema = yup.object({
    firstName: yup.string().required("missing first name"),
    lastName: yup.string().required("missing last name"),
    address: yup
        .object({
        zipCode: yup.string().matches(onlyNumbersRe, "only numbers here"),
        street: yup.string()
    })
        .nullable(true),
    contacts: yup.array(yup.object({
        name: yup.string().matches(capitalFirst, "Capital letter first"),
        job: yup.string()
    })),
    specializations: yup
        .array(yup.string())
        .min(1, "select at least one specialization")
});
const form2InitialValues = {
    firstName: "",
    lastName: "",
    address: null,
    specializations: [],
    contacts: []
};
export class Form2Store extends FormStore {
    constructor() {
        super();
        this.validationSchema = schema;
        this.onSubmit = () => {
            return stubSubmit(this.values);
        };
        this.initialize(form2InitialValues);
        this.__name = "Form2";
        window["form2"] = this;
        this.debounceValidationMs = 250;
    }
    get name() {
        return `${this.values.firstName} ${this.values.lastName}`.trim();
    }
    get allSpecializations() {
        return ["spec1", "spec2", "spec3"];
    }
}
function stubSubmit(values) {
    return new Promise(resolve => {
        console.log("Submitting...", values);
        setTimeout(resolve, 2000);
    });
}
//# sourceMappingURL=Form2.store.js.map