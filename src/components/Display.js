import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Display.scss';
import { RESET } from '../config/const';
const Display = props => {
  let size = 55;
  const value = String(props.value);
  const len = value.length;
  let label = props.label;
  console.log('len=', len, props.value);
  // l'originale usa orbiton come font ()
  switch (true) {
    case len >= 13:
      size = 32;
      break;
    case len >= 11:
      size = 34;
      break;
    case len >= 8:
      size = 40;
      break;
  }

  return (
    <div className="display" onClick={() => props.click(RESET)}>
      <div style={{ fontSize: size }}>{value.substring(0, 14) || '0'}</div>
    </div>
  );
};

Display.propTypes = {
  click: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Display;
