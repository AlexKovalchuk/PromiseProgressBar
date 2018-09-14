import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PromiseIndicator from './helpers/PromiseProgressBar';

const callback = data => {
    console.log('data', data);
};

const promiseIndicator = new PromiseIndicator(callback);
const resolvePromises = promiseIndicator.resolvePromises;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// describe('resolvePromises', () => {
//     it('resolvePromises should return type object', () => {
//         assert.typeof(resolvePromises, 'object');
//     })
// });