// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
     
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [number, setNumber] = useState(0); // Initial state
  const [history, setHistory] = useState([0]); // History stack for undo/redo
  const [step, setStep] = useState(0); // Current step in the history

  // Increment and decrement functions with bounds (0 to 150)
  const handleIncrement = () => {
    if (number < 150) {
      const newNumber = number + 1;
      updateHistory(newNumber);
    }
  };

  const handleDecrement = () => {
    if (number > 0) {
      const newNumber = number - 1;
      updateHistory(newNumber);
    }
  };

  // Update history on valid operation
  const updateHistory = (newNumber) => {
    const updatedHistory = history.slice(0, step + 1);
    setHistory([...updatedHistory, newNumber]);
    setStep(step + 1);
    setNumber(newNumber);
  };

  // Undo function
  const handleUndo = () => {
    if (step > 0) {
      setStep(step - 1);
      setNumber(history[step - 1]);
    }
  };

  // Redo function
  const handleRedo = () => {
    if (step < history.length - 1) {
      setStep(step + 1);
      setNumber(history[step + 1]);
    }
  };

  // Progress bar percentage based on number (0 to 150)
  const progressPercentage = (number / 150) * 100;

  return (
    <div className="App">
      <h1>Counter with Undo/Redo and Progress Bar</h1>
      <div className="buttons">
        <button onClick={handleDecrement} disabled={number <= 0}>
          Increment
        </button>
        <button onClick={handleIncrement} disabled={number >= 150}>
          Decrement
        </button>
      </div>
      <h2>Current Number: {number}</h2>
      <div className="undo-redo">
        <button onClick={handleUndo} disabled={step === 0}>
          Undo
        </button>
        <button onClick={handleRedo} disabled={step === history.length - 1}>
          Redo
        </button>
      </div>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${progressPercentage}%`,
            transition: "width 0.5s ease",
          }}
        ></div>
      </div>
    </div>
  );
};

export default App;

