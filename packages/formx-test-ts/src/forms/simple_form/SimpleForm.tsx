import React from "react";
import { useGenericFormStore, Form, FormDebugger } from "formx-react";
import { FormState } from "./FormState";
import { TextField } from "../../components/TextField";
import { Button, Card, CardActions, CardContent, CardHeader } from "@material-ui/core";

interface Props {}

export function SimpleForm(props: Props) {
  console.log("SimpleForm: render");

  const formStore = useGenericFormStore<FormState>({
    exposeToWindowAs: "simpleForm",
    initialValues: {
      login: "",
      password: "",
    },
  });

  return (
    <Form store={formStore}>
      <Card style={{ width: "15rem", margin: 16 }}>
        <CardHeader title="Sign in" />

        <CardContent>
          <div>
            <TextField name="login" label="Login" TextFieldProps={{ fullWidth: true }} />
          </div>

          <div>
            <TextField name="password" label="Password" TextFieldProps={{ fullWidth: true }} />
          </div>
        </CardContent>

        <CardActions>
          <Button variant="outlined" onClick={formStore.submit}>
            Submit
          </Button>
        </CardActions>
      </Card>


      <div>
        <FormDebugger />
      </div>
    </Form>
  );
}
