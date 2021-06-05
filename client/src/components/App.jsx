/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import CellRow from './CellRow';

const App = () => {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState(false);
  const rowSize = 80;
  const colSize = 40;

  useEffect(() => {
    const newBoard = [];
    for (let row = 0; row < rowSize; row += 1) {
      newBoard.push([]);
      for (let col = 0; col < colSize; col += 1) {
        newBoard[row].push([]);
      }
    }
    setBoard(newBoard);
  }, []);

  const toggleGameStatus = () => {
    setGameStatus(!gameStatus);
  };

  const runRows = () => {
    const rows = [];
    for (let i = 0; i < board.length; i += 1) {
      rows.push(<CellRow Cells={board[i]} key={`Row${i}`} Row={i} />);
    }
    return rows;
  };

  return (
    <div>
      <h3>Game of Life!</h3>
      <button type="button" className="btn btn-block" onClick={toggleGameStatus}>Start</button>
      {
        runRows().map((item) => item)
      }
    </div>
  );
};

export default App;
