import { FormStore, observableField } from "../../../src";

interface Form1Data {
  firstName: string;
  lastName: string;
}

export class Form1Store extends FormStore<Form1Data> implements Form1Data {
  name = "Form1";

  @observableField({
    initialValue: ""
  })
  firstName: string;

  @observableField({
    initialValue: "",
    validate: value => (value.match(/^[a-zA-Z]$/) ? true : "Only letters")
  })
  lastName: string;
}
