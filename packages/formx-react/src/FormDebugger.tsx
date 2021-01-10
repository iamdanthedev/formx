import React from "react";
import { Observer } from "mobx-react";
import { useFormStore } from "./FormContext";

export function FormDebugger() {
  const formStore = useFormStore();

  return (
    <Observer>
      {() => {
        const stateJson = JSON.stringify(formStore.state, null, 4);

        return (
          <div>
            <pre>{stateJson}</pre>
          </div>
        );
      }}
    </Observer>
  );
}
