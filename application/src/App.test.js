import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import chai from 'chai';
import PromiseIndicator from './helpers/PromiseProgressBar';
import promiseArray from './helpers/PromiseArray';

const callback = data => {
    // console.log('data:', data);
    return {};
};
const assert = chai.assert;
const promiseIndicator = new PromiseIndicator(callback);
const emit = () => promiseIndicator.emit();
const resolvePromises = () => promiseIndicator.resolvePromises(promiseArray);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('callback', () => {
    it('callback should return type object', () => {
        assert.typeOf(callback(), 'object');
    });
    it('emit should return type string', () => {
        assert.typeOf(emit(), 'string');
    });
    it('resolvePromises should return type number', () => {
        assert.typeOf(resolvePromises(), 'number');
    });
    it('emit is function', () => {
        assert.isFunction(emit, 'function');
    });
    it('callback is function', () => {
        assert.isFunction(callback, 'function');
    });
    it('promiseIndicator is instanceOf PromiseIndicator', () => {
        assert.instanceOf(promiseIndicator, PromiseIndicator, 'instanceOf PromiseIndicator');
    });

});