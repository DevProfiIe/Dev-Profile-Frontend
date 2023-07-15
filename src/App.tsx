import { useState } from 'react';

function App() {
  const [count, setCount] = useState<number>(0);

  const plusState = (): void => {
    setCount(count + 1);

    return;
  };

  const minusState = (): void => {
    setCount(count - 1);

    return;
  };

  return (
    <div>
      <div>this is count {count}</div>
      <button onClick={plusState}>+</button>
      <button onClick={minusState}>-</button>
    </div>
  );
}

export default App;
