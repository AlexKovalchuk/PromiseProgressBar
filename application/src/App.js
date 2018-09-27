import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PromiseProgressBar from './components/PromiseProgressBar/PromiseProgressBar';
import test from './helpers/test';


class App extends Component {
  render() {
      const testObj = new test();
      const a = new test();
      const b = new test();
      const c = new test();
      const d = new test();
      console.log(a === b);
      console.log(b === c);
      console.log(c === d);
      console.log(d === a);
      testObj.test();
      testObj.findLongestMatchOfNonRepetitiveChars('1121231234123451234567');
      testObj.writeNumbersWithPeriod([1,2,3,4,5,6,7], 1000);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <PromiseProgressBar/>
      </div>
    );
  }
}

export default App;
