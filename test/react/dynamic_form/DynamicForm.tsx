import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { shouldUpdate } from "recompose";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextFieldMui from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import TextField from "./TextField";
import { onlyLetters } from "../../utils";
import { Field, FormStore } from "../../../src";

class DynamicFormStore extends FormStore<any> {
  @observable
  public num = 1;

  @observable
  displayFormState = true;

  @observable
  displayFieldState = true;
}

const Fields: React.SFC<{ fields: Array<Field<any>> }> = props => {
  const { fields } = props;

  return (
    <Grid container item xs={6} spacing={16}>
      {fields.map(field => {
        console.info("in loop", field.name);

        return (
          <Grid item xs={4} key={field.name}>
            <TextField field={field} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const FieldsOptimised = shouldUpdate<{ fields: Array<Field<any>> }>(
  (props, nextProps) => props.fields.length !== nextProps.fields.length
)(Fields);

@observer
export class DynamicForm extends React.Component {
  store = new DynamicFormStore();

  handleAdd = () => {
    for (let i = 0; i < this.store.num; i++) {
      const name = `field_${this.store.fields.length + 1}`;

      this.store.registerField(
        name,
        new Field(this.store, {
          initialValue: "",
          name,
          label: `Field ${name}`,
          validate: onlyLetters
        })
      );
    }
  };

  render() {
    console.info("DynamicForm render");

    const fields = this.store.fields;
    const fieldNames = this.store.fields.map(f => f.name);

    return (
      <section>
        <Grid container>
          <FieldsOptimised fields={this.store.fields} />

          <Grid item xs={6} direction="column">
            <Grid item container alignItems="center" xs={12}>
              <Grid item xs={6}>
                <TextFieldMui
                  name="num"
                  type="number"
                  label="How many fields to add"
                  onChange={e => (this.store.num = parseInt(e.target.value))}
                  value={this.store.num}
                />
              </Grid>
              <Grid xs={6}>
                <Button onClick={this.handleAdd}>
                  Add new field (only letters validation)
                </Button>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6}>
                <div style={{ display: "flex" }}>
                  <Checkbox
                    checked={this.store.displayFormState}
                    onChange={e =>
                      (this.store.displayFormState = e.target.checked)
                    }
                  />
                  <h4>Form State (store.state)</h4>
                </div>

                {this.store.displayFormState && (
                  <pre>{JSON.stringify(this.store.state, null, 4)}</pre>
                )}
              </Grid>

              <Grid item xs={6}>
                {!this.store.focusedField && (
                  <h4>Field state (select field):</h4>
                )}

                {this.store.focusedField && (
                  <React.Fragment>
                    <h4>Field State {this.store.focusedField.name}</h4>
                    <pre>
                      {JSON.stringify(this.store.focusedField.state, null, 4)}
                    </pre>
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default DynamicForm;
