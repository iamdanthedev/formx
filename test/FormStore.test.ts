import { expect } from "chai";
import { FormStore } from "../src/FormStore";
import { observableField } from "../src/Field";

type TestFormData = {
  firstName: string;
  lastName: string;
};

describe("TestForm", () => {
  class TestForm extends FormStore<TestFormData> implements TestFormData {
    @observableField({
      defaultValue: ""
    })
    firstName: string;

    @observableField({
      defaultValue: "",
      validate: value => (value.match(/^[a-zA-Z]$/) ? true : "Only letters")
    })
    lastName: string;
  }

  describe("fields", () => {
    it("should be accessible", () => {
      const formStore = new TestForm();
      expect(formStore.firstName).eq("");
      expect(formStore.lastName).eq("");
    });

    it("should validate", () => {
      const formStore = new TestForm();
      formStore.firstName = "FormX";
      formStore.lastName = "V1";

      expect(formStore.errors).deep.eq({
        lastName: "Only letters"
      });
    });
  });

  describe("values", () => {
    it("should return correct initial values", () => {
      const formStore = new TestForm();

      const values = formStore.values;

      expect(values.firstName).eq("");
      expect(values.lastName).eq("");
    });
  });
});
