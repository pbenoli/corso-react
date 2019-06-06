import React from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import '../styles/Button.scss';
import { PLUS, MINUS, MULTI, DIVIDE, EQUAL } from '../config/const';
const Button = props => {
  const classes = ['btn'];

  let label = props.label;
  // if (props.orange) classes.push('orange');
  if (includes([PLUS, MINUS, MULTI, DIVIDE, EQUAL], props.label)) {
    switch (props.label) {
      case PLUS:
        label = <i className="fas fa-plus" />;
        break;
      case MINUS:
        label = <i className="fas fa-minus" />;
        break;
      case MULTI:
        label = <i className="fas fa-times" />;
        break;
      case DIVIDE:
        label = <i className="fas fa-divide" />;
        break;
      case EQUAL:
        label = <i className="fas fa-equals" />;
        break;
    }
    classes.push('orange');
  }
  return (
    <div className={classes.join(' ')} onClick={() => props.click(props.label)}>
      {label || 'btn'}
    </div>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
