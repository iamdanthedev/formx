import * as React from "react";
import { observer } from "mobx-react";
import { Form1Store } from "./Form1.store";

@observer
class Form1 extends React.Component {
  store = new Form1Store();

  render() {
    return (
      <section>
        <h2>Form 1 Test</h2>

        <form>
          <div>
            Any:
            <br />
            <input {...this.store.fieldProps("firstName")} />
          </div>

          <div>
            Only letters:
            <br />
            <input {...this.store.fieldProps("lastName")} />
          </div>

          <div>
            <input
              type="button"
              onClick={this.store.reset}
              value="Reset form"
            />
          </div>
        </form>

        <div>
          <h4>Store:</h4>
          <pre>{JSON.stringify(this.store, null, 4)}</pre>
        </div>

        <div>
          <h4>Store.values:</h4>
          <pre>{JSON.stringify(this.store.values, null, 4)}</pre>
        </div>

        <div>
          <h4>Store.errors:</h4>
          <pre>{JSON.stringify(this.store.errors, null, 4)}</pre>
        </div>
      </section>
    );
  }
}

export default Form1;
