import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Display.scss';

const Display = props => {
  return <div className="display">{props.value || '0'}</div>;
};

Display.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Display;
