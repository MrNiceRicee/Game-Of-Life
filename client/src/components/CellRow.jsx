/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types'; // ES6
import Cell from './Cell';

const CellRow = ({ Cells, Row }) => {
  const generateCol = () => {
    const cols = [];
    for (let i = 0; i < Cells.length; i += 1) {
      cols.push(<Cell key={`Col${i}`} Row={Row} Col={i} />);
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
  // eslint-disable-next-line react/forbid-prop-types
  Cells: PropTypes.bool.isRequired,
  Row: PropTypes.number.isRequired,
};

export default CellRow;
