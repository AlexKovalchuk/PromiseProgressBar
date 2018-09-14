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

function delay(timeout, result) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout, result);
    });
}

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

    it('Correct totalCount: simple case', () => {
        const promises = [
            delay(100, 1),
            delay(200, 2),
            delay(300, 3),
        ];
        const indicator = new PromiseIndicator();
        const totalCount = indicator.resolvePromises(promises);
        assert(totalCount === promises.length, `${promises.length} tasks expected but ${totalCount} found`);
    });

    it('Correct totalCount: complex case', () => {
        const promises = [
            delay(100, 1),
            delay(200, 2),
            delay(300, 3),
        ];
        const indicator = new PromiseIndicator();
        const totalCount = indicator.resolvePromises([...promises, ...promises]);
        assert(totalCount === promises.length, `${promises.length} tasks expected but ${totalCount} found`);
    });

    it('check data', () => {
        const promises1 = [
            delay(100, 1),
            delay(200, 2),
            delay(300, 3),
        ];
        const promises2 = [
            delay(10, 1),
            delay(20, 2),
            delay(30, 3),
        ];
        let total = undefined;
        let completed = undefined;
        let percent = undefined;
        const indicator = new PromiseIndicator((data) => {
            const {tasksCount, tasksDone, percentDone} = data;
            total = tasksCount;
            completed = tasksDone;
            percent = percentDone;
        });
        indicator.resolvePromises(promises1);
        indicator.resolvePromises(promises2);
        return Promise.all([...promises1, ...promises2])
            .then(
                () => {
                    assert(total === promises2.length, `${promises2.length} total tasks expected but ${total} found`);
                    assert(completed === promises2.length, 'Invalid number of done promises');
                    assert(percent === 100, 'Invalid percent of done');
                }
            );
    });
});