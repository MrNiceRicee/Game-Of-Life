/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types'; // ES6
import Cell from './Cell';

const CellRow = ({ Cells, toggleCellStatus }) => {
  const generateCol = () => {
    const cols = [];
    for (let i = 0; i < Cells.length; i += 1) {
      cols.push(<Cell key={`Col${i}`} CellAlive={Cells[i].alive} CellNeighbors={Cells[i].neighbors} CellPosition={Cells[i].position} toggleCellStatus={toggleCellStatus} />);
    }
    return cols;
  };
  return (
    <div className="d-flex">
      {generateCol().map((item) => item)}
    </div>
  );
};

CellRow.propTypes = {
  Cells: PropTypes.array.isRequired,
  toggleCellStatus: PropTypes.func.isRequired,
};

export default CellRow;
