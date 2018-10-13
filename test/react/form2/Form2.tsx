import * as React from "react";
import { observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormField from "../../../src/react/FormField";
import { Form2Store } from "./Form2.store";

@observer
class Form2 extends React.Component {
  store = new Form2Store();

  render() {
    const { field, fieldProps } = this.store;

    return (
      <section>
        <h2>Form 2 Test</h2>

        <form onReset={this.store.reset} onSubmit={this.store.submit}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <FormField store={this.store} field="firstName">
                {field => (
                  <TextField
                    label={field.label}
                    error={field.hasError}
                    helperText={field.error}
                    {...field.formProps}
                  />
                )}
              </FormField>
            </Grid>

            <Grid item xs={12}>
              <FormField store={this.store} field="lastName">
                {field => (
                  <TextField
                    label={field.label}
                    error={field.hasError}
                    helperText={field.error}
                    {...field.formProps}
                  />
                )}
              </FormField>
            </Grid>

            <Grid item xs={12}>
              <FormField store={this.store} field="zipCode">
                {field => (
                  <TextField
                    label={field.label}
                    error={field.hasError}
                    helperText={field.error}
                    {...field.formProps}
                  />
                )}
              </FormField>
            </Grid>

            <Grid item xs={12}>
              <Typography>Computed name: {this.store.name}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                color="primary"
                type="primary"
                variant="contained"
                disabled={
                  this.store.submitting ||
                  this.store.clean ||
                  this.store.invalid
                }
              >
                {this.store.submitting ? "Submitting..." : "Submit"}
              </Button>{" "}
              <Button
                type="reset"
                variant="contained"
                disabled={this.store.clean}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>

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

export default Form2;
