/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ CellAlive, toggleCellStatus, CellPosition }) => {
  const buttonClick = () => {
    // do stuff
    toggleCellStatus(CellPosition);
  };
  return (
    <button type="button" onClick={buttonClick} aria-label="cell" className={CellAlive ? 'cell bg-light' : 'cell'} />
  );
};

Cell.propTypes = {
  CellAlive: PropTypes.bool.isRequired,
  toggleCellStatus: PropTypes.func.isRequired,
  CellPosition: PropTypes.string.isRequired,
};

export default Cell;
