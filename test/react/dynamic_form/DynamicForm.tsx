import * as React from "react";
import { observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import FormField from "../../../src/react/FormField";
import { Field, FormStore } from "../../../src";

class DynamicFormStore extends FormStore<any> {}

@observer
export class DynamicForm extends React.Component {
  store = new DynamicFormStore();

  handleAdd = () => {
    const name = `field_${this.store.fields.length + 1}`;
    this.store.registerField(
      name,
      new Field(this.store, {
        initialValue: "",
        label: `Field ${name}`
      })
    );
  };

  render() {
    const fields = this.store.fields;

    return (
      <section>
        <Grid container spacing={16}>
          {fields.map(f => (
            <Grid item xs={12}>
              <TextField
                label={f.label}
                error={f.hasError}
                helperText={f.error}
                {...f.formProps}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button onClick={this.handleAdd}>Add new field</Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <h4>Form State (store.state)</h4>
            <pre>{JSON.stringify(this.store.state, null, 4)}</pre>
          </Grid>

          <Grid item xs={6}>
            {!this.store.focusedField && "No field in focus"}

            {this.store.focusedField && (
              <>
                <h4>Field State {this.store.focusedField.name}</h4>
                <pre>
                  {JSON.stringify(this.store.focusedField.state, null, 4)}
                </pre>
              </>
            )}
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default DynamicForm;
