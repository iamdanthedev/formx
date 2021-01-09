import * as React from "react";
import styled from "styled-components";
// import Form1 from "./form1/Form1";
import Form2 from "./form2/Form2";
// import DynamicForm from "./dynamic_form/DynamicForm";
class App extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(Form2, null)));
    }
}
const Menu = styled.div `
  a {
    display: inline-flex;
    list-style: none;
    margin-right: 1rem;
  }
`;
export default App;
//# sourceMappingURL=App.js.map