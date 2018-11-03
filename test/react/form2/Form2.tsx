import * as React from "react";
import { observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormField from "../../../src/react/FormField";
import FormSection from "../../../src/react/FormSection";
import { Form2Store } from "./Form2.store";

@observer
class Form2 extends React.Component {
  store = new Form2Store();

  render() {
    console.log("render form2");
    console.log(this.store.values);

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
              <FormField store={this.store} field="specializations">
                {field => (
                  <FormControl style={{ minWidth: 200 }}>
                    <InputLabel htmlFor="select-multiple-checkbox">
                      {field.label}
                    </InputLabel>
                    <Select
                      fullWidth
                      multiple
                      input={<Input fullWidth id="select-multiple-checkbox" />}
                      renderValue={(selected: string[]) => selected.join(", ")}
                      {...field.formProps}
                    >
                      {this.store.allSpecializations.map(name => (
                        <MenuItem key={name} value={name}>
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </FormField>
            </Grid>

            <FormSection store={this.store} name="address">
              {section => (
                <Grid item xs={12} container spacing={16} component={Paper}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Address</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label={section("street").label}
                      error={section("street").hasError}
                      helperText={section("street").error}
                      {...section("street").formProps}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label={section("zipCode").label}
                      error={section("zipCode").hasError}
                      helperText={section("zipCode").error}
                      {...section("zipCode").formProps}
                    />
                  </Grid>
                </Grid>
              )}
            </FormSection>

            <FormArrayField store={this.store} name="contacts">
              {fieldArray => (
                <Grid item xs={12} container spacing={16}>
                  {fieldArray.values.map(item => (
                    <Grid item xs={12}>
                      <TextField
                        {...item.field("name").formProps}
                      />

                    </Grid>
                  ))}

                </Grid>
              )}

            </FormArrayField>

            {/*<Grid item xs={12}>*/}
            {/*<Typography>Computed name: {this.store.name}</Typography>*/}
            {/*</Grid>*/}

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
              <React.Fragment>
                <div>Field State {this.store.focusedField.name}</div>
                <pre>
                  {JSON.stringify(this.store.focusedField.state, null, 4)}
                </pre>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default Form2;
