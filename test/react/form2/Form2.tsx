import * as React from "react";
import { Observer } from "mobx-react";
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

import FieldArray from "../../../src/react/FieldArray";
import FormField from "../../../src/react/FormField";
import FormX from "../../../src/react/FormX";
import { Form2Store } from "./Form2.store";

const paperStyle = {
  flex: 1,
  marginBottom: 16,
  padding: 16
};

class Form2 extends React.Component {
  store = new Form2Store();

  render() {
    console.log("render form2");
    console.log(this.store.values);

    const { getField } = this.store;

    return (
      <FormX store={this.store}>
        <section>
          <h2>Form 2 Test</h2>

          <form
            onReset={this.store.onResetHandler}
            onSubmit={this.store.submit}
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <Paper style={paperStyle}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormField name="firstName">
                        {field => (
                          <TextField
                            label="First name"
                            // error={field.hasError}
                            // helperText={field.error}
                            {...field.formProps}
                          />
                        )}
                      </FormField>
                    </Grid>

                    <Grid item xs={12}>
                      <FormField name="lastName">
                        {field => (
                          <TextField
                            label="Last name"
                            // error={field.hasError}
                            // helperText={field.error}
                            {...field.formProps}
                          />
                        )}
                      </FormField>
                    </Grid>

                    <Grid item xs={12}>
                      <FormField name="specializations">
                        {field => (
                          <FormControl style={{ minWidth: 200 }}>
                            <InputLabel htmlFor="select-multiple-checkbox">
                              Specializations
                            </InputLabel>

                            <Select
                              fullWidth
                              multiple
                              input={
                                <Input
                                  fullWidth
                                  id="select-multiple-checkbox"
                                />
                              }
                              renderValue={(selected: string[]) =>
                                selected.join(", ")
                              }
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
                  </Grid>
                </Paper>

                <Paper style={paperStyle}>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <Typography variant="h5">Address</Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <FormField name="address.street">
                        {field => (
                          <TextField
                            label="Street name"
                            // error={section("street").hasError}
                            // helperText={section("street").error}
                            {...field.formProps}
                          />
                        )}
                      </FormField>
                    </Grid>

                    <Grid item xs={12}>
                      <FormField name="address.zipCode">
                        {field => (
                          <TextField
                            label="Zip Code"
                            // error={section("street").hasError}
                            // helperText={section("street").error}
                            {...field.formProps}
                          />
                        )}
                      </FormField>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper style={paperStyle}>
                  <FieldArray name="contacts">
                    {({ value, name, push, remove }) => (
                      <div>
                        {value.map((item, i) => (
                          <Paper style={paperStyle} key={i}>
                            <Grid container spacing={16} alignItems="center">
                              <Grid item xs={4}>
                                <FormField name={`${name}[${i}]name`}>
                                  {field => (
                                    <TextField
                                      label="Name"
                                      fullWidth
                                      // error={field.hasError}
                                      // helperText={field.error}
                                      {...field.formProps}
                                    />
                                  )}
                                </FormField>
                              </Grid>

                              <Grid item xs={4}>
                                <FormField name={`${name}[${i}]job`}>
                                  {field => (
                                    <TextField
                                      label="Job"
                                      fullWidth
                                      // error={field.hasError}
                                      // helperText={field.error}
                                      {...field.formProps}
                                    />
                                  )}
                                </FormField>
                              </Grid>

                              <Grid item xs={4}>
                                <Button onClick={() => remove(i)}>
                                  Remove
                                </Button>
                              </Grid>
                            </Grid>
                          </Paper>
                        ))}

                        <div>
                          <Button onClick={() => push({ name: "", job: "" })}>
                            Add Contact
                          </Button>

                          <Button
                            onClick={() => {
                              for (let i = 0; i < 100; i++) {
                                push({ name: "", job: "" });
                              }
                            }}
                          >
                            Add 100 Contacts
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </Paper>
              </div>

              <div style={{ flex: 1, padding: "0 16px" }}>
                <Observer>
                  {() => (
                    <div>
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
                    </div>
                  )}
                </Observer>

                <Observer>
                  {() => (
                    <Grid container>
                      <Grid item xs={6}>
                        <h4>Form State (store.state)</h4>
                        <pre>{JSON.stringify(this.store.state, null, 4)}</pre>
                      </Grid>

                      <Grid item xs={6}>
                        {!this.store.focusedField && "No field in focus"}

                        {this.store.focusedField && (
                          <React.Fragment>
                            <div>
                              Field State {this.store.focusedField.name}
                            </div>
                            <pre>
                              {JSON.stringify(
                                this.store.focusedField.state,
                                null,
                                4
                              )}
                            </pre>
                          </React.Fragment>
                        )}
                      </Grid>
                    </Grid>
                  )}
                </Observer>
              </div>
            </div>
          </form>
        </section>
      </FormX>
    );
  }
}

export default Form2;
