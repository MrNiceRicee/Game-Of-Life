/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ CellAlive }) => {
  const buttonClick = () => {
    // do stuff
  };
  return (
    <button type="button" onClick={buttonClick} onKeyDown={buttonClick} aria-label="cell" className={CellAlive ? 'cell cell-alive' : 'cell'} />
  );
};

Cell.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  CellAlive: PropTypes.bool.isRequired,
};

export default Cell;
