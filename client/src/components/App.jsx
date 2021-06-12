/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import CellRow from './CellRow';
import Cell from './CellClass';

const App = () => {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState(false);
  const [currentGen, setCurrentGen] = useState(0);
  const [speed, setSpeed] = useState(300);
  // eslint-disable-next-line no-unused-vars
  const [boundaries, setBoundaries] = useState({ x: 50, y: 50 });

  const createBoard = (rowSize, colSize) => {
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
  };

  useEffect(() => {
    createBoard(boundaries.x, boundaries.y);
  }, []);

  useEffect(() => {
    createBoard(boundaries.x, boundaries.y);
  }, [boundaries]);

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

  const detectBoundry = (x, y) => (x >= 0 && x < boundaries.x && y >= 0 && y < boundaries.y);

  const detectAliveNeighbors = (location) => {
    const ids = location.split(',');
    const neighborLocations = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0],
      [1, 1]];
    let aliveNeighbors = 0;
    neighborLocations.forEach((loc) => {
      const newx = Math.floor(ids[0] - loc[0]);
      const newy = Math.floor(ids[1] - loc[1]);
      if (detectBoundry(newx, newy) && board[newx][newy].alive) {
        aliveNeighbors += 1;
      }
    });
    return aliveNeighbors;
  };

  const scanBoard = () => {
    const newBoard = [...board];
    for (let i = 0; i < newBoard.length; i += 1) {
      for (let j = 0; j < newBoard.length; j += 1) {
        newBoard[i][j].neighbors = detectAliveNeighbors(newBoard[i][j].position);
      }
    }
    return newBoard;
  };

  const nextGeneration = (currentBoard) => {
    const newBoard = currentBoard;
    for (let i = 0; i < newBoard.length; i += 1) {
      for (let j = 0; j < newBoard.length; j += 1) {
        if (!newBoard[i][j].alive) {
          if (newBoard[i][j].neighbors === 3) {
            newBoard[i][j].alive = true;
          }
        } else if (newBoard[i][j].neighbors < 2 || newBoard[i][j].neighbors > 3) {
          newBoard[i][j].alive = false;
        }
      }
    }
    setBoard(newBoard);
    setCurrentGen(currentGen + 1);
  };

  const nextStep = () => {
    const newBoard = scanBoard();
    nextGeneration(newBoard);
  };

  // simple toggle of the on and off switch
  const toggleGameStatus = () => {
    if (!gameStatus === true) {
      nextStep();
    }
    setGameStatus(!gameStatus);
  };

  useEffect(() => {
    if (gameStatus) {
      setTimeout(nextStep, speed);
    }
  }, [board]);

  // create the first initial rows
  const runRows = () => {
    const rows = [];
    for (let i = 0; i < board.length; i += 1) {
      rows.push(<CellRow Cells={board[i]} key={`Row${i}`} Row={i} toggleCellStatus={toggleCellStatus} />);
    }
    return rows;
  };

  return (
    <div className="text-center">
      <h3>Game of Life!</h3>
      <span>Set Speed</span>
      <input
        id="Speed"
        type="number"
        value={speed}
        onChange={(event) => {
          setSpeed(event.target.value);
        }}
      />
      <button
        type="button"
        className={`btn btn-thicc ${gameStatus ? 'bg-light text-dark' : ''} `}
        onClick={() => {
          setGameStatus(false);
          setCurrentGen(0);
          createBoard(boundaries.x, boundaries.y);
        }}
      >
        Reset Field
      </button>
      <p>{`Current Generation ${currentGen}`}</p>
      <div className="game-container">
        <button
          type="button"
          className={`btn btn-block btn-thicc ${gameStatus ? 'bg-light text-dark' : ''} `}
          onClick={toggleGameStatus}
        >
          {gameStatus ? 'Pause' : 'Start'}
        </button>
        {runRows()}
      </div>
    </div>
  );
};

export default App;
