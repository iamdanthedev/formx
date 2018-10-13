import { FormStore, observableField } from "../../../src";
import { computed } from "mobx";

const onlyLetters = value =>
  value.match(/^[a-zA-Z]$/) ? true : "Only letters";

interface Form1Data {
  firstName: string;
  lastName: string;
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

  @computed
  get name() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
