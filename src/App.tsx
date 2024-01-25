import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 10) {
      setCount(0);
    }
    // setInterval(() => setCount(count + 1), 1000);
  }, [count]);

  return (
    <>
      <div className="card">
        huhuuuuuuuu
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
