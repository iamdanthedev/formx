import * as React from "react";
import { observer } from "mobx-react";
import TextFieldMui from "@material-ui/core/TextField";
const TextField = props => {
    const { field } = props;
    console.info(`TextField rendering ${field.name}`);
    return (React.createElement(TextFieldMui, Object.assign({ label: field.label, error: field.hasError, helperText: field.error }, field.formProps)));
};
export default observer(TextField);
//# sourceMappingURL=TextField.js.map