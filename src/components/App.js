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
          <Button label="7" click={this.handleClick} />
          <Button label="8" click={this.handleClick} />
          <Button label="9" click={this.handleClick} />
          <Button label={DIVIDE} click={this.handleClick} orange />
          <Button label="4" click={this.handleClick} />
          <Button label="5" click={this.handleClick} />
          <Button label="6" click={this.handleClick} />
          <Button label={MULTI} click={this.handleClick} orange />
          <Button label="1" click={this.handleClick} />
          <Button label="2" click={this.handleClick} />
          <Button label="3" click={this.handleClick} />
          <Button label={MINUS} click={this.handleClick} orange />
          <Button label="0" click={this.handleClick} />
          <Button label={DOT} click={this.handleClick} />
          <Button label={EQUAL} click={this.handleClick} orange />
          <Button label={PLUS} click={this.handleClick} orange />
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
      if (digit !== DOT) {
        if (digit !== '0') {
          // ho qualcosa di diverso da zero
          this.digits[0] = digit;
        }
      } else {
        this.digits.push(digit);
      }
    } else {
      if (digit != DOT || (digit === DOT && !includes(this.digits, digit))) this.digits.push(digit);
    }
    this.setState({ display: this.digits.join('') });
  }
}
export default App;
