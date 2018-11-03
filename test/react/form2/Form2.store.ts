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

export class Form2Store extends FormStore<Form2Data> {
  constructor() {
    super({
      firstName: field({
        initialValue: "",
        label: "First Name",
        validate: onlyLetters
      }),

      lastName: field({
        initialValue: "",
        label: "Last Name (only letters)",
        validate: onlyLetters
      }),

      address: {
        street: field({
          initialValue: "",
          label: "Street name",
          validate: onlyLetters
        }),

        zipCode: field({
          initialValue: "",
          label: "Zip Code",
          validate: onlyNumbers
        })
      },

      specializations: field({
        initialValue: [],
        label: "Specializations"
      }),

      contacts: you
    });

    this.__name = "Form2";

    window["form2"] = this;
  }

  // @computed
  // get name() {
  //   return `${this.field("firstName").value} ${
  //     this.field("lastName").value
  //   }`.trim();
  // }

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
