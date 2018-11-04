import * as yup from "yup";
import { FormStore } from "../../../src";
import { capitalFirst, onlyNumbersRe } from "../../utils";

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

const schema = yup.object<Form2Data>({
  firstName: yup.string().required("missing first name"),
  lastName: yup.string().required("missing last name"),
  address: yup
    .object<Address>({
      zipCode: yup.string().matches(onlyNumbersRe, "only numbers here"),
      street: yup.string()
    })
    .nullable(true),
  contacts: yup.array(
    yup.object({
      name: yup.string().matches(capitalFirst, "Capital letter first"),
      job: yup.string()
    })
  ),
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

export class Form2Store extends FormStore<Form2Data> {
  validationSchema = schema;

  constructor() {
    super();

    this.initialize(form2InitialValues);

    this.__name = "Form2";
    window["form2"] = this;
    this.debounceValidationMs = 250;
  }

  get name() {
    return `${this.values.firstName} ${this.values.lastName}`.trim();
  }

  onSubmit = () => {
    return stubSubmit(this.values);
  }

  get allSpecializations() {
    return ["spec1", "spec2", "spec3"];
  }
}

function stubSubmit(values: Form2Data) {
  return new Promise(resolve => {
    console.log("Submitting...", values);
    setTimeout(resolve, 2000);
  });
}
