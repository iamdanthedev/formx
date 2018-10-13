import { FormStore, observableField } from "../../../src";
import { computed } from "mobx";

const onlyLetters = value =>
  value.match(/^[a-zA-Z]*$/) ? true : "Only letters";

const onlyNumbers = value =>
  value.match(/^[0-9]*$/) ? true : "Only numbers";

interface Form1Data {
  firstName: string;
  lastName: string;
  zipCode: string;
}

export class Form2Store extends FormStore<Form1Data> implements Form1Data {
  __name = "Form2";

  constructor() {
    super();

    window["form2"] = this;
  }

  @observableField({
    initialValue: "",
    label: "First Name",
    validate: onlyLetters
  })
  firstName: string;

  @observableField({
    initialValue: "",
    label: "Last Name (only letters)",
    validate: onlyLetters
  })
  lastName: string;

  @observableField({
    initialValue: "",
    label: "Postal code",
    validate: onlyNumbers
  })
  zipCode: string;

  @computed
  get name() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
