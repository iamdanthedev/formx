import { computed } from "mobx";
import { field, FormStore } from "../../../src";
import { onlyLetters, onlyNumbers } from "../../utils";

interface Address {
  street: string;
  zipCode: string;
}

class Form2Data {
  firstName: string;
  lastName: string;
  address: Address;
  specializations: string[];
  contacts: Array<{
    name: string;
    job: string;
  }>;
}

const form2InitialValues = {
  firstName: "",
  lastName: "",
  address: null,
  specializations: [],
  contacts: []
};

export class Form2Store extends FormStore<Form2Data> {
  constructor() {
    super();

    this.initialize(form2InitialValues);

    this.__name = "Form2";
    window["form2"] = this;
  }

  get name() {
    return `${this.values.firstName} ${this.values.lastName}`.trim();
  }

  onSubmit() {
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
