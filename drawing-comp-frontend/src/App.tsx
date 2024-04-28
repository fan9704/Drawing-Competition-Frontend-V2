import { Button } from "@nextui-org/react";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl">Hello from SITCON!</h1>
          <p>Count is {count}</p>
          <Button color="primary">Add count</Button>
        </div>
      </div>
    </>
  );
}

export default App;
