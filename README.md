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

    submit() {
      endpoint(this.values)
        .then(values => this.reset(values))
        .catch(errors => this.setErrors(errors));
    }
  }
```


And later:

```
const form = new TestForm();

form.values;
form.errors;

form.submit();
```
