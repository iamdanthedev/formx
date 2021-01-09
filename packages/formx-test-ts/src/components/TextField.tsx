import React from "react";
import { FormField } from "formx-react";
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@material-ui/core";

interface TextFieldProps {
  name: string;
  label: string;
  TextFieldProps?: Partial<MuiTextFieldProps>;
}

export function TextField(props: TextFieldProps) {
  console.log(`TextField ${props.name}: render`);

  return (
    <FormField name={props.name}>
      {(field, store) => {
        console.log(`TextField inner ${props.name}: render`);
        return (
          <MuiTextField
            label={props.label} {...field.fieldProps} {...props.TextFieldProps} />
        );
      }}
    </FormField>
  );
}
