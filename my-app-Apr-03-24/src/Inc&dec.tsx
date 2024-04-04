import React, { useState } from 'react';
import './App.css';

function App() {
  

  const [count, setCount] = useState(1);
  const increment = () => {

    setCount(count + 1);
  }
  const decrement = () => {

    setCount(count - 1);
  }
  return (
    <div>
      {count}
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
  
}

export default App;
