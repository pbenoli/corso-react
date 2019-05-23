import React from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import '../styles/Button.scss';
import { PLUS, MINUS, MULTI, DIVIDE, EQUAL } from '../config/const';
const Button = props => {
  const classes = ['btn'];

  // if (props.orange) classes.push('orange');
  if (includes([PLUS, MINUS, MULTI, DIVIDE, EQUAL], props.label)) classes.push('orange');
  return (
    <div className={classes.join(' ')} onClick={() => props.click(props.label)}>
      {props.label || 'btn'}
    </div>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
