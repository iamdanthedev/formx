import * as React from "react";
import Form1 from "./form1/Form1";
import Form2 from "./form2/Form2";

type State = {
  page: string;
};

class App extends React.Component<{}, State> {
  state: State = {
    page: "form1"
  };

  navigate = (page: string) => this.setState({ page });

  render() {
    const { page } = this.state;

    return (
      <div>
        <nav>
          <a href="#" onClick={() => this.navigate("form1")}>example 1</a>{" "}
          <a href="#" onClick={() => this.navigate("form2")}>example 2</a>
        </nav>

        <div>
          {page === "form1" && <Form1 />}
          {page === "form2" && <Form2 />}
        </div>
      </div>
    );
  }
}

export default App;