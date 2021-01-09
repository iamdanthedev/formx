import * as React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";
// import Form1 from "./form1/Form1";
import Form2 from "./form2/Form2";
// import DynamicForm from "./dynamic_form/DynamicForm";

class App extends React.Component {
  render() {
    return (
      <div>
        {/*<Menu>*/}
          {/*<Link to="/form1">Form 1</Link>*/}
          {/*<Link to="/form2">Form 2</Link>*/}
          {/*<Link to="/dynamic1">Dynamic form</Link>*/}
        {/*</Menu>*/}

        <Form2 />

        {/*<Switch>*/}
        {/*<Route path="/form1" component={Form1} />*/}
        {/*<Route path="/form2" component={Form2} />*/}
        {/*<Route path="/dynamic1" component={DynamicForm} />*/}
        {/*</Switch>*/}
      </div>
    );
  }
}

const Menu = styled.div`
  a {
    display: inline-flex;
    list-style: none;
    margin-right: 1rem;
  }
`;

export default App;
