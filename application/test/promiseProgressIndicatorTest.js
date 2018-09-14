const assert = require('chai').assert;
// import PromiseIndicator from './src/helpers/PromiseProgressBar';
// import PromiseIndicator from '../src/helpers/PromiseProgressBar';
const PromiseIndicator = require('../src/helpers/PromiseProgressBar');
// const PromiseIndicator = require('./requireFiles');
// import promiseArray from '../helpers/PromiseArray';

const callback = data => {
    console.log('data', data);
};

const promiseIndicator = new PromiseIndicator(callback);
const resolvePromises = promiseIndicator.resolvePromises;
// resolvePromises(promiseArray);

describe('resolvePromises', () => {
    it('resolvePromises should return type object', () => {
        assert.typeof(resolvePromises, 'object');
    })
});

