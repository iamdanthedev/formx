import React from "react";
import { useFormStore } from "./FormContext";

export function FormDebugger() {
  const formStore = useFormStore();

  const stateJson = JSON.stringify(formStore.state, null, 4);

  return (
    <div>
      <pre>{stateJson}</pre>
    </div>
  );
}
