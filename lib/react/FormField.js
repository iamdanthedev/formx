import * as React from "react";
import { observer } from "mobx-react";
class FormField extends React.Component {
    render() {
        const { children, field: key, store } = this.props;
        const field = store.field(key);
        return children(field, store);
    }
}
export default observer(FormField);
//# sourceMappingURL=FormField.js.map