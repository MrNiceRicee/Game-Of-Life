/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import CellRow from './CellRow';
import Cell from './CellClass';

const App = () => {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState(false);
  const rowSize = 20;
  const colSize = 20;

  useEffect(() => {
    const newBoard = [];
    for (let row = 0; row < rowSize; row += 1) {
      newBoard.push([]);
      for (let col = 0; col < colSize; col += 1) {
        const newCell = new Cell();
        newCell.position = `${row},${col}`;
        newBoard[row].push(newCell);
      }
    }
    setBoard(newBoard);
  }, []);

  // simple toggle of the on and off switch
  const toggleGameStatus = () => {
    setGameStatus(!gameStatus);
  };

  // simple toggle for the indivitual cells
  const toggleCellStatus = (location) => {
    // do something
    const ids = location.split(',');
    const newBoard = [...board]; // can't get around the time complexity of N of copying a new board
    newBoard[ids[0]][ids[1]].alive = !newBoard[ids[0]][ids[1]].alive;
    // then not sure how react does it, but hopefully it's just N=changedCells,
    // and not the entire cell.
    setBoard(newBoard);
  };

  // create the first initial rows
  const runRows = () => {
    const rows = [];
    for (let i = 0; i < board.length; i += 1) {
      rows.push(<CellRow Cells={board[i]} key={`Row${i}`} Row={i} toggleCellStatus={toggleCellStatus} />);
    }
    return rows;
  };

  return (
    <div style={{ width: 'max-content', textAlign: 'center' }}>
      <h3>Game of Life!</h3>
      <button type="button" className={`btn btn-block btn-thicc ${gameStatus ? 'bg-light text-dark' : ''} `} onClick={toggleGameStatus}>{gameStatus ? 'Pause' : 'Start'}</button>
      {runRows()}
    </div>
  );
};

export default App;
