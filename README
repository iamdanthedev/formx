```
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
```
