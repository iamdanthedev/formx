import * as React from "react";
import { compose, pure } from "recompose";
import { observer } from "mobx-react";
import TextFieldMui, { TextFieldProps } from "@material-ui/core/TextField";
import { Field } from "../../../src";
import FormField from "../../../src/react/FormField";

type Props = {
  field: Field<any>;
};

const TextField: React.SFC<Props> = props => {
  const { field } = props;

  console.info(`TextField rendering ${field.name}`);

  return (
    <TextFieldMui
      label={field.label}
      error={field.hasError}
      helperText={field.error}
      {...field.formProps}
    />
  );
};

export default observer(TextField);
