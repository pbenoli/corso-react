import React, { Component } from 'react';
import Button from './Button';
import Display from './Display';

import { PLUS, MINUS, MULTI, DIVIDE, EQUAL, DOT } from '../config/const';

import '../styles/App.scss';
import { includes, sum, subtract, multiply, divide } from 'lodash';
class App extends Component {
  constructor() {
    super();
    //memorizza le cifre e la virgola
    this.digits = [];

    //memorizza primo e secondo operando
    this.operators = [];
    this.state = {
      display: '',
      operation: '',
    };

    this.labels = [
      '7',
      '8',
      '9',
      DIVIDE,
      '4',
      '5',
      '6',
      MULTI,
      '1',
      '2',
      '3',
      MINUS,
      '0',
      DOT,
      EQUAL,
      PLUS,
    ];

    this.handleClick = this.handleClick.bind(this);
  }

  doComputation() {
    this.operators.push(parseFloat(this.state.display));
    console.log('switch this.state.operation=', this.state.operation);
    let result = '';
    switch (this.state.operation) {
      case PLUS:
        result = sum(this.operators);
        break;
      case MINUS:
        break;
        result = subtract(this.operators[0], this.operators[1]);
      case MULTI:
        break;
        result = multiply(this.operators[0], this.operators[1]);
      case DIVIDE:
        result = divide(this.operators[0], this.operators[1]);
      default:
        break;
    }
    this.setState({ display: parseFloat(result), operation: '' });
    this.operators[0] = this.operators[1];
    this.operators.shift();
    console.log('shift', this.operators);
  }

  handleClick(label) {
    // Gestore del click
    console.log('label;', label);
    switch (label) {
      case PLUS:
      case MULTI:
      case MINUS:
      case DIVIDE:
        this.setOperation(label);
        break;
      case EQUAL:
        this.doComputation();
        break;
      case DOT:
      default:
        this.updateDigits(label);
    }
  }

  render() {
    return (
      <div>
        <h1>Calcolatrice REACT</h1>
        <div id="calculator">
          <Display value={this.state.display} />
          {this.labels.map((label, index) => (
            <Button key={'btn-' + index} label={label} click={this.handleClick} />
          ))}
        </div>
      </div>
    );
  }

  setOperation(operation) {
    console.log('operation:', operation);
    this.setState({ operation }); //se variabile ha lo stesso nome della chiave,
    // non serve indicare la chiave
    // ns // const firstNumber = this.state.display;
    // aggiungo primo operando
    this.operators.push(parseFloat(this.state.display));
    // svoda digits
    this.digits = [];
    console.log('this.operators=', this.operators, ' this.digits=', this.digits);
  }

  updateDigits(digit) {
    console.log('digit:', digit);
    if (this.digits.length === 0 && digit === DOT) this.digits.push('0');
    if (this.digits.length === 1 && this.digits[0] === '0') {
      // ho solo lo zero
      if (digit === '0') {
        return false;
      }
    } else {
      if (!(digit != DOT || (digit === DOT && !includes(this.digits, digit)))) return false;
    }
    this.digits.push(digit);
    this.setState({ display: this.digits.join('') });
  }
}
export default App;
