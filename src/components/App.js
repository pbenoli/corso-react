import React, { Component } from 'react';
import Button from './Button';
import Display from './Display';

import { PLUS, MINUS, MULTI, DIVIDE, EQUAL, DOT, RESET } from '../config/const';

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
    this.resetCalculator = this.resetCalculator.bind(this);
  }

  doComputation(setTotal = false) {
    if (this.operators.length !== 2 && !this.state.operation) return false;

    const secondNumber = this.state.display;
    this.operators.push(parseFloat(secondNumber));

    console.log('doComputation', this.operators);
    let total = this.getResult();
    if (setTotal) this.operators.push(total);
    this.operators = [];
    this.digits = [];
    this.setState({ display: total, operation: '' });
  }

  getResult() {
    let result = 0;
    switch (this.state.operation) {
      case PLUS:
        result = sum(this.operators);
        break;
      case MINUS:
        result = subtract(this.operators[0], this.operators[1]);
        //console.log('result=', result);
        break;
      case MULTI:
        result = multiply(this.operators[0], this.operators[1]);
        break;
      case DIVIDE:
        result = divide(this.operators[0], this.operators[1]);
      default:
        break;
    }
    return parseFloat(parseFloat(result.toPrecision(12)));
  }

  handleClick(label) {
    // Gestore del click
    console.log('handleClick', label);

    switch (label) {
      case PLUS:
      case MINUS:
      case MULTI:
      case DIVIDE:
        this.setOperation(label);
        break;
      case EQUAL:
        this.doComputation();
        break;
      case RESET:
        this.reset();
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
          <Display value={this.state.display} click={this.handleClick} />
          {this.labels.map((label, index) => (
            <Button key={'btn-' + index} label={label} click={this.handleClick} />
          ))}
        </div>
      </div>
    );
  }

  reset() {
    this.operators = [];
    this.digits = [];
    this.setState({ display: 0, operation: '' });
  }

  setOperation(operation) {
    // salvo il primo operando
    const firstNumber = parseFloat(this.state.display);
    if (this.operators.length === 1 && this.state.operation) {
      this.doComputation(true);
    } else {
      this.operators.push(firstNumber);
    }

    this.setState({ operation }); //se variabile ha lo stesso nome della chiave,

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
    // setState è un metodo react e devo fare il bind (vedi sopra) per permettere alla mia classe derivata di usare i metodi react
  }
}
export default App;
