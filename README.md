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

    onSubmit() {
      return endpoint(this.values)
    }

    onSubmitSuccess(values: T) {
      this.reset(T);
    }

    onSubmitFailure(errors: FormErrors<T>) {
      this.setErrors(errors);
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

TODO/IDEAS:

- [ ] nested fields?
- [ ] make sure it's all observable (mobx's when, autorun, reaction should work)
- [ ] support yup schema for fields? (e.g. yup.string(), yup.date())
- [ ] something like `form.fieldHandler("firstName")` that will return something like
{ onChange, name, value, required } for react
