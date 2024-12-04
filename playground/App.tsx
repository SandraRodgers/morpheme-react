import React from "react";
import { Button } from "../src";

const App: React.FC = () => {
  return (
    <div>
      <h1>Morpheme React Playground</h1>
      <Button label="Click Me" onClick={() => alert("Button clicked!")} />
    </div>
  );
};

export default App;
