import * as React from "react";
import { observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Form2Store } from "./Form2.store";

@observer
class Form2 extends React.Component {
  store = new Form2Store();

  render() {
    const { field, fieldProps } = this.store;

    return (
      <section>
        <h2>Form 2 Test</h2>

        <form>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TextField
                label={field("firstName").label}
                error={field("firstName").hasError}
                helperText={field("firstName").error}
                {...fieldProps("firstName")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={field("lastName").label}
                error={field("lastName").hasError}
                helperText={field("firstName").error}
                {...this.store.fieldProps("lastName")}
              />
            </Grid>

            <Grid item>
              <Typography>Computed name: {this.store.name}</Typography>
            </Grid>
          </Grid>
        </form>

        <div>
          <h4>Form State (store.state)</h4>
          <pre>{JSON.stringify(this.store.state, null, 4)}</pre>
        </div>
      </section>
    );
  }
}

export default Form2;
